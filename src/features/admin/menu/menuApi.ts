import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../lib/rtkAxiosBaseQuery'
import type { MenuItem, MenuCreate, Paginated } from '../../../types/catalog'

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Menu'],
  endpoints: (builder) => ({
    getMenus: builder.query<Paginated<MenuItem>, { page?: number; perPage?: number } | void>({
      query: (p) => ({ url: '/menu', method: 'GET', params: { page: p?.page || 1, perPage: p?.perPage || 20 } }),
      providesTags: (r) =>
        r && Array.isArray(r.items) && r.items.length
          ? [...r.items.map((m) => ({ type: 'Menu' as const, id: m.id })), { type: 'Menu', id: 'LIST' }]
          : [{ type: 'Menu', id: 'LIST' }],
    }),
    getMenu: builder.query<MenuItem, number>({
      query: (id) => ({ url: `/menu/${id}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'Menu', id }],
    }),
    createMenu: builder.mutation<MenuItem, MenuCreate>({
      query: (body) => ({ url: '/menu', method: 'POST', data: body }),
      invalidatesTags: [{ type: 'Menu', id: 'LIST' }],
    }),
    updateMenu: builder.mutation<MenuItem, { id: number; body: MenuCreate }>({
      query: ({ id, body }) => ({ url: `/menu/${id}`, method: 'PUT', data: body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Menu', id }, { type: 'Menu', id: 'LIST' }],
    }),
    deleteMenu: builder.mutation<void, number>({
      query: (id) => ({ url: `/menu/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Menu', id }, { type: 'Menu', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetMenusQuery,
  useGetMenuQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi
