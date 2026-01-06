import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Product";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;

    let query = { isActive: true };

    // Category filter
    if (category && category !== "all") {
      query.category = category;
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case "price-low":
        sortObj = { price: 1 };
        break;
      case "price-high":
        sortObj = { price: -1 };
        break;
      case "popular":
        sortObj = { rating: -1 };
        break;
      case "newest":
      default:
        sortObj = { createdAt: -1 };
        break;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Products API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  console.log("POST /api/products called");

  try {
    await connectDB();

    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    console.log("Auth header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No valid auth header found");
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("Token extracted:", token ? "Present" : "Missing");

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded successfully:", decoded.userId);
    } catch (error) {
      console.log("Token verification failed:", error.message);
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await User.findById(decoded.userId).select("-password");
    console.log(
      "User found:",
      user ? `${user.email} (${user.role})` : "Not found"
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
      console.log("User is not admin:", user.role);
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    console.log("Admin verification successful, creating product...");

    const body = await request.json();
    const {
      title,
      description,
      price,
      category,
      sizes,
      colors,
      image,
      images,
      stock,
      brand,
      tags,
    } = body;

    // Generate SKU
    const sku = `${category.toUpperCase()}-${Date.now()}`;

    const product = new Product({
      title,
      description,
      price,
      category,
      sizes,
      colors,
      image,
      images,
      stock,
      brand,
      tags,
      sku,
    });

    await product.save();

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Product Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
