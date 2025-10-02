import express from 'express';
import { getAllLocations } from '../controllers/locationsController';

const router = express.Router();

router.get('/', getAllLocations);

export default Router;
