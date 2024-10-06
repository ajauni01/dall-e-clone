import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('end', () => {
  console.log('Redis connection closed');
});

export const setAsync = promisify(client.set).bind(client);
export const getAsync = promisify(client.get).bind(client);