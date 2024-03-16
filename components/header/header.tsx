import React from "react";
import styles from "./styles.module.css";

export default function Header() {
    return (
        <div className={styles.Header}>
            <div className={styles.Title}>Wonky Recipes</div>
            <div>
                <input type="text" />
                <button>Search</button>
            </div>
        </div>
    )
    
}