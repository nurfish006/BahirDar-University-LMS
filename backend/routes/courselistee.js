import express from "express";
const router = express.Router();

import { courselistee } from "../controllers/head/courselistee";

router.get("/courselistee", courselistee);


module.exports = router;