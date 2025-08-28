import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../lib/rtkAxiosBaseQuery'
import type { Addon, AddonCreate, Paginated } from '../../../types/catalog'

export const addonApi = createApi({
  reducerPath: 'addonApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Addon'],
  endpoints: (builder) => ({
    getAddons: builder.query<Paginated<Addon>, { page?: number; perPage?: number } | void>({
      query: (p) => ({ url: '/addon', method: 'GET', params: { page: p?.page || 1, perPage: p?.perPage || 20 } }),
      providesTags: (r) =>
        r && Array.isArray(r.items) && r.items.length > 0
          ? [...r.items.map((a) => ({ type: 'Addon' as const, id: a.id })), { type: 'Addon', id: 'LIST' }]
          : [{ type: 'Addon', id: 'LIST' }],
    }),
    getAddon: builder.query<Addon, number>({
      query: (id) => ({ url: `/addon/${id}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'Addon', id }],
    }),
    createAddon: builder.mutation<Addon, AddonCreate>({
      query: (body) => ({ url: '/addon', method: 'POST', data: body }),
      invalidatesTags: [{ type: 'Addon', id: 'LIST' }],
    }),
    updateAddon: builder.mutation<Addon, { id: number; body: AddonCreate }>({
      query: ({ id, body }) => ({ url: `/addon/${id}`, method: 'PUT', data: body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Addon', id }, { type: 'Addon', id: 'LIST' }],
    }),
    deleteAddon: builder.mutation<void, number>({
      query: (id) => ({ url: `/addon/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Addon', id }, { type: 'Addon', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAddonsQuery,
  useGetAddonQuery,
  useCreateAddonMutation,
  useUpdateAddonMutation,
  useDeleteAddonMutation,
} = addonApi
