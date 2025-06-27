const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { fullname, email, message } = req.body;
  if (!fullname || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const entry = { fullname, email, message, date: new Date().toISOString() };
  let data = [];
  if (fs.existsSync('contacts.json')) {
    data = JSON.parse(fs.readFileSync('contacts.json'));
  }
  data.push(entry);
  fs.writeFileSync('contacts.json', JSON.stringify(data, null, 2));
  res.json({ success: true, message: 'Contact form submitted successfully!' });
});

app.get('/', (req, res) => {
  res.send('Contact backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});