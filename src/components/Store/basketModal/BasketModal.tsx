import React, { useState } from "react";
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

interface IBasketModal {
  productsBasket: IProduct[];
  basketSum: number;
  addToBasket: any;
  removeCountProduct: any;
  deleteProductFromBasket: any;
}

export const BasketModal: React.FC<IBasketModal> = ({
  productsBasket,
  basketSum,
  addToBasket,
  removeCountProduct,
  deleteProductFromBasket,
}) => {
  const basket = useBasketModal();

  return (
    <div className='modal'>
      <div className='overlay' onClick={basket.toggleBasketModal}>
        <div className='basketModal' onClick={basket.toggleBasketModal}>
          <div className='title'>
            <h3>Basket</h3>
            <span
              className='material-symbols-outlined'
              onClick={basket.toggleBasketModal}
            >
              close
            </span>
          </div>
          <div className='line'></div>

          <div className='productItems'>
            {productsBasket.length
              ? productsBasket.map((product: any) => (
                  <div key={product.id}>
                    <div className='item'>
                      <div>
                        <img src={product.image} />
                      </div>

                      <div className='product_info'>
                        <div className='info_option'>
                          <p className='title'>{product.title}</p>
                          <p className='classification'>
                            {product.classification}
                          </p>
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
                              onClick={() =>
                                deleteProductFromBasket(product.id)
                              }
                            >
                              close
                            </span>
                            {product.count === product.available && (
                              <span>Available 0</span>
                            )}
                          </div>
                        </div>
                        <p>{product.price} $</p>
                      </div>
                    </div>
                    <div className='line'></div>
                  </div>
                ))
              : "Basket is empty"}
          </div>

          <div className='totalPrice'>
            <div>Total price:</div>
            <div>{basketSum} $</div>;
          </div>

          <div className='line'></div>
          <div className='bottom'>
            <span onClick={basket.toggleBasketModal}>Continue Shopping</span>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </div>
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
)(BasketModal);
