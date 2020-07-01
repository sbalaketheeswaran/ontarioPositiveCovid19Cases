const server = require('./config/server');

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});