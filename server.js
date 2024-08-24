// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Serve static files from the 'zaeem-lab1' directory
// app.use('/zaeem-lab1', express.static(path.join(__dirname, 'zaeem-lab1')));

// // Endpoint to get list of HTML files
// app.get('/list-labs', (req, res) => {
//     const labFolder = path.join(__dirname, 'zaeem-lab1');
//     fs.readdir(labFolder, (err, files) => {
//         if (err) {
//             return res.status(500).json({ error: 'Unable to read directory' });
//         }
//         // Filter only .html files
//         const htmlFiles = files.filter(file => path.extname(file) === '.html');
//         res.json(htmlFiles);
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://http://127.0.0.1:5500/`);
// });
