"use server";

import { ObjectId } from "mongodb";
import clientPromise from "./lib/mongodb";
import { Recipe } from "./model";

export interface GetRecipesFilter {
    id?: number; 
    is_public?: boolean;
}

export async function getRecipes(filter: GetRecipesFilter) {
    const client = await clientPromise;
    const db = client.db("wonky-recipes");

    const dbFilter = {};

    if (filter.id) {
        dbFilter["_id"] = new ObjectId(filter.id);
    }

    if (filter.is_public) {
        dbFilter["is_public"] = filter.is_public;
    }

    try {
        const recipes = await db.collection("recipes").find(dbFilter).toArray();
        return {
            status: 200,
            results: recipes
        };
    } catch (e) {
        return {
            status: 500,
            results: []
        };
    } 
}

export async function deleteRecipe(id: string) {
    const client = await clientPromise;
    const db = client.db("wonky-recipes");

    try {
        await db.collection("recipes").deleteOne({
            "_id": new ObjectId(id)
        });
        return {
            status: 200,
        };
    } catch (e) {
        return {
            status: 500
        };
    } 
}

export async function updateRecipe(data) {
    const client = await clientPromise;
    const db = client.db("wonky-recipes");

    try {
        await db.collection("recipes").updateOne({
            "_id": new ObjectId(data._id)
        }, {
            $set: {
                "title": data.title,
                "ingredients": data.ingredients,
                "steps": data.steps,
                "is_public": data.is_public
            }
        });
        return {
            message: "Updated"
        };
    } catch (e) {
        return {
            message: "Error"
        };
    } 
}