import { type FetchOptions, ofetch } from 'ofetch';
import qs from 'qs';

export interface dataCarrier<T> {
  data: T;
  code: number;
  message: string;
  success: boolean;
}

export const fetcher = async <T>(
  url: RequestInfo,
  method = 'GET',
  body?: Record<any, any>,
  options?: FetchOptions<'json'>,
): Promise<T> => {
  const res = await ofetch<dataCarrier<T>>(url, {
    method,
    body,
    timeout: 10000,
    onResponseError({ response }) {
      if (response.status === 401) {
        throw new Error('认证失败');
      }
      if (response.status === 403) {
        throw new Error('无权限');
      }
      if (response.status >= 500 && response.status < 600) {
        throw new Error('服务器出错了，请稍后重试');
      }
      throw new Error('网络错误');
    },
    ...options,
    headers: {
      ...options?.headers,
    },
  });

  const { success, message, data } = res;
  if (!success) {
    throw new Error(message || '未知错误');
  }

  return data;
};

export const get = async <T = any>(
  url: RequestInfo,
  params?: Record<string, any>,
  options?: FetchOptions<'json'>,
) => {
  const query = qs.stringify(params, {
    arrayFormat: 'comma',
    skipNulls: true,
    addQueryPrefix: true,
    encode: true,
  });
  return await fetcher<T>(`${url}${query}`, 'GET', undefined, options);
};

export const post = async <T = any>(
  url: RequestInfo,
  body: Record<any, any> = {},
  options?: FetchOptions<'json'>,
) => {
  return await fetcher<T>(url, 'POST', body, options);
};

export const del = async <T = any>(
  url: RequestInfo,
  options?: FetchOptions<'json'>,
) => {
  return await fetcher<T>(url, 'DELETE', undefined, options);
};

export const put = async <T = any>(
  url: RequestInfo,
  body: Record<any, any> = {},
  options?: FetchOptions<'json'>,
) => {
  return await fetcher<T>(url, 'PUT', body, options);
};
