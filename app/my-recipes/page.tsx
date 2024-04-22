"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getRecipes } from "../actions";

export default function MyRecipes() {
    const initialState = {
        status: null,
        results: []
    }
    const [recipes, setRecipes] = useState(initialState);

    useEffect(() => {
        const updateRecipes = async () => {
            const response = await getRecipes({});
            setRecipes(response);
        }

        updateRecipes();
    }, []);

    return (
        <div>
            <h1 className={styles.Header}>My Recipes</h1>

            <div className={styles.RecipeContainer}>
                    {
                        recipes.results.map(recipe => (
                            <a className={styles.RecipeCard} key={recipe._id} href={`/my-recipes/${recipe._id}`}>
                                {recipe.title}
                            </a>
                        ))
                    }
            </div>
        </div>
    )   
}