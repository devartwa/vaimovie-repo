import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import requesterConfig from '../constants/requester';

import {
  RequesterOptionsModel,
  RequesterServiceModel,
  RequesterResponseModel,
} from '../@types';

const requester: any = async (
  service: RequesterServiceModel,
  options: RequesterOptionsModel = {
    data: undefined, // iOS doesnt allow data: {}
    headers: {},
  }
) => {
  const { defaultTimeout, baseUrl, maxRetry } = requesterConfig;
  const { method, endpoint, timeout = defaultTimeout, attempt = 1 } = service;
  const { data, headers } = options;
  const finalHeader = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    ...headers,
  };

  const config: AxiosRequestConfig = {
    method,
    baseURL: baseUrl,
    url: endpoint,
    timeout,
    headers: finalHeader,
    data,
  };

  return axios
    .request(config)
    .then((response: AxiosResponse) => {
      const result: RequesterResponseModel = {
        success: true,
        status: response.status,
        error: null,
        data: response.data || response,
      };
      return result;
    })
    .catch((error: AxiosError) => {
      // Retry attempts
      if (attempt <= maxRetry) {
        const retryService = {
          ...service,
          attempt: attempt + 1,
        };
        return requester(retryService, options);
      }
      const result: RequesterResponseModel = {
        success: false,
        status: error.response?.status,
        error: error.message,
        data: error.response?.data,
      };
      return result;
    });
};

export default requester;
