import React, { useContext, useState } from "react";

interface IBasketProvider {
  children: any;
}
interface IBasket {
  basketModal?: boolean;
  toggleBasketModal?(e: React.MouseEvent<HTMLSpanElement>): void;
}

const basketModalContext = React.createContext<IBasket>({});

export const useBasketModal = () => {
  return useContext(basketModalContext);
};

export const BasketModalProvider: React.FC<IBasketProvider> = ({
  children,
}) => {
  const [basketModal, setBasketModal] = useState(false);

  const toggleBasketModal = (e: React.MouseEvent<HTMLSpanElement>) => {
    setBasketModal((prev) => !prev);
  };
  return (
    <basketModalContext.Provider value={{ basketModal, toggleBasketModal }}>
      {children}
    </basketModalContext.Provider>
  );
};
