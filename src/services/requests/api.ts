import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { config } from "../../config";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import { HttpServerMessageEnum } from "../../shared/enum/httpServerMessage";
import { responseErrorHandler } from "../../shared/handlers/responseError";

export type RequestConfig = AxiosRequestConfig;
export type Response<T> = AxiosResponse<T>;

const { NO_AUTH } = HttpServerMessageEnum;

const api = axios.create({
  baseURL: config.REST_API_URL,
  withCredentials: true,
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { message } = responseErrorHandler(error);

//     if (message === NO_AUTH.message) {
//       console.log('sem login');
//     }

//     return Promise.reject(error);
//   }
// );

/**
 * Service to encapsulate axios in case we want to remove axios later on.
 */
class RestRequestService {
  /**
   * Performs a GET request.
   * @param url - Request url
   * @param config  - Request configs
   */
  public static get<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<Response<T>> {
    return api.get<T, Response<T>>(url, config);
  }

  /**
   * Performs a POST request.
   * @param url - Request url
   * @param config  - Request configs
   */
  public static post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<Response<T>> {
    return api.post<T, Response<T>>(url, data, config);
  }

  /**
   * Performs a PATCH request.
   * @param url - Request url
   * @param config  - Request configs
   */
  public static patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<Response<T>> {
    return api.patch<T, Response<T>>(url, data, config);
  }

  /**
   * Performs a PATCH request.
   * @param url - Request url
   * @param config  - Request configs
   */
  public static put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<Response<T>> {
    return api.put<T, Response<T>>(url, data, config);
  }

  /**
   * Performs a GET request.
   * @param url - Request url
   * @param config  - Request configs
   */
  public static delete<T>(
    url: string,
    config?: RequestConfig
  ): Promise<Response<T>> {
    return api.delete<T, Response<T>>(url, config);
  }
}

export default RestRequestService;
