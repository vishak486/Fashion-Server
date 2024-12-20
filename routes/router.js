const express=require('express')
const userController=require('../controllers/userController')
const categoryController=require('../controllers/categoryController')
const productController=require('../controllers/productController')
const cartController=require('../controllers/cartController')
const orderController=require('../controllers/orderController')
const contactController=require('../controllers/contactController')
const adminController=require('../controllers/adminController')


const jwtMiddleware=require('../middleware/jwtMiddleware')
const multerMiddleware=require('../middleware/multerMiddleware')


const router=express.Router()

// register : http://localhost:3000/register
router.post('/register',userController.registerController)
// login : http://localhost:3000/login
router.post('/login',userController.loginController)

// admin purpose
// getAllUser: http://localhost:3000/getAllUser
router.get('/getAllUser',jwtMiddleware,userController.getUsersListController)
// admin-users/:id/deleteUser
router.delete('/admin-users/:id/deleteUser',jwtMiddleware,userController.userDeleteController)
// add-category : http://localhost:3000/add-category
router.post('/add-category',jwtMiddleware,multerMiddleware.single('categoryImg'),categoryController.addCategoryController)
// get-category : http://localhost:3000/get-category
router.get('/get-category',jwtMiddleware,categoryController.getAllCategoryController)
// admin-manage-categories/10/edit  : http://localhost:3000/admin-manage-categories/id/edit
router.put('/admin-manage-categories/:id/edit',jwtMiddleware,multerMiddleware.single('categoryImg'),categoryController.editCategoryController)
// admin-manage-categories/10/delete : http://localhost:3000/admin-manage-categories/id/delete
router.delete('/admin-manage-categories/:id/delete-category',jwtMiddleware,categoryController.removeCategoryController)

// Manage Products
// add-product : http://localhost:3000/add-product
router.post('/add-product',jwtMiddleware,multerMiddleware.single('productImg'),productController.addProductController)
// get-product : http://localhost:3000/get-product
router.get('/get-product',jwtMiddleware,productController.getAllProductController)
// admin-manage-products/:id/edit  : http://localhost:3000/admin-manage-products/:id/edit
router.put('/admin-manage-products/:id/edit',jwtMiddleware,multerMiddleware.single('productImg'),productController.editProductController)
// admin-manage-products/:id/edit-stock  : http://localhost:3000/admin-manage-products/:id/edit-stock
router.put('/admin-manage-products/:id/edit-stock',jwtMiddleware,productController.editStockController)
// admin-manage-products/:id/delete : http://localhost:3000/admin-manage-products/:id/delete-product
router.delete('/admin-manage-products/:id/delete-product',jwtMiddleware,productController.deleteProductController)

// home page
router.get('/home-products',productController.homePageProductController)
// view single-product
router.get('/product/:id/view',jwtMiddleware,productController.getProductController)
// products page
router.get('/all-products',productController.getAllProductController)
// getCategory without JWT
router.get('/fetch-category',categoryController.getCategoriesForProductsPage)

// addToCart
router.post('/addToCart',jwtMiddleware,cartController.addCartController)
// getToCart
router.get('/getToCart',jwtMiddleware,cartController.getCartController)
// deleteCart
router.delete('/deleteCart/:id',jwtMiddleware,cartController.deleteCartController);
// emptyCart
router.delete('/emptyCart',jwtMiddleware,cartController.emptyCartController);
// updateCart
router.put('/updateCart/:id',jwtMiddleware,cartController.updateCartQuantity);
// getUserProfile
router.get('/getUserProfile',jwtMiddleware,userController.getUserProfileController);
// editUserProfile
router.put('/editUserProfile',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editUserProfileController)
// validateUserProfile
router.get('/validateUserProfile',jwtMiddleware,userController.validateProfileController);
// placeOrder
router.post('/placeOrder',jwtMiddleware,orderController.placeOrderController)
// getPlaceOrder
router.get('/getPlaceOrder',jwtMiddleware,orderController.getPlaceOrderController)
// adminGetPlaceOrder
router.get('/adminGetPlaceOrder',jwtMiddleware,orderController.getAdminOrderHistoryController)
// Route to edit order status
router.put('/orders/:id/status', jwtMiddleware,orderController.editOrderStatus);

// add contact
router.post('/add-contact',contactController.addContactController)
// get contact
router.get('/get-contact',jwtMiddleware,contactController.getContactController)
// admin-manage-contact/:id/edit
router.put('/admin-manage-contact/:id/edit',jwtMiddleware,contactController.editContactStatus)
// admin-manage-contact/:id/delete
router.delete('/admin-manage-contact/:id/delete',jwtMiddleware,contactController.deleteContactController)
// display contact details in home page
router.get('/display-contact',contactController.getApprovedContactsController)

// adminDashboard
router.get('/adminDashboard',jwtMiddleware,adminController.getAdminDashboardController)

module.exports=router