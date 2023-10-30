const { Comments } = require('../models');

const commentsData = [
  {
    
  },
  {
    
  },
  {
   
  },
];

const seedComments = () => Comments.bulkCreate(commentsdata);

module.exports = seedComments;