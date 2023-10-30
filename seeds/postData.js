const { Posts } = require('../models');

const postsData = [
  {
    
  },
  {
    
  },
  {
    
  },
  {
    
  },
];

const seedPosts = () => Posts.bulkCreate(postsdata);

module.exports = seedPosts;
