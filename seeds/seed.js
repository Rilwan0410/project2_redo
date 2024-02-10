const sequelize = require('../config/connection');
const { User, Listing } = require('../models');

const userData = require('./userData.json');
const listingData = require('./listingData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Adjusted seeding for listing
  for (const listingItem of listingData) {
    await Listing.create({
      name: listingItem['item name'],
      description: listingItem.description,
      date_created: new Date(), // You may want to adjust this based on your needs
      pricing: listingItem.pricing,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();