import {Router} from "express";
import { signUp, logIn } from "../controllers/user.controller.js";

const router =  Router();

router.route("/signUp").post(signUp);
router.route("/logIn").post(logIn);
export default router;