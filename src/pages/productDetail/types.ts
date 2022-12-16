import { Omit } from "lodash";
import { ProductVariation } from "../../domains/productVariation";

export interface FormProps {
    name: string;
    description: string;
    price: number;
    quantity: number;
    is_active: boolean;
    category_id: number;
    variation: ProductVariation[];
}