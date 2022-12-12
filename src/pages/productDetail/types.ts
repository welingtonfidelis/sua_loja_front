export interface FormProps {
    name: string;
    description: string;
    price: number;
    quantity: number;
    is_active: boolean;
    category_id: number;
    variation_1: string[];
    variation_2: string[];
}