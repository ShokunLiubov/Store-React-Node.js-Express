import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import { useBasketModal } from "../../context/basketModalContext";
import { addToBasket } from "../../redux/basketReducer/basketReducer";
import { getProducts } from "../../redux/productReducer/productReducer";
import { IProduct } from "../../shared/interfaces/product.interface";
import styles from "./storeHome.module.scss";

interface IStoreHome {
  productsData: Array<IProduct>;
  getProducts: () => void;
  addToBasket: () => void;
}

export const StoreHome: React.FC<any> = ({
  productsData,
  getProducts,
  addToBasket,
}) => {
  const basket = useBasketModal();
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.productsStore}>
      {productsData.length > 0 &&
        productsData.map((product: any) => (
          <NavLink to={""} key={product._id} className={styles.product}>
            <img src={product.image} />
            <div className={styles.info}>
              <h1>{product.title}</h1>
              <p>{product.price}$</p>
              <div onClick={basket.toggleBasketModal}>
                <button
                  onClick={() => {
                    addToBasket(product._id);
                    return basket.toggleBasketModal;
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </NavLink>
        ))}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    productsData: state.product.productsData,
  };
};

export default compose(connect(mapStateToProps, { getProducts, addToBasket }))(
  StoreHome,
);
