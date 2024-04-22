import React from "react";
import styles from "./styles.module.css";

export default function Navigation() {
    return (
        <div className={styles.Menu}>
            { /* Invisible input to trigger states*/}
            <input className={styles.Checkbox} type="checkbox" />
            
            { /* The three hamburger lines */ }
            <span className={styles.Line} id={styles.Line1}></span>
            <span className={styles.Line} id={styles.Line2}></span>
            <span className={styles.Line} id={styles.Line3}></span>

            <div className={styles.MenuBar}>
                <ul className={styles.List}>
                    <a href="/"><li>Home</li></a>
                    <a href="/create-recipe"><li>Create a Recipe</li></a>
                    <a href="/my-recipes"><li>My Recipes</li></a>
                </ul>
            </div>
        </div>
    )
    
}