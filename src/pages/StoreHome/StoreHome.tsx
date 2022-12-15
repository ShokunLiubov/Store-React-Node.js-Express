import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import { getProducts } from "../../redux/productReducer/productReducer";
import { IProduct } from "../../shared/interfaces/product.interface";
import styles from "./StoreHome.module.scss";

interface IStoreHome {
  productsData: Array<IProduct>;
  getProducts: () => void;
}

export const StoreHome: React.FC<any> = ({ productsData, getProducts }) => {
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
              <button>Buy</button>
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

export default compose(connect(mapStateToProps, { getProducts }))(StoreHome);
