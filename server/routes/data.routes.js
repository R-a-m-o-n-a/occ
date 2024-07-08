/**
 * @module routes/data
 * @description This module handles the routing for data-related endpoints
 */
import express from 'express';
import { getCityData } from "../controllers/data.controller.js";

const router = express.Router();

/**
 * GET /cities
 * @summary Retrieve city data
 * @description Endpoint to retrieve a list of cities and their associated data stemming from JSON file
 * @response 200 - Successful response with city data
 * @response 500 - Internal server error
 */
router.get('/cities', getCityData);

export default router;
