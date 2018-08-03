const express = require('express');
const router = express.Router();
const { addPage, wikiPage } = require('../views');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  // Page.author
  // res.send(wikiPage(page, author));
})

// router.get('/:id')

// post to /wiki/ from form
router.post('/', async (req, res, next) => {

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    // slug: 'iamaslug'
  })

  try {
    console.log('before save &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    console.log(page);
    await page.save();
    console.log('after save &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    console.log(page);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

module.exports = router;
