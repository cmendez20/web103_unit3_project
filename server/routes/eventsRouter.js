import express from "express";
import {
  getAllEvents,
  getEventsByLocation,
} from "../controllers/eventsController.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/locations/:locationId", getEventsByLocation);

export default router;
