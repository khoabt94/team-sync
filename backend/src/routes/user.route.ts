import { userControllers } from '@controllers';
import { authenticatedGuard } from '@guards/authenticated.guard';
import { Router } from 'express';

// '/user'
const userRoutes = Router();

userRoutes.use(authenticatedGuard);
userRoutes.get('/current', userControllers.getCurrentUser);

export { userRoutes };
