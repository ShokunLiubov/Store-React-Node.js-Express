import React from "react";
import "./headerStore.scss";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { IUser } from "../../../shared/interfaces/user.interface";
import { logout } from "../../../redux/authReducer/authReducer";

interface IUserAuth {
  user: IUser;
  isAuth: boolean;
  logout: any;
}

export const UserAuth: React.FC<IUserAuth> = ({ user, isAuth, logout }) => {
  return (
    <div className='userAuth'>
      {!isAuth && (
        <NavLink to='auth/login'>
          <span className='material-symbols-outlined'>person</span>
          Log in
        </NavLink>
      )}
      {isAuth && (
        <div className='authBlock'>
          <span>{user.username}</span>
          <span
            className='userOut'
            onClick={() => {
              logout();
            }}
          >
            <span className='material-symbols-outlined'>logout</span>
            Logout
          </span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
    isAuth: state.auth.isAuth,
  };
};

export default compose(connect(mapStateToProps, { logout }))(UserAuth);
