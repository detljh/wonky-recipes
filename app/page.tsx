"use client";

import { useEffect, useState } from "react";
import { getRecipes } from "./actions";
import styles from "./styles.module.css";

export default function Page() {
    const initialState = {
        status: null,
        results: []
    }
    const [recipes, setRecipes] = useState(initialState);

    useEffect(() => {
        const updateRecipes = async () => {
            const response = await getRecipes({is_public: true});
            setRecipes(response);
        }

        updateRecipes();
    }, []);

    return (
        <div>
            <h1 className={styles.Header}>Recipes</h1>

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