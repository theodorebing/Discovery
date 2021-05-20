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
router.route('/categories')
    .get(isConnected, categoryController.getAllCategories)
    .post(isConnected, categoryController.createCategory);
router.route('/categories/:id')
    .patch(isConnected, categoryController.updateCategory)
    .delete(isConnected, categoryController.deleteCategory);
router.route('/lists/:id/categories')
    .post(isConnected,categoryController.addListToCategory);
router.route('/lists/:list_id/categories/:category_id')
    .delete(isConnected,categoryController.removeListFromCategory);

// LISTS
router.route('/lists')
    .get(isConnected,listController.getAllLists)
    .post(isConnected,listController.createList);
router.route('/lists/:id')
    .get(isConnected,listController.getOneList)
    .patch(isConnected,listController.updateList)
    .delete(isConnected,listController.deleteList);

// LINKS
router.route('/lists/:id/links')
    .get(isConnected,linkController.getLinksInList);
router.route('/links/:id')
    .get(isConnected,linkController.getOneLink)
    .patch(isConnected,linkController.updateLink)
    .delete(isConnected,linkController.deleteLink);
router.route('/links/')
    .post(isConnected,linkController.createLink);

router.use(mainController.notFound);
router.use(mainController.errorServer);

module.exports = router;