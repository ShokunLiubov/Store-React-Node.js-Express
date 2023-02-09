import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { compose } from "redux";
import ProductItem from "../../components/store/basketModal/productItem";
import { createOrder } from "../../redux/orderReducer/orderReducer";
import { getUserInfo } from "../../redux/userReducer/userReducer";
import "./createOrder.scss";
import FormUserInfo from "./formUserInfo";

interface ICreateOrder {
  basketSum: number;
  getUserInfo: () => void;
  createOrder: (togetherPrice: number) => void;
}

export const CreateOrder: React.FC<ICreateOrder> = ({
  basketSum,
  getUserInfo,
  createOrder,
}) => {
  useEffect(() => {
    getUserInfo();
  }, []);

  const navigate = useNavigate();

  const delivery = 49;
  const togetherPrice = delivery + basketSum;

  return (
    <div>
      <div className='blockCreateOrder'>
        <FormUserInfo />

        <div className='order'>
          <h5>Your order :</h5>
          <div className='productItems'>
            <ProductItem />
          </div>
          <div className='line'></div>
          <div className='totalPrice'>
            <div>
              <div>Total price:</div>
              <div>Delivery:</div>
              <div>Together:</div>
            </div>

            <div>
              <div>{basketSum} $</div>
              <div>{delivery} $</div>
              <div>{togetherPrice} $</div>
            </div>
          </div>
          <div className='checkout' onClick={() => navigate("/make-up")}>
            <button onClick={() => createOrder(togetherPrice)}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    basketSum: state.basket.basketSum,
  };
};

export default compose(connect(mapStateToProps, { getUserInfo, createOrder }))(
  CreateOrder,
);
