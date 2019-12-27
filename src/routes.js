import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProvidersController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

const routes = new Router();

const upload = multer(multerConfig);
routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);
routes.use(authMiddleware);
routes.put('/user', UserController.update);

routes.post('/file', upload.single('file'), FileController.store);
routes.get('/providers', ProvidersController.index);
routes.get('/providers/:providerId/available', AvailableController.index);
routes.post('/appointment', AppointmentController.store);
routes.get('/appointment', AppointmentController.index);
routes.delete('/appointment/:id', AppointmentController.delete);
routes.get('/schedules', ScheduleController.index);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);
export default routes;
