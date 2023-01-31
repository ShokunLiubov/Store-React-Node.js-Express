import React, { useEffect } from "react";
import styles from "./customers.module.scss";
import cn from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import { getCustomers } from "../../redux/customerReducer/customerReducer";
import { IUser } from "../../shared/interfaces/user.interface";

interface IMyCatalogsProps {
  getCustomers: () => void;
  customersData: Array<IUser>;
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
                {/* {console.log(customer.userInfo.phone)} */}
                <td>
                  {customer.userInfo === undefined
                    ? "unknown"
                    : customer.userInfo.email}
                </td>
                <td>
                  {customer.userInfo === undefined
                    ? "unknown"
                    : customer.userInfo.phone}
                </td>
                <td>
                  {customer.userInfo === undefined
                    ? "unknown"
                    : customer.userInfo.city}
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
    customersData: state.customer.customersData,
  };
};

export default compose(connect(mapStateToProps, { getCustomers }))(Customers);
