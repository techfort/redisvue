const e = (key, type, value) => {
  const rand = Math.round(Math.random() * 198) - 99;
  const ts = Date.now() + rand;
  const id = `${key}:${ts}`;
  return Object.freeze({
    key,
    type,
    value,
    id,
  });
};

export const entry = (key, type, value) => e(
  key,
  type,
  value,
);

export const OPS = {
  set: 'getAsync',
  hset: 'hgetallAsync',
  sadd: 'smembersAsync',
  srem: 'smembersAsync',
  hdel: 'hgetallAsync',
  zadd: 'zrangeAsync',
};

export const TYPES = {
  set: 'string',
  hset: 'hash',
  sadd: 'set',
  srem: 'set',
  hdel: 'hash',
  zadd: 'zset',
  zrem: 'zset',
  lpush: 'list',
  lpop: 'list',
  rpush: 'list',
  rpop: 'list',
};

export const GETTERS = {
  string: 'getAsync',
  hash: 'hgetallAsync',
  set: 'smembersAsync',
  zset: 'zget',
  list: 'getList',
};

export default promise => promise.then(data => ({ error: null, data }))
  .catch(error => ({ error, data: null }));
