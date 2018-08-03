const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const models = require('./models');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

const PORT = 1337;

app.get('/', (req, res) => {
  res.send(layout(''))
})

app.listen(PORT, () => {
    console.log(`LOUD AND CLEAR on port ${PORT}`);
});

models.connect();

