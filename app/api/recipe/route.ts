import clientPromise from "../../lib/mongodb";
import { NextRequest } from "next/server";

// POST /api/recipe
export async function POST(request: NextRequest) {
    const client = await clientPromise;
    const db = client.db("wonky-recipes");

    const data = await request.json();
    try {
        const recipe = await db.collection("recipes").insertOne(data);
        return Response.json({ status: 200, results: [{ id: recipe.insertedId}]});
    } catch (e) {
        return Response.json({ status: 500});
    }
}