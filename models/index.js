const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: Sequelize.STRING,
  content: Sequelize.TEXT,
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

const User = db.define('users', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

const connect = async () => {
  await db.sync();
  db.close()
};

module.exports = { Page, User, connect }
