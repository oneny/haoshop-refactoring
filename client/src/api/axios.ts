import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { useAppDispatch } from 'hooks';
import { store } from 'store';
import { setCredentials } from 'store/slices/authSlice';

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
      const res = await axiosWithAuth.get<
        void,
        AxiosResponse<{ accessToken: string }>
      >('/refresh');

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
