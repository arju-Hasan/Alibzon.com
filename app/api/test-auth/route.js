import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(request) {
  try {
    await connectDB();

    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    console.log("Auth header received:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          error: "No token provided",
          headers: Object.fromEntries(request.headers.entries()),
        },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("Token extracted:", token ? "Present" : "Missing");

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded:", decoded);
    } catch (error) {
      console.log("Token verification error:", error.message);
      return NextResponse.json(
        { success: false, error: "Invalid token", details: error.message },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await User.findById(decoded.userId).select("-password");
    console.log("User found:", user ? user.email : "Not found");

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Authentication successful",
    });
  } catch (error) {
    console.error("Test auth error:", error);
    return NextResponse.json(
      { success: false, error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
