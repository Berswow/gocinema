import Express from "express";
import Auth from "../controller/user/auth.js"
import {checkAuth} from "../middleware/checkAuth.js";


const router = new Express();


router.post("/register", Auth.register)
router.post('/login', Auth.login)
router.get('/auth', checkAuth, Auth.check)


export default router