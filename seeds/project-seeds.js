const { Projects } = require('../models');
const projectsData = [
 // array of objects here
];
const seedProjects = () => Projects.bulkCreate(projectsData);
module.exports = seedProjects;