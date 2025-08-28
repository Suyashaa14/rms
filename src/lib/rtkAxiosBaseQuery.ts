// src/lib/rtkAxiosBaseQuery.ts
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import axiosInstance from './axios' // <-- your existing axios.ts must default-export the instance

type AXConfig = AxiosRequestConfig & { url: string }

export const axiosBaseQuery =
  ({ baseUrl = '' }: { baseUrl?: string } = {}): BaseQueryFn<AXConfig, unknown, unknown> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance.request({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        withCredentials: true,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      }
    }
  }
