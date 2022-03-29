const Users = require('./Users');
const Projects = require('./Projects');
const NFT = require('./NFT');

Users.hasMany(NFT, {
    foreignKey: 'users_id'
});

NFT.belongsTo(Users, {
    foreignKey: 'users_id',
});


module.exports = { Users, Projects, NFT }