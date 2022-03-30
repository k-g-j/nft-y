const seedProjects = require('./project-seeds');
const seedUsers = require('./user-seeds');
const seedNFTs = require('./nft-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedProjects();
  console.log('\n----- PROJECTS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedNFTs();
  console.log('\n----- NFTs SEEDED -----\n');

  process.exit(0);
};

seedAll();