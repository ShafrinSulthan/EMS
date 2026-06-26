export const login = async (req, res) => {
    try {
        const { email, password, role_type } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        if (role_type === "admin" && user.role !== "ADMIN") {
            return res.status(401).json({
                error: "Not authorized as admin"
            });
        }

        if (role_type === "employee" && user.role !== "EMPLOYEE") {
            return res.status(401).json({
                error: "Not authorized as employee"
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            user: payload,
            token
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            error: "Login failed"
        });
    }
};

export const session = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Session Error:", error);

    return res.status(500).json({
      error: "Failed to get session",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Current password and new password are required",
      });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    return res.status(500).json({
      error: "Failed to change password",
    });
  }
};