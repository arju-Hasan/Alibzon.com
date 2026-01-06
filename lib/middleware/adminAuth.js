import jwt from "jsonwebtoken";
import User from "../../models/User";
import connectDB from "../mongodb";

export async function verifyAdmin(req) {
  try {
    await connectDB();

    // Get authorization header from the request
    const authHeader =
      req.headers.get("authorization") || req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      console.log("No token found in headers:", req.headers);
      return { error: "No token provided", status: 401 };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return { error: "User not found", status: 401 };
    }

    if (user.role !== "admin") {
      return { error: "Admin access required", status: 403 };
    }

    return { user, status: 200 };
  } catch (error) {
    console.error("Admin verification error:", error);
    return { error: "Invalid token", status: 401 };
  }
}
