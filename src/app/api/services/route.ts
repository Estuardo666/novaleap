/**
 * Example API Route: Services List
 * 
 * GET /api/services - Fetch all active services with optional filtering
 * POST /api/services - Create a new service (admin only)
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types";

/**
 * GET Handler
 * Returns paginated list of services
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where = category
      ? { isActive: true, category }
      : { isActive: true };

    // Fetch services with pagination
    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.service.count({ where }),
    ]);

    const response: ApiResponse<typeof services> = {
      status: "success",
      data: services,
      message: "Services fetched successfully",
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch services";
    return NextResponse.json(
      {
        status: "error",
        message: errorMessage,
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

/**
 * POST Handler
 * Creates a new service (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication middleware check here

    const body = await request.json();
    const { name, slug, description, price, duration, category, icon, image } =
      body;

    // Validate required fields
    if (!name || !slug || !price || !duration || !category) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required fields",
          errors: {
            name: !name ? ["Name is required"] : [],
            slug: !slug ? ["Slug is required"] : [],
            price: !price ? ["Price is required"] : [],
            duration: !duration ? ["Duration is required"] : [],
            category: !category ? ["Category is required"] : [],
          },
        } as ApiResponse<null>,
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        description,
        price,
        duration,
        category,
        icon,
        image,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        data: service,
        message: "Service created successfully",
      } as ApiResponse<typeof service>,
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create service";
    return NextResponse.json(
      {
        status: "error",
        message: errorMessage,
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}
