import React from "react";
import "./basketModal.scss";
import { compose } from "redux";
import { connect } from "react-redux";
import { useBasketModal } from "../../../context/basketModalContext";
import { IProduct } from "../../../shared/interfaces/product.interface";
import {
  addToBasket,
  removeCountProduct,
  deleteProductFromBasket,
} from "../../../redux/basketReducer/basketReducer";

interface IProductItem {
  productsBasket: IProduct[];
  basketSum: number;
  addToBasket: (productId: string) => void;
  removeCountProduct: (productId: string) => void;
  deleteProductFromBasket: (productId: string) => void;
}

export const ProductItem: React.FC<IProductItem> = ({
  productsBasket,
  basketSum,
  addToBasket,
  removeCountProduct,
  deleteProductFromBasket,
}) => {
  const basket = useBasketModal();

  return (
    <>
      {productsBasket.length &&
        productsBasket.map((product: any) => (
          <div key={product.id}>
            <div className='item'>
              <div className='productImg'>
                <img src={product.image} />
              </div>

              <div className='product_info'>
                <div className='info_option'>
                  <p className='title'>{product.title}</p>
                  <p className='classification'>{product.classification}</p>
                  <div className='counter'>
                    <span
                      className='material-symbols-outlined'
                      onClick={() => removeCountProduct(product.id)}
                    >
                      remove
                    </span>
                    <p className='count'>{product.count}</p>
                    <span
                      className='material-symbols-outlined'
                      onClick={() => addToBasket(product.id)}
                    >
                      add
                    </span>
                    <span
                      className='material-symbols-outlined'
                      onClick={() => deleteProductFromBasket(product.id)}
                    >
                      close
                    </span>
                  </div>
                </div>
                <p className='productPrice'>{product.price} $</p>
              </div>
            </div>
            <div className='line'></div>
          </div>
        ))}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    productsBasket: state.basket.productsBasket,
    basketSum: state.basket.basketSum,
  };
};

export default compose(
  connect(mapStateToProps, {
    addToBasket,
    removeCountProduct,
    deleteProductFromBasket,
  }),
)(ProductItem);
