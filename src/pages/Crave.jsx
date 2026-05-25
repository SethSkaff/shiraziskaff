import ProductPage from "./ProductPage";
import { getProductById } from "../data/products";

const product = getProductById("crave");

export default function Crave() {
  return <ProductPage product={product} />;
}
