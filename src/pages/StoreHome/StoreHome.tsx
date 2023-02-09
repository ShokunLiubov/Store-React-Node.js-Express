import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import { MenuStore } from "../../components/store/menuStore/MenuStore";
import { useBasketModal } from "../../context/basketModalContext";
import { addToBasket } from "../../redux/basketReducer/basketThunk";
import { getProducts } from "../../redux/productReducer/productThunk";
import { AppStateType } from "../../redux/redux-store";
import { getUserInfo } from "../../redux/userReducer/userThunk";
import { IProduct } from "../../shared/interfaces/product.interface";
import styles from "./storeHome.module.scss";

interface IStoreHome {
  productsData: Array<IProduct>;
  getProducts: () => void;
  addToBasket: () => void;
  getUserInfo: () => void;
}

export const StoreHome: React.FC<any> = ({
  productsData,
  getProducts,
  addToBasket,
  getUserInfo,
}) => {
  const basket = useBasketModal();
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <MenuStore />
      <div className={styles.carousel}>
        <img src='./../../shopImg/bcgimg.jpeg' />
      </div>

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
                      getUserInfo();
                    }}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </NavLink>
          ))}
      </div>
    </>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    productsData: state.product.productsData,
  };
};

export default compose(
  connect(mapStateToProps, { getProducts, addToBasket, getUserInfo }),
)(StoreHome);
