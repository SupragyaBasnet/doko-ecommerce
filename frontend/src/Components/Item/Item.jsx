import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

export const Item = (props) => {
  const navigate = useNavigate();

  const showProductDetail = () => {
    navigate(`/product/${props.id}`, {
      state: { product: props.product },
    });
  };

  console.log("Item", props.product);
  return (
    <div className="item my-3" onClick={showProductDetail}>
      <Image
        // onClick={window.scrollTo(0, 0)}
        src={props.image}
        alt=""
        fluid
        rounded
        style={{ width: "100%", height: "auto" }} // Ensure consistent image dimensions
      ></Image>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new"> ${props.new_price}</div>
        <div className="item-price-old">{props.old_price}</div>
      </div>
    </div>
  );
};
export default Item;
