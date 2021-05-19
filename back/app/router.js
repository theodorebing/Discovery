const express = require('express');

const router = express.Router();

const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const listController = require('./controllers/listController');
const linkController = require('./controllers/linkController');
const isConnected = require('./middlewares/isConnected');

// USERS
router.post('/subscription',userController.subscribe);
router.post('/connexion',userController.openSession);
router.get('/logout',userController.logout);

router.get('/account',isConnected,userController.getUserInfo);
router.patch('/account',isConnected,userController.updateUser);
router.delete('/account',isConnected,userController.deleteUser);

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