import { useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import { AppState } from '../../redux/types/state';
import { isAuthorizedSelector } from '../../redux/selectors';
import { redirectToLogin } from '../../lib/utils';
import Layout from './layout-route';


const ProtectedRoute = (props: RouteProps) => {
  const { isAuthorized } = useSelector((state: AppState) => ({
    isAuthorized: isAuthorizedSelector(state),
  }));

  useEffect(() => {
    const { logout } = queryString.parse(window.location.search);
    // logout нужен для фиксации процесса выхода из профия.
    // Если его не использовать, то возникается ситуация с редиректом на страницу логинки
    if (!isAuthorized && logout !== 'true') {
     // Здесь используем replace, чтобы решить проблему перехода по кнопке "Назад" на странице логина.
      redirectToLogin({
        redirectUrl: window.location.pathname,
        replace: true,
      });
    }
    
  }, [isAuthorized]);
  
  return isAuthorized ? <Layout {...props} /> : null;
};

export default ProtectedRoute;
