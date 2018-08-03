const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const models = require('./models');
const userRouter = require('./routes/user');
const wikiRouter = require('./routes/wiki');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false}));

const PORT = 1887;

// routes
app.use('/user', userRouter);
app.use('/wiki', wikiRouter);

app.get('/', (req, res) => {
  //res.send(layout(''))
  res.redirect('/wiki');
})

app.listen(PORT, () => {
    console.log(`LOUD AND CLEAR on port ${PORT}`);
});

models.connect();

