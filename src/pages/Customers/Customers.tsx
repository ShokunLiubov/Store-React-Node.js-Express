import React, { useEffect } from "react";
import styles from "./customers.module.scss";
import cn from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import { getUsers } from "../../redux/userReducer/userThunk";
import { IUser } from "../../shared/interfaces/user.interface";
import { AppStateType } from "../../redux/redux-store";

interface IMyCatalogsProps {
  getUsers: () => void;
  usersData: Array<IUser>;
}

export const Customers: React.FC<IMyCatalogsProps> = ({
  getUsers,
  usersData,
}) => {
  useEffect(() => {
    getUsers();
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
          {usersData.length &&
            usersData.map((customer: any) => (
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

const mapStateToProps = (state: AppStateType) => {
  return {
    usersData: state.user.usersData,
  };
};

export default compose(connect(mapStateToProps, { getUsers }))(Customers);
