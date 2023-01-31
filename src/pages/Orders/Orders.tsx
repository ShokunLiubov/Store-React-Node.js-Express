import React, { useEffect } from "react";
import styles from "./orders.module.scss";
import cn from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import { getOrders } from "../../redux/ordersReducer/ordersReducer";
import { IOrder } from "../../shared/interfaces/order.interface";

interface IOrdersProps {
  getOrders: () => void;
  ordersData: Array<IOrder>;
}

export const Orders: React.FC<IOrdersProps> = ({ ordersData, getOrders }) => {
  useEffect(() => {
    getOrders();
  }, []);

  console.log(ordersData);

  return (
    <div className={cn("containerAdminDark")}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope='col'>Order Number</th>
            <th scope='col'>Client Name</th>
            <th scope='col'>City</th>
            <th scope='col'>All Price</th>
            <th scope='col' className={styles.statusTh}>
              Status Order
            </th>
          </tr>
        </thead>
        <tbody>
          {ordersData.length > 0 &&
            ordersData.map((order: any) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client_name}</td>
                <td>{order.city}</td>
                <td>{order.order_price}$</td>
                <td>
                  <div
                    className={cn(
                      order.status_order === "Availability is check"
                        ? styles.count
                        : styles.statusNot,
                      order.status_order === "Availability is check"
                        ? styles.count
                        : "",
                      order.status_order === "Awaiting shipment"
                        ? styles.await
                        : "",
                      order.status_order === "Sent" ? styles.sent : "",
                      order.status_order === "Refusal" ? styles.refusal : "",
                      order.status_order === "Received" ? styles.received : "",
                      styles.status,
                    )}
                  >
                    {order.status_order}
                  </div>
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
    ordersData: state.orders.ordersData,
  };
};

export default compose(connect(mapStateToProps, { getOrders }))(Orders);
