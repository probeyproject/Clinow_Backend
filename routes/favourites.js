import express from "express";
import { addFavourite, deleteFavourite, getFavouriteByUserId } from "../controllers/favouriteModule/favourite.controller.js";

const router=express.Router()

router.post("/addFavourite",addFavourite)
router.get("/getFavourite/:userId",getFavouriteByUserId)
router.delete("/deleteFavourite/:id",deleteFavourite)

export default router