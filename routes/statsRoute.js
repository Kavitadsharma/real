
const statsService = require('../service/stats');
const express = require('express');
const router = express.Router();

router.get('/company/:symbol/day-stats', async (req, res) => {
  try {
    const { symbol } = req.params;
    const stats = await statsService.getDayStats(symbol);
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/company/:symbol/month-stats', async (req, res) => {
  try {
    const { symbol } = req.params;
    const stats = await statsService.getMonthStats(symbol);
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
