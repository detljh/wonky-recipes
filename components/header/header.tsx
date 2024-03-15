import React from "react";
import styles from "./styles.module.css";

export default function Header() {
    return (
        <div>
            <div className={styles.Header}>
                <p className={styles.HeaderText}>Wonky Recipes</p>
            </div>
        </div>
    )
    
}