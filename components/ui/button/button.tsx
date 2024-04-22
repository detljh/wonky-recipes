import React from "react";
import styles from "./styles.module.css";

export default function Button({ children, type }) {
    return (
    <button className={styles.Button} type={type}>
        {children}
    </button>
    );
}