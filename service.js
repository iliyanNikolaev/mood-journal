const fs = require('fs').promises;
const path = require('path');

const db = path.join(__dirname, 'data', 'journal.json');

async function readJournal() {
  try {
    const data = await fs.readFile(db, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading journal:', err);
    return [];
  }
}

async function writeJournal(entries) {
    try {
      const json = JSON.stringify(entries, null, 2);
      await fs.writeFile(db, json, 'utf-8');
    } catch (err) {
      console.error('Error writing journal:', err);
    }
}

module.exports = {
    readJournal,
    writeJournal
}