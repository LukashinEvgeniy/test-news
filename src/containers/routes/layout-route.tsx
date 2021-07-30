import { Route, RouteProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/types/state";
import { getNewsCategoires, isAuthorizedSelector } from "../../redux/selectors";
import Navigate from "../../components/navbar";
import { logout } from "../../redux/thunks/auth";

const Layout = (props: RouteProps) => {
  const { isAuthorized, newsCategory } = useSelector((state: AppState) => ({
    isAuthorized: isAuthorizedSelector(state),
    newsCategory: getNewsCategoires(state),
  }));
  const dispatch = useDispatch();
  return (
    <>
      <Navigate
        isAuth={isAuthorized}
        newsCategory={newsCategory}
        logout={async () => {
          await dispatch(logout);
        }}
      />
      <Route {...props} />
    </>
  );
};

export default Layout;
