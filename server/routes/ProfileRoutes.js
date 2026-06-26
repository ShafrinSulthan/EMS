import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getProfile, updateProfile } from "../controller/ProfileController.js";



const ProfileRouter= Router();

ProfileRouter.get("/", protect, getProfile);
ProfileRouter.put("/", protect, updateProfile);

export default ProfileRouter