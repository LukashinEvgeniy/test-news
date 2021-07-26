export const api= process.env.REACT_APP_API_URL;


export const routes = {
    main: '/',
    auth: '/auth',
    news: '/news'
}

// Ключ в хранилище для кеширования данных
export const persistStorageKey = 'root';

export const cookieName = 'auth_news';

export const apiService = {
    auth: `${api}/Auth`,
  };
