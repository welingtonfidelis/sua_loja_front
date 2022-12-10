import { QueryKey } from "react-query";
import { Product } from "../../../../domains/product";

export interface Props {
  isOpenBlock: boolean;
  onCloseBlock: () => void;

  selectedProduct: Product | null;
  queryKey: QueryKey;
}
