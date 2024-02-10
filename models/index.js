// models/index.js
const User = require('./User');
const Listing = require('./Listing'); 

User.hasMany(Listing, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Listing.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

module.exports = { User, Listing }; 