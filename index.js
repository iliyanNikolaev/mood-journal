const express = require('express');
const { readJournal, writeJournal} = require('./service');

async function testServices() {
   try {
    let j = await readJournal();
    console.log(j);
    
    const record = {
        mood: ":)",
        note: "good",
        date: new Date().toISOString()
    }

    await writeJournal(record)

    j = await readJournal();
    console.log(j);
   } catch (err) {
    console.log(err)
   }
    
}

//testServices();


const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(3000, () => console.log('server is started on port 3000'));