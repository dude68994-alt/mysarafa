const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'landing-page', 'web', 'html', 'Mysarafa')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'landing-page', 'web', 'html', 'Mysarafa', 'index.html')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));