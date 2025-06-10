require('dotenv').config();


const express = require('express');
   const cors = require('cors');
   const fs = require('fs');

   const app = express();
   const PORT = process.env.PORT || 5000;

   app.use(cors());
   app.use(express.json());

   // Load data from JSON file
   const data = JSON.parse(fs.readFileSync('data.json'));

   // Search endpoint
   app.get('/api/search', (req, res) => {
     const query = req.query.q.toLowerCase();
     const filteredData = data.filter(item =>
       item['Company Name'].toLowerCase().includes(query)
     ).slice(0, 20); // Get top 20 results
     res.json(filteredData);
   });

   app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
   });