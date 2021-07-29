const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })

    if (!singleCategory) {
      res.status(404).json({ message: 'Category associated with that id not found!'});
      return;
    }
    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const singleCategory = await Category.create(req.body);
      res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const singleCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!singleCategory) {
      res.status(404).json({ message: 'No category with this id exists'});
      return;
    }
    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  // try {
  //   const singleCategory = await Category.destroy({
  //     where: {
  //       id: req.params.id,
  //     },
  //   });
  //   if (!singleCategory) {
  //     res.status(404).json({ message: 'No category with this id exists'});
  //     return;
  //   }
  //   res.status(200).json(singleCategory);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;
