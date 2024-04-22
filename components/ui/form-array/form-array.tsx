import styles from "./styles.module.css";

export default function FormArray({label, type, name, values, onChange, handleAdd, handleDelete}) {
    const getKey = (name, id) => `${name}_${id}`;

    return (
        <div className={styles.FormArray}>
            <label>{label}</label>
            {
                values.map((value, index) => 
                    (
                        <div key={getKey(name, value.id)}>
                            <input type={type} name={name} value={value.value} onChange={(e) => onChange(e, index)}></input>
                            <button type="button" onClick={(e) => handleDelete(e, name, index)}>Delete</button>
                        </div>
                    )
                )
            }
            <button type="button" onClick={(e) => handleAdd(e, name)}>Add</button>
        </div>
    )
    
}