import express from "express";
const router = express.Router();

import { addcourseee } from "../controllers/head/eecourse";

router.post("/addcourseee", addcourseee);


module.exports = router;