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
        headers: { /* Let Axios set multipart boundary automatically */ },
      }),
    }),
  }),
})

export const { useCreateMediaMutation } = mediaApi
