const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  console.log('Request received at /api/hello');
  res.json({ message: 'Hello from backend!' });
});

module.exports = router;
