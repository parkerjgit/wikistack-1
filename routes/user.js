const express = require('express');
const router = express.Router();
const { User, Page } = require('../models'); // models
const { userList, userPages } = require('../views'); // views

router.get('/', async (req, res, next) => {

  try {
    // get all users
    const users = await User.findAll();

    // render list of users
    res.send(userList(users));

  } catch (err) {
    next(err);
  }
})

router.get('/:id', async (req, res, next) => {
  try {

    // get user and the pages he/she authored
    const id = req.params.id;
    const user = await User.findById(id);
    const pages = await Page.findAll({ where: {
      authorId: id
    }})

    // render a user page
    res.send(userPages(user, pages));

  } catch(err) {
    next(err);
  }
})

// router.post('/', (req, res, next) => {
//   res.send('post a user');
// })

// router.put('/:id', (req, res, next) => {
//   res.send('update a user');
// })

// router.delete('/:id', (req, res, next) => {
//   res.send('delete a user');
// })

// router.get('/add', (req, res, next) => {
//   res.send('get a user/add form')
// })

module.exports = router;
