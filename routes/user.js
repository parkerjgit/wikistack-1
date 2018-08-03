const express = require('express');
const router = express.Router();
const { User } = require('../models');
// const { addPage, wikiPage } = require('../views');

router.get('/', async (req, res, next) => {
  // try {
  //   console.log(User.allUsers);
  //   const allUsers = await User.findAll();
  //   res.send(allUsers);
  // } catch (err) {
  //   console.log(err);
  // }
  res.send('get all users');
})

router.get('/:id', (req, res, next) => {
  res.send('get a user')
})

router.post('/', (req, res, next) => {
  res.send('post a user');
})

router.put('/:id', (req, res, next) => {
  res.send('update a user');
})

router.delete('/:id', (req, res, next) => {
  res.send('delete a user');
})

router.get('/add', (req, res, next) => {
  res.send('get a user/add form')
})

module.exports = router;
