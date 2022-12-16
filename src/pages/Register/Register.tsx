import React, { useState } from "react";
import "./Register.scss";
import { useFormik } from "formik";
import { Input } from "../../components/UI/Form/Input/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { registrationUser } from "../../redux/authReducer/authReducer";

interface RegisterProps {
  registrationUser: any;
}

export const Register: React.FC<RegisterProps> = ({ registrationUser }) => {
  const navigate = useNavigate();
  const [showHiddenPassword, setShowHiddenPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      registrationUser(values);
      navigate("/make-up");
    },
  });
  return (
    <div className={"containerLogin"}>
      <form className={"form"} onSubmit={formik.handleSubmit}>
        <img src='./../../imageAuth/bcgAuth.png' />
        <span>register</span>
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
            type={showHiddenPassword ? "text" : "password"}
          />
          <span
            className='material-symbols-outlined'
            onClick={() => setShowHiddenPassword(!showHiddenPassword)}
          >
            {showHiddenPassword ? "visibility" : "visibility_off"}
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

export default compose(connect(mapStateToProps, { registrationUser }))(
  Register,
);
