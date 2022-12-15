import React, { useEffect, useState } from "react";
import styles from "./MyCatalogs.module.scss";
import cn from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  getProducts,
  deleteProduct,
} from "../../redux/productReducer/productReducer";
import { IProduct } from "../../shared/interfaces/product.interface";
import { NavLink } from "react-router-dom";

interface IMyCatalogsProps {
  getProducts: () => void;
  productsData: Array<IProduct>;
  deleteProduct: any;
}

export const MyCatalogs: React.FC<IMyCatalogsProps> = ({
  getProducts,
  productsData,
  deleteProduct,
}) => {
  const [reloadProducts, setReloadProducts] = useState(false);

  useEffect(() => {
    getProducts();
  }, [reloadProducts]);

  const handleDeleteProduct = (productId: number) => {
    deleteProduct(productId);
    setReloadProducts(!reloadProducts);
  };
  return (
    <div className={cn("containerAdminWhite", styles.catalogs)}>
      <table className={styles.catalogTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th className={styles.thSmall}>Category</th>
            <th className={styles.thSmall}>Count</th>
            <th className={styles.thSmall}>Price</th>
            <th className={styles.thSmall}>Edit</th>
            <th className={styles.thSmall}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {productsData.length > 0 &&
            productsData.map((product: any) => (
              <tr key={product._id} className={styles.cardProduct}>
                <td>
                  <img
                    src={
                      product.image
                        ? product.image
                        : "./../../image_product/112cd464-94fd-4fbe-9200-5e7e83fe4c69_640x490_fit.jpeg"
                    }
                  />
                </td>
                <td>
                  <div className={styles.titleProduct}>
                    <h2>{product.title}</h2>
                  </div>
                </td>
                <td>
                  <div className={styles.titleCategory}>
                    <h1>{product.category}</h1>
                  </div>
                </td>
                <td className={cn("numberDark")}>{product.count}</td>
                <td className={cn("numberDark")}>{product.price}$</td>
                <td>
                  <NavLink
                    to={"/edit-product"}
                    className={cn("material-symbols-outlined", styles.editIcon)}
                  >
                    edit_square
                  </NavLink>
                </td>
                <td>
                  <span
                    className={cn(
                      "material-symbols-outlined",
                      styles.deleteIcon,
                    )}
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    productsData: state.product.productsData,
  };
};

export default compose(
  connect(mapStateToProps, { getProducts, deleteProduct }),
)(MyCatalogs);
