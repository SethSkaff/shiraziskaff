import ProductPage from "./ProductPage";
import { getProductById } from "../data/products";

const product = getProductById("airmix");

export default function AirMix() {
  return <ProductPage product={product} />;
}
