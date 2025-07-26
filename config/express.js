const path = require("path");
const { readJournal, writeJournal } = require("../service");
const express = require('express');

function configExpress(app) {
  app.use(express.json());
  
  
  // controller
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
  });

  app.get("/journal", async (req, res) => {
    try {
      const data = await readJournal();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Неуспешно четене на journal файла." });
    }
  });

  app.post("/journal", async (req, res) => {
    const { mood, note } = req.body;

    if (!mood || !note) {
      return res.status(400).json({ error: "Mood и note са задължителни." });
    }

    const newEntry = {
      mood,
      note,
      date: new Date().toISOString(), // Пълен ISO за уникалност
    };

    try {
      const journal = await readJournal();
      journal.push(newEntry);
      await writeJournal(journal);
      res.status(201).json({ message: "Записът е добавен успешно." });
    } catch (err) {
      console.error("Грешка при записване в journal:", err);
      res.status(500).json({ error: "Грешка при запис в базата." });
    }
  });

  app.delete("/journal/:date", async (req, res) => {
    const { date } = req.params;

    try {
      const journal = await readJournal();

      const newJournal = journal.filter((entry) => entry.date !== date);

      if (newJournal.length === journal.length) {
        return res
          .status(404)
          .json({ error: "Запис с тази дата не е намерен." });
      }

      await writeJournal(newJournal);
      res.json({ message: "Записът беше изтрит успешно." });
    } catch (err) {
      console.error("Грешка при изтриване:", err);
      res.status(500).json({ error: "Грешка при изтриване." });
    }
  });
}

module.exports = {
  configExpress,
};
