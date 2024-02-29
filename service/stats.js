
const Order = require('../model/orders');
const redisClient = require('../utils/redis');

class StatsService {
  async getDayStats(companySymbol) {
    const cacheKey = `day-stats:${companySymbol}`;
    const cachedStats = await redisClient.get(cacheKey);

    if (cachedStats) {
      return JSON.parse(cachedStats);
    }

    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);

    const stats = await Order.aggregate([
      {
        $match: {
          company_symbol: companySymbol,
          time: { $gte: startOfDay, $lt: endOfDay },
        },
      },
      {
        $group: {
          _id: null,
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
          numOfOrders: { $sum: 1 },
        },
      },
    ]);

    const result = stats.length > 0 ? stats[0] : { maxPrice: null, minPrice: null, numOfOrders: 0 };

    await redisClient.setex(cacheKey, 86400, JSON.stringify(result));

    return result;
  }

}

module.exports = new StatsService();
