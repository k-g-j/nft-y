const Users = require('./Users');
const Projects = require('./Projects');
const NFT = require('./NFT');

Users.hasMany(NFT, {
    foreignKey: 'users_id'
});

NFT.belongsTo(Users, {
    foreignKey: 'users_id',
});

Projects.hasMany(NFT, {
    foreignKey: 'projects_id'
});

NFT.belongsTo(Projects, {
    foreignKey: 'projects_id',
});


module.exports = { Users, Projects, NFT }
