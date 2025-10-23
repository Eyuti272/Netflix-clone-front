

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductUrl } from "../../Api/EndPoint";
import ProductCards from "../../components/Product/ProductCards";
import Loder from "../../components/Loder/Loder";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${ProductUrl}/products/${productId}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return <Loder />;
  }

  if (!product) {
    return <p>No product found</p>;
  }

  return <ProductCards product={product} flex={true} renderDesc={true} 
  renderAdd={true}
  
  />;
};

export default ProductDetail;
