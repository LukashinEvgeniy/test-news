// Модель для авторизации пользователя (из ESZ.Authorization.DTO)
export type LoginData = {
  login: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export const initialLoginData: LoginData = {
  login: '',
  password: '',
};