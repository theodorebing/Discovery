const express = require('express');

const router = express.Router();

const mainController = require('./controllers/mainController');
const categoryController = require('./controllers/categoryController');
const listController = require('./controllers/listController');
const linkController = require('./controllers/linkController');



// CATEGORIES
router.route('/categories/:id')
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);
router.route('/categories')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory);
router.route('/lists/:id/categories')
    .post(categoryController.addListToCategory);
router.route('/lists/:list_id/categories/:category_id')
    .delete(categoryController.removeListFromCategory);

// LISTS
router.route('/lists')
    .get(listController.getAllLists)
    .post(listController.createList);
router.route('/lists/:id')
    .get(listController.getOneList)
    .patch(listController.updateList)
    .delete(listController.deleteList);

// LINKS
router.route('/lists/:id/links')
    .get(linkController.getLinksInList);
router.route('/links/:id')
    .get(linkController.getOneLink)
    .patch(linkController.updateLink)
    .delete(linkController.deleteLink);
router.route('/links/')
    .post(linkController.createLink);

router.use(mainController.notFound);
router.use(mainController.errorServer);

module.exports = router;