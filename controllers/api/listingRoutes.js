const router = require('express').Router();
const { Listings } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newListing = await Listings.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newListing); // Corrected: newListing instead of newlisting
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const ListingData = await Listings.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!ListingData) {
      res.status(404).json({ message: 'No listings found with this id!' });
      return;
    }

    res.status(200).json(ListingData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;