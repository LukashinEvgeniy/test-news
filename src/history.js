import { createBrowserHistory as createHistory } from 'history';

import { routes } from './config/constants';

const history = createHistory();

// При перезагруке страницы (при первом рендере app), в history.location будет свойство firstPage.
// При переходе на другой route, это свойство пропадет.
history.replace({ search: window.location.search, firstPage: true });

// Если в history.location есть firstPage, то делаем reidrect на главную страницу
// Если firstPage нет, то используем изначальный метод history.goBack
export const goBack = () => {
  if (history.location.firstPage) {
    history.push(routes.main);
  } else {
    history.goBack();
  }
};

export default history;
