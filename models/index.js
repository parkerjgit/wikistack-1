const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

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

Page.beforeValidate((pageInst) => {
  const formatSlug = (str) => str.replace(/\s+/g, '_').replace(/\W/g, '');
  pageInst.slug = formatSlug(pageInst.title);
})

Page.belongsTo(User, { as: 'author' });
// User.hasMany(Page);

const connect = async () => {
  await db.sync({force: true}); //
  // db.close()
};

module.exports = { Page, User, connect }
