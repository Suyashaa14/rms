import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../lib/rtkAxiosBaseQuery'

export const mediaApi = createApi({
  reducerPath: 'mediaApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createMedia: builder.mutation<{ id: number }, FormData>({
      query: (form) => ({
        url: '/media',
        method: 'POST',
        data: form,
        // Important: override default JSON header so multipart body is sent correctly
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    }),
  }),
})

export const { useCreateMediaMutation } = mediaApi
