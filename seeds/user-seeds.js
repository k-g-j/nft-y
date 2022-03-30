const { User } = require('../models');
const userData = [
 // array of objects here
];
const seedProjects = () => User.bulkCreate(userData);
module.exports = seedUser;