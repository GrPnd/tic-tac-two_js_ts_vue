import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { useUserDataStore } from '@/stores/userDataStore';
import router from '@/router';

export abstract class BaseService {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:5207/api/v1/',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });


    this.axiosInstance.interceptors.request.use(
      config => {
        const store = useUserDataStore();
        if (store.jwt) {
          config.headers.Authorization = `Bearer ${store.jwt}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // 401 vastuse korral proovime refreshida tokenit
    this.axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        const store = useUserDataStore();

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await this.axiosInstance.post('account/renewRefreshToken?jwtExpiresInSeconds=5', {
              jwt: store.jwt,
              refreshToken: store.refreshToken,
            });

            if (response.status <= 300) {
              store.jwt = response.data.jwt;
              store.refreshToken = response.data.refreshToken;
              originalRequest.headers.Authorization = `Bearer ${response.data.jwt}`;

              return this.axiosInstance(originalRequest);
            }

            return Promise.reject(response);
          } catch (e) {
            store.jwt = '';
            store.refreshToken = '';
            router.push({ name: 'Login' });
            return Promise.reject(e);
          }
        }

        return Promise.reject(error);
      }
    );
  }
}
