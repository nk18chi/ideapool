import React, { createContext, useEffect, useState } from "react";
import { TProduct, TProductsContext } from "../model/product.model";
import { products } from "../data/products";
import { getList } from "../api/productHunt";

const initProductsContext = { items: products, loading: true };
export const ProductsContext = createContext<TProductsContext>(initProductsContext);

const ProductsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productsContext, setProductsContext] = useState<TProductsContext>(initProductsContext);

  useEffect(() => {
    getList()
      .then((res) => {
        const newItem: TProduct[] = [];
        for (const item of res.data.posts.edges) {
          newItem.push(item.node);
        }
        setProductsContext({
          items: products.concat(newItem),
          loading: false,
        });
      })
      .catch(() => {
        setProductsContext((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  return <ProductsContext.Provider value={productsContext}>{children}</ProductsContext.Provider>;
};
export default ProductsContextProvider;
