import React from "react";
import cn from "classnames";

export const Preloader: React.FC = () => {
  return (
    <div className={cn("center")}>
      <img src='./../../preloader.gif' />
    </div>
  );
};
