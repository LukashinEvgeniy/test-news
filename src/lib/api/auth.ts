import { fetchRequest } from './index';
import { apiService } from '../../config/constants';
import { LoginData, LoginResponse } from '../../types/auth';


export const signIn = async (data: LoginData): Promise<LoginResponse> => {
  // const response = await fetchRequest.post(`${apiService.auth}/login`, data, {
  //   isProtected: false,
  // });
  //return response;

  return {token: '1111111'}
};

export const logout = async (id: number) => {
  await fetchRequest.post(
    `${apiService.auth}/logout`,
    { userId: id },
    {
      isProtected: true,
    }
  );
};


const auth = {
  signIn,
  logout
};

export default auth;
