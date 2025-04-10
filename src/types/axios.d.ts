declare module 'axios' {
  import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
  const axios: AxiosInstance;
  export default axios;
  export { AxiosRequestConfig, AxiosResponse };
} 