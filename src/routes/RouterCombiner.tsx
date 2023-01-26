import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { compose } from "redux";
import { Preloader } from "../components/common/Preloader";
import { checkAuth } from "../redux/authReducer/authReducer";
import { IRoutes } from "../shared/interfaces/routes.interface";
import { IUser } from "../shared/interfaces/user.interface";

interface IRouterCombiner {
  routes: Array<IRoutes>;
  auth?: any;
  checkAuth: any;
  isLoading: boolean;
  user: IUser;
}

export const RouterCombiner: React.FC<IRouterCombiner> = ({
  routes,
  checkAuth,
  isLoading,
  user,
  auth /* Its Only Use For Now,I Handle It With ReduxStore */,
}) => {
  // const role = user.roles[0];

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  const RoutesMap = routes.map(({ Private, Layout, Component, path }) => (
    <Route key={path} element={isLoading ? <Preloader /> : <Layout />}>
      <Route key={path} path={path} element={<Component />} />
    </Route>
  ));
  return <Routes>{RoutesMap}</Routes>;
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  };
};

export default compose(connect(mapStateToProps, { checkAuth }))(RouterCombiner);
