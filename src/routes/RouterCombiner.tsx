import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { compose } from "redux";
import { checkAuth } from "../redux/authReducer/authReducer";
import { IRoutes } from "../shared/interfaces/routes.interface";

interface IRouterCombiner {
  PrivateRoute: any;
  routes: Array<IRoutes>;
  auth?: any;
  checkAuth: any;
  isLoading: boolean;
}

export const RouterCombiner: React.FC<IRouterCombiner> = ({
  PrivateRoute,
  routes,
  checkAuth,
  isLoading,
  auth /* Its Only Use For Now,I Handle It With ReduxStore */,
}) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  const RoutesMap = routes.map(({ Private, Layout, Component, path }) => (
    <Route
      key={path}
      element={
        isLoading ? <h6 className='preloader'>Loading...</h6> : <Layout />
      }
    >
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
