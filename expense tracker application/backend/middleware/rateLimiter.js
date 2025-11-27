import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit(req.ip);
    if (!success) {
      return res.status(429).json({ message: "Rate limit exceeded" });
    }
    next();
  } catch (error) {
    console.log("Rate Limiter Error", error);
  }
};

export default rateLimiter;
