export interface Recipe {
    id: string;
    title: string;
    ingredients: string[];
    steps: string[];
    is_public: boolean;
}

export enum FormField {
    TITLE = "title",
    INGREDIENTS = "ingredients",
    STEPS = "steps",
    IS_PUBLIC = "is_public"
}

export interface ArrayField {
    id: number;
    value: string;
}

export const ARRAY_FIELDS = [FormField.INGREDIENTS, FormField.STEPS]

export interface RecipeForm {
    [FormField.TITLE]: string;
    [FormField.INGREDIENTS]: ArrayField[];
    [FormField.STEPS]: ArrayField[];
    [FormField.IS_PUBLIC]: boolean;
}