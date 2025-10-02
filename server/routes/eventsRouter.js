import express from 'express';
import { getAllEvents } from '../controllers/eventsController';

const router = express.Router();

router.get('/', getAllEvents);

export default Router;
