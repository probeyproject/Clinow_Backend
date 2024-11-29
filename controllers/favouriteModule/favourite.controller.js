import { addFavouriteModel, deleteFavouriteModel, getAllFavouriteDoctorByUserIdModel } from "../../models/favourites.model.js"


export const addFavourite=async(req,res)=>{
    const {userId,doctorId}=req.body
    if(!userId||!doctorId){
        return res.status(400).json({message:"userId and DoctorId is required"})
    }
    try {
        const result =await addFavouriteModel(userId,doctorId)
        return res.status(200).json({message:"Favourite Added",result})
    } catch (error) {
        return res.status(500).json({message:error.message})        
    }
}

export const getFavouriteByUserId=async(req,res)=>{
    const {userId}=req.params
    if(!userId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result=await getAllFavouriteDoctorByUserIdModel(userId)
        return res.status(200).json({message:"Fetch Success",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteFavourite=async(req,res)=>{
    const id=req.params.id
    try {
        const result=await deleteFavouriteModel(id)
        return res.status(200).json({message:"Delete "})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}