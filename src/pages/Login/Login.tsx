import React, { useState } from "react";
import "./login.scss";
import { useFormik } from "formik";
import { Input } from "../../components/ui/form/input/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer/authReducer";

interface LoginProps {
  login: any;
}

export const Login: React.FC<LoginProps> = ({ login }) => {
  const navigate = useNavigate();
  const [isShownPassword, setIsShownPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values);
      navigate("/make-up");
    },
  });
  return (
    <div className={"containerLogin"}>
      <form className={"form"} onSubmit={formik.handleSubmit}>
        <img src='./../../imageAuth/bcgAuth.png' />
        <span>log in</span>
        <div className='blockInput'>
          <span className='material-symbols-outlined'>mail</span>
          <Input
            label={"Login"}
            name={"username"}
            placeholder={"Login"}
            formik={formik}
          />
        </div>

        <div className='blockInput'>
          <span className='material-symbols-outlined'>lock</span>
          <Input
            label={"Password"}
            name={"password"}
            placeholder={"Password"}
            formik={formik}
            type={isShownPassword ? "text" : "password"}
          />
          <span
            className='material-symbols-outlined'
            onClick={() => setIsShownPassword(!isShownPassword)}
          >
            {isShownPassword ? "visibility" : "visibility_off"}
          </span>
        </div>

        <button type='submit'>Get Started</button>
      </form>
      <div className='bottomLink'>
        <NavLink to=''>Create Account</NavLink>
        <NavLink to=''>Need help</NavLink>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

export default compose(connect(mapStateToProps, { login }))(Login);
