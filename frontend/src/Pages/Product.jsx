import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import RelatedProducts from "../Components/RelatedProducts.jsx/RelatedProducts";
import { ShopContext } from "../Context/ShopContext";

export const Product = () => {
  const location = useLocation();
  console.log("Product.jsx ", location);
  const product = location.state.product;

  return (
    <div>
      <Breadcrum product={product} />
      {/* Render other product details */}
      <ProductDisplay product={product} />
      {/* <RelatedProducts /> */}
    </div>
  );
};

export default Product;
