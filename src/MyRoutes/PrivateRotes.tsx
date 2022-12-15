import React from "react";
import { Route, Routes } from "react-router-dom";

const PrivateRoute = (props: any) => {
  return (
    <Routes>
      <Route
        //   render={({ location }) =>
        //     props.auth ? (
        //       <props.component />
        //     ) : (
        //       <Redirect to={{ pathname: "/login", state: { from: location } }} />
        //     )
        //   }
        path={"/"}
        element={<props.component />}
      />
    </Routes>
  );
};
export default PrivateRoute;
