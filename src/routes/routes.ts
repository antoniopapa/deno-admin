import {Router} from 'https://deno.land/x/oak@v6.4.1/mod.ts';
import {AuthController} from '../controllers/auth.controller.ts';
import {RegisterValidation} from "../validations/register.validation.ts";
import {LoginValidation} from "../validations/login.validation.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";
import {UserController} from "../controllers/user.controller.ts";
import {serviceCollection} from "../services/services.ts";
import {UserCreateValidation} from "../validations/users-create.validation.ts";
import {RoleController} from "../controllers/role.controller.ts";
import {PermissionController} from "../controllers/permission.controller.ts";
import {ProductController} from "../controllers/product.controller.ts";
import {ImageController} from "../controllers/image.controller.ts";
import {OrderController} from "../controllers/order.controller.ts";
import {PermissionMiddleware} from "../middlewares/permission.middleware.ts";

const router = new Router();
router.prefix('/api');

const authController = serviceCollection.get(AuthController);
const userController = serviceCollection.get(UserController);
const roleController = serviceCollection.get(RoleController);
const permissionController = serviceCollection.get(PermissionController);
const productController = serviceCollection.get(ProductController);
const imageController = serviceCollection.get(ImageController);
const orderController = serviceCollection.get(OrderController);


const permissionMiddleware = serviceCollection.get(PermissionMiddleware);

router
    .post('/register', RegisterValidation, c => authController.register(c))
    .post('/login', LoginValidation, c => authController.login(c))
    .get('/user', authMiddleware, c => authController.user(c))
    .post('/logout', authMiddleware, c => authController.logout(c))
    .get(
        '/users', authMiddleware,
        (c, n) => permissionMiddleware.hasAccess(c, n, 'users'),
        c => userController.all(c)
    )
    .post(
        '/users',
        authMiddleware,
        (c, n) => permissionMiddleware.hasAccess(c, n, 'users'),
        UserCreateValidation,
        c => userController.create(c)
    )
    .get('/users/:id', authMiddleware, c => userController.get(c))
    .put('/users/:id', authMiddleware, c => userController.update(c))
    .delete('/users/:id', authMiddleware, c => userController.delete(c))
    .get('/roles', authMiddleware, c => roleController.all(c))
    .post('/roles', authMiddleware, c => roleController.create(c))
    .get('/roles/:id', authMiddleware, c => roleController.get(c))
    .put('/roles/:id', authMiddleware, c => roleController.update(c))
    .delete('/roles/:id', authMiddleware, c => roleController.delete(c))
    .get('/permissions', authMiddleware, c => permissionController.all(c))
    .get('/products', authMiddleware, c => productController.all(c))
    .post('/products', authMiddleware, c => productController.create(c))
    .get('/products/:id', authMiddleware, c => productController.get(c))
    .put('/products/:id', authMiddleware, c => productController.update(c))
    .delete('/products/:id', authMiddleware, c => productController.delete(c))
    .post('/upload', authMiddleware, c => imageController.upload(c))
    .get('/uploads/:file', authMiddleware, c => imageController.image(c))
    .get('/orders', authMiddleware, c => orderController.all(c))
    .post('/export', authMiddleware, c => orderController.export(c))
    .get('/chart', authMiddleware, c => orderController.chart(c))

export default router;
