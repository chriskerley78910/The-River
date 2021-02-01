
import regeneratorRuntime from 'regenerator-runtime'
const dotenv = require('dotenv')
dotenv.config()

// ensure tests fail on unhandledRejection
process.on('unhandledRejection', (err) => {
  console.log(err)
  fail(err);
});
