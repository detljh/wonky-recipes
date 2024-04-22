'use client'

import React, { useState } from "react";
import styles from "./styles.module.css";

import FormInput from "../../components/ui/form-input/form-input";
import Button from "../../components/ui/button/button";
import FormCheckbox from "../../components/ui/form-checkbox/form-checkbox";
import FormArray from "../../components/ui/form-array/form-array";
import { useRouter } from "next/navigation";
import { ARRAY_FIELDS, ArrayField, FormField } from "../model";

export default function CreateRecipe() {
    const defaultIdCount = 0;

    const router = useRouter();

    const [formData, setFormData] = useState({
        [FormField.TITLE]: "",
        [FormField.INGREDIENTS]: [ {
            id: defaultIdCount,
            value: ""
        }],
        [FormField.STEPS]: [ {
            id: defaultIdCount,
            value: ""
        }],
        [FormField.IS_PUBLIC]: false
    });
    const [idCount, setIdCount] = useState(defaultIdCount + 1);

    const handleInputChange = (e, index) => {
        let {type, name, value} = e.target;
        if (type == "checkbox") {
            value = e.target.checked;
        }

        if (ARRAY_FIELDS.includes(name)) {
            const arrayValue = [...formData[name]];
            arrayValue[index].value = value;
            value = arrayValue;
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleAdd = (e, name) => {
        const arrayValues = [...formData[name]];
        arrayValues.push({
            id: idCount,
            value: ""
        });
        setIdCount((idCount) => idCount + 1);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: arrayValues
        }));
    }

    const handleDelete = (e, name, index) => {
        const arrayValues = [...formData[name]];
        arrayValues.splice(index, 1);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: arrayValues
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const parsedFormData = {}
        Object.keys(formData).forEach((key: FormField) => {
            let value = formData[key];
            if (ARRAY_FIELDS.includes(key)) {
                const newValue = (value as ArrayField[]).filter(value => value.value !== "").map(value => value.value);
                parsedFormData[key] = newValue;
            } else {
                parsedFormData[key] = value;
            }
        })

        await fetch("/api/recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedFormData)
        });

        router.push("/my-recipes");
    }

    return (
        <div>
            <h1 className={styles.Header}>Create Recipe</h1>
            
            <form className={styles.Form} onSubmit={handleSubmit}>
                <FormInput label="Recipe Title" type="text" name={FormField.TITLE} value={formData.title} onChange={handleInputChange} required={true} />
                <FormArray label="Ingredients" type="text" name={FormField.INGREDIENTS} values={formData.ingredients} onChange={handleInputChange} handleAdd={handleAdd} handleDelete={handleDelete} />
                <FormArray label="Steps" type="text" name={FormField.STEPS} values={formData.steps} onChange={handleInputChange} handleAdd={handleAdd} handleDelete={handleDelete} />
                <FormCheckbox label="Public recipe" name={FormField.IS_PUBLIC} value={formData.is_public} onChange={handleInputChange} />
                <div className={styles.Button}>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </div>
    )
    
}