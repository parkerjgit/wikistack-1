const express = require('express');
const morgan = require('morgan');
const app = express();
// const layout = require('./views/layout');
const db = require('./models');
const userRouter = require('./routes/user');
const wikiRouter = require('./routes/wiki');

// middleware
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false}));

// config
const PORT = 1889;

// hand off requests to appropriate router
app.use('/users', userRouter);
app.use('/wiki', wikiRouter);

// set homepage
app.get('/', (req, res) => {
  res.redirect('/wiki');
})

const init = () => {
  // 1. connect to database
  db.connect();
  // 2. open port AFTER connected to database!
  app.listen(PORT, () => {
      console.log(`LOUD AND CLEAR on port ${PORT}`);
  });
}

init();

