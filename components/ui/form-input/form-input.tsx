import React from "react";
import styles from "./styles.module.css";

export default function FormInput({label, type, name, value, onChange, required}) {
    return (
        <div className={styles.FormInput}>
            <label>{label}</label>
            <input required={required} type={type} name={name} value={value} onChange={onChange}></input>
        </div>
    )
    
}