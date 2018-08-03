const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

const formatSlug = (str) => str.replace(/\s+/g, '_').replace(/\W/g, '');

Page.beforeValidate((pageInst) => {
  console.log('before validate &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
  console.log(`title ${pageInst.title} ----------------`);
  pageInst.slug = formatSlug(pageInst.title);
  console.log(`slug ${pageInst.slug} ----------------`);

})

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});



const connect = () => {
  db.sync({force: true});
  //db.close()
};

module.exports = { Page, User, connect }
