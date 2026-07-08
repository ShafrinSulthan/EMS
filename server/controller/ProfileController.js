import Employee from "../models/Employee.js";
import User from "../models/User.js";


// GET /api/profile
export const getProfile = async (req, res) => {
  try {
    const session = req.session;

    const employee = await Employee.findOne({
      userId: session.userId,
    });

    // Employee profile
    if (employee) {
      return res.json(employee);
    }

    const user = await User.findById(session.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.json(user);

  } catch (error) {
    console.error("PROFILE ERROR:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
};

// PUT /api/profile
export const updateProfile = async (req, res) => {
  try {
    const session = req.session;

    const employee = await Employee.findOne({
      userId: session.userId,
    });

    // Employee
    if (employee) {
      if (employee.isDeleted) {
        return res.status(403).json({
          error: "Your account is deactivated. You cannot update your profile.",
        });
      }

      employee.bio = req.body.bio;
      await employee.save();

      return res.json({ success: true });
    }

    // Admin
    const user = await User.findById(session.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    user.bio = req.body.bio;
    await user.save();

    return res.json({ success: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to update profile",
    });
  }
};