import Express from "express";
import userRouter from "./userRouter.js";



const router = new Express();


router.use("/user", userRouter)

export default router;