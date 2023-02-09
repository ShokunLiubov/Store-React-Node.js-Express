import React, { useState } from "react";
import "./headerStore.scss";
import { compose } from "redux";
import { connect } from "react-redux";
import { useBasketModal } from "../../../context/basketModalContext";
import BasketModal from "../basketModal/BasketModal";
import { AppStateType } from "../../../redux/redux-store";

interface IBasket {}

export const Basket: React.FC<IBasket> = ({}) => {
  const basket = useBasketModal();

  return (
    <>
      {basket.basketModal && <BasketModal />}
      <div className='basket' onClick={basket.toggleBasketModal}>
        <span className='material-symbols-outlined'>shopping_bag</span>
      </div>
    </>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {};
};

export default compose(connect(mapStateToProps, {}))(Basket);
