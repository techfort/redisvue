const e = (key, type, value) => {
  const id = `${key}:${Date.now()}`;
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
};

export const TYPES = {
  set: 'string',
  hset: 'hash',
  sadd: 'set',
  srem: 'set',
  hdel: 'hash',
};

export const GETTERS = {
  string: 'getAsync',
  hash: 'hgetallAsync',
  set: 'smembersAsync',
};

export default promise => promise.then(data => ({ error: null, data }))
  .catch(error => ({ error, data: null }));
