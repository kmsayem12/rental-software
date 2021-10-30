import React, { createContext, useEffect, useReducer } from "react";
import { getDataInlocalStorage, setDataInlocalStorage } from "../lib";
import Products from "../Products/Products.json";

export const ProductContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "update":
      const oldState = [...state];
      const newProduct = action.payload;
      const findIndex = state.findIndex((item) => item.key === newProduct?.key);
      oldState[findIndex] = newProduct;
      return oldState;
    case "set":
      return action.payload;
    default:
      throw new Error();
  }
}

const ProductContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.length > 0) {
      setDataInlocalStorage(state);
    }
  }, [state]);

  useEffect(() => {
    const getStorageData = getDataInlocalStorage();
    if (getStorageData.length > 0) {
      dispatch({ type: "set", payload: getStorageData });
    } else {
      // set state only  when project initiation
      dispatch({ type: "set", payload: Products });
    }
  }, []);

  return (
    <ProductContext.Provider value={[state, dispatch]}>
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
