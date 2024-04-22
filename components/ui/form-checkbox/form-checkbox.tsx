import React from "react";
import styles from "./styles.module.css";

export default function FormCheckbox({label, name, value, onChange}) {
    return (
        <div className={styles.FormCheckbox}>
            <input type="checkbox" name={name} value={value} onChange={onChange} checked={value}></input>
            <label>{label}</label>
        </div>
    )
    
}