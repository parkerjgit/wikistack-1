const express = require('express');
const router = express.Router();
const { addPage, wikiPage, editPage, main } = require('../views');
const { Page, User } = require('../models');


// router.get('/:id')

router.post('/:slug', async (req, res, next) => {
  try {

    // 1. get page instance by slug
    const page = await Page.findOne({ where: {
      slug: req.params.slug,
    }});

    // 2. update page content
    await page.update({
      content: req.body.content
    });

    // NOTE: no need to save b/c update updates AND SAVES.
    // await user.save();
    // await page.save();

    // 3. goto updated page
    res.redirect(`/wiki/${page.slug}`);

  } catch (err) {
    next(err);
  }
})

// handle post request to /wiki/ (via form submit)
router.post('/', async (req, res, next) => {

  try {

    // 1. get existing user or create (and save) a new one.
    const [user, wasCreated] = await User.findOrCreate({ where: {
      name: req.body.name,
      email: req.body.email
    } });

    // 2. create (and save) new Page instance
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    })

    // 3. set authorship (relation) of page.
    await page.setAuthor(user);

    // NOTE: no need to save b/c create creates AND SAVES.
    // await user.save();
    // await page.save();

    // 4. goto newly created page
    res.redirect(`/wiki/${page.slug}`);

  } catch (err) {
    next(err);
  }
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug/delete', async (req, res, next) => {
  try {
    // get the page
    const page = await Page.findOne({ where: {
      slug: req.params.slug}
    });

    // delete the page
    await page.destroy();

    // send page deleted msg
    res.send('page deleted.');

  } catch (err) {
    next(err);
  }
})

router.get('/:slug/edit', async (req, res, next) => {
  try {
    // get a page and author
    const page = await Page.findOne({ where: {
      slug: req.params.slug}
    });
    const author = await page.getAuthor();

    // render a pre-populated edit page
    res.send(editPage(page, author));

  } catch (err) {
    next(err);
  }
})

router.get('/:slug', async (req, res, next) => {
  try {
    // get a page and author
    const page = await Page.findOne({ where: {
      slug: req.params.slug}
    });
    const author = await page.getAuthor();

    // render a wiki page
    res.send(wikiPage(page, author));

  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) =>  {
  try {
    const allPages = await Page.findAll();
    res.send(main(allPages));

  } catch (err) {
    next(err);
  }
})

module.exports = router;
