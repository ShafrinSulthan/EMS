import { Router } from "express";
import { protect } from "../middleware/auth";
import { getProfile, updateProfile } from "../controller/ProfileController";



const ProfileRouter= Router();

ProfileRouter.get("/", protect. getProfile)
ProfileRouter.post("/", protect. updateProfile)

export default ProfileRouter