const {
  PORT = 3001,
  DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'a1d731321cb2024fe9dfa90167bc4b40c2eefd1a4975d641f3d1484f71f5868c',
} = process.env;

module.exports = {
  PORT,
  DB,
  JWT_SECRET,
};
