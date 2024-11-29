import express from "express"
import { getAllNotification, updateNotification,getNotificationById } from "../controllers/notificationModule/notification.controller.js"
import {scheduleJobs} from "../utils/notificationScheduler.js"

const router=express.Router()
scheduleJobs()

router.get("/getNotification/:userId",getAllNotification)
router.put("/updateNotification/:notificationId",updateNotification)
router.get("/getNotificationById/:notificationId",getNotificationById)

export default router