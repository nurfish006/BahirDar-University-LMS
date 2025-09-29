import express from "express";
const router = express.Router();
import { selectdeptT} from "../controllers/teacher/selectdept";
import { selectdeptH } from "../controllers/teacher/selectDeptHead";

router.post("/teacherselectdept", selectdeptT);
router.post("/selectdeptH", selectdeptH);


module.exports = router;