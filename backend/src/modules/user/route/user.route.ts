import { authenticatedGuard } from '@modules/auth';
import { userControllers } from '@modules/user';
import { Router } from 'express';

// '/user'
const userRoutes = Router();

userRoutes.use(authenticatedGuard);
userRoutes.get('/current', userControllers.getCurrentUser);

export { userRoutes };
