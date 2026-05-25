import ProductPage from "./ProductPage";
import { getProductById } from "../data/products";

const coachProduct = getProductById("coach");

export default function Coach() {
  return <ProductPage product={coachProduct} />;
}
