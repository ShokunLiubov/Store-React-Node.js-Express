import React, { useEffect } from "react";
import styles from "./Customers.module.scss";
import cn from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import { getCustomers } from "../../redux/customerReducer/customerReducer";
import { IUserInfo } from "../../shared/interfaces/userInfo.interface";

interface IMyCatalogsProps {
  getCustomers: () => void;
  customersData: Array<IUserInfo>;
}

export const Customers: React.FC<IMyCatalogsProps> = ({
  getCustomers,
  customersData,
}) => {
  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <div className={cn("containerAdminDark")}>
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>City</th>
          </tr>
        </thead>
        <tbody>
          {customersData.length > 0 &&
            customersData.map((customer: any) => (
              <tr key={customer._id}>
                <td>{customer.username}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.city}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    customersData: state.customer.customersData,
  };
};

export default compose(connect(mapStateToProps, { getCustomers }))(Customers);
