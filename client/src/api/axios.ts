import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { store } from 'store';
import { setCredentials } from 'store/slices/authSlice';
import { AuthData } from 'types/auth';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosWithAuth = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosWithAuth.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosWithAuth.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const prevRequest = error.config;

    if (error.response?.status === 403) {
      const res = await axiosWithAuth.get<void, AxiosResponse<AuthData>>(
        '/refresh'
      );

      const accessToken = res.data.accessToken;
      store.dispatch(setCredentials({ accessToken }));

      (
        prevRequest as InternalAxiosRequestConfig
      ).headers.Authorization = `Bearer ${accessToken}`;

      return axiosWithAuth(prevRequest as InternalAxiosRequestConfig);
    }

    return Promise.reject(error);
  }
);
