"use client";

import { useRouter } from "next/navigation";
import { createRef, useEffect, useState } from "react";
import { useFormState} from "react-dom";
import { deleteRecipe, getRecipes, updateRecipe } from "../../actions";
import styles from "./styles.module.css";
import { ARRAY_FIELDS, ArrayField, FormField, Recipe, RecipeForm } from "../../model";
import FormInput from "../../../components/ui/form-input/form-input";
import FormArray from "../../../components/ui/form-array/form-array";
import FormCheckbox from "../../../components/ui/form-checkbox/form-checkbox";

export default function RecipePage({ params }) {
    const router = useRouter();

    const formRef = createRef<HTMLFormElement>();

    const { id } = params;
    const initialState = {
        status: null,
        results: []
    }
    const [recipes, setRecipes] = useState(initialState);
    const [recipe, setRecipe] = useState({} as Recipe)
    const [isEditing, setIsEditing] = useState(false);
    
    const [formData, setFormData] = useState({} as RecipeForm);
    const initialFormState = {
        message: ""
    }
    const resetState = () => {
        toggleEdit(false);
        // formRef.current.reset();
    }

    const handleEdit = async () => {
        const parsedFormData = {};
        Object.keys(formData).forEach(key => {
            let value = formData[key];
            if (ARRAY_FIELDS.includes(key as FormField)) {
                const newValue = (value as ArrayField[]).filter(value => value.value !== "").map(value => value.value);
                parsedFormData[key] = newValue;
            } else {
                parsedFormData[key] = value;
            }
        })
        const response = await updateRecipe(parsedFormData);
        
        resetState();
        router.refresh();
        return response;
    }
    const [form, formAction] = useFormState(handleEdit, initialFormState);
    const defaultIdCount = 0;
    const [idCount, setIdCount] = useState(defaultIdCount + 1);

    const Buttons = () => {
        return isEditing ? (
            <div className={styles.ButtonContainer}>
                <button type="button" onClick={() => toggleEdit(false)}>Cancel</button>
                <button type="submit">Save</button>
            </div>
        ) : (
            <div className={styles.ButtonContainer}>
                <button type="button" onClick={() => toggleEdit(true)}>Update</button>
                <button type="button" onClick={handleDelete}>Delete</button>
            </div>
        )
    }

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

    const handleAddField = (e, name) => {
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

    const handleDeleteField = (e, name, index) => {
        const arrayValues = [...formData[name]];
        arrayValues.splice(index, 1);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: arrayValues
        }));
    }

    useEffect(() => {
        const updateRecipe = async () => {
            const response = await getRecipes({id});
            setRecipes(response);
        }

        updateRecipe();
    }, [form]);

    useEffect(() => {
        const result = recipes.results[0] as Recipe;
        setRecipe(result);

        if (result) {
            const formRecipe = {} as RecipeForm;
            let currIdCount = idCount;
            Object.keys(result).forEach(key => {
                let value = result[key];
                if (ARRAY_FIELDS.includes(key as FormField)) {
                    
                    
                    formRecipe[key] = value.map(value => {
                        const newValue = {
                            id: currIdCount,
                            value: value
                        };
                        currIdCount += 1;
                        return newValue;
                    });
                } else {
                    formRecipe[key] = value;
                }
            });
            setIdCount(currIdCount + 1);
            setFormData(formRecipe);
        }
    }, [recipes]);

    const handleDelete = () => {
        const deleteRecipeHandler = async () => {
            await deleteRecipe(id);
        }

        deleteRecipeHandler();
        router.push('/my-recipes');
    }

    const toggleEdit = (value) => {
        setIsEditing(value);
    }

    return (
        <div>
            { recipe ? (
                isEditing ? (
                    <div>
                        <form ref={formRef} className={styles.Form} action={formAction}>
                            <FormInput label="Recipe Title" type="text" name={FormField.TITLE} value={formData.title} onChange={handleInputChange} required={true} />
                            <FormArray label="Ingredients" type="text" name={FormField.INGREDIENTS} values={formData.ingredients} onChange={handleInputChange} handleAdd={handleAddField} handleDelete={handleDeleteField} />
                            <FormArray label="Steps" type="text" name={FormField.STEPS} values={formData.steps} onChange={handleInputChange} handleAdd={handleAddField} handleDelete={handleDeleteField} />
                            <FormCheckbox label="Public recipe" name={FormField.IS_PUBLIC} value={formData.is_public} onChange={handleInputChange} />

                            <Buttons></Buttons>
                        </form>
                    </div>
                ) : (
                    <div>
                    <h1 className={styles.Header}>{recipe.title}</h1>

                    <div className={styles.RecipeContainer}>
                        <div className={styles.RecipeSection}>
                            <h4>Ingredients</h4>
                            <ul>
                            {
                                recipe.ingredients?.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient}
                                    </li>
                                ))
                            }
                            </ul>
                        </div>

                        <div className={styles.RecipeSection}>
                            <h4>Steps</h4>
                            <ol>
                            {
                                recipe.steps?.map((step, index) => (
                                    <li key={index}>
                                        {step}
                                    </li>
                                ))
                            }
                            </ol>
                        </div>

                        <h4>Is Public?</h4>
                        <div>{recipe.is_public ? "Yes" : "No"}</div>
                    </div>

                    <Buttons></Buttons>
                    </div>
                )
            ) : <div></div>}
            
        </div>
    )   
}