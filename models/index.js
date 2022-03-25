//I will change foreignKeys and functions when I get seeds files
// import all models
const Post = require('./Post');
const User = require('./User');
const nftList = require('./nftList');
const nftProject = require('./nftProject');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

module.exports = { User, Post, nftList, nftProject };
