import React from "react";
import cn from "classnames";

interface NotfoundProps {
  styleAdmin?: string;
}

export const Notfound: React.FC<NotfoundProps> = ({ styleAdmin }) => {
  return (
    <span className={cn("center", "notFound", styleAdmin)}>Not Found 404</span>
  );
};
