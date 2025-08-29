import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../lib/rtkAxiosBaseQuery'

export interface MenuItem {
  id: number | string
  title: string
  description?: string
  size?: string
  price?: number
  category_id?: number
  category?: { id: number; name?: string; title?: string } | null
  badge?: string
  image?: string | number
  addons?: Array<{ id: number | string; title?: string; name?: string }>
}

export interface Addon {
  id: number | string
  title: string
  description?: string
  price?: number
}

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Menu', 'Addon'],
  endpoints: (builder) => ({
    getMenus: builder.query<{ items: MenuItem[] }, void>({
      query: () => ({ url: '/menu?page=1&perPage=20', method: 'GET' }),
      transformResponse: (r: any) => ({ items: r?.items ?? r?.result ?? r ?? [] }),
      providesTags: (r) =>
        Array.isArray(r?.items)
          ? [
              ...r.items.map((m) => ({ type: 'Menu' as const, id: m.id })),
              { type: 'Menu', id: 'LIST' },
            ]
          : [{ type: 'Menu', id: 'LIST' }],
    }),
    getMenu: builder.query<MenuItem, number | string>({
      query: (id) => ({ url: `/menu/${id}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'Menu', id }],
    }),
    createMenu: builder.mutation<MenuItem, any>({
      query: (data) => ({
        url: '/menu',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: [{ type: 'Menu', id: 'LIST' }],
    }),
    updateMenu: builder.mutation<MenuItem, { id: number | string; body: any }>({
      query: ({ id, body }) => ({
        url: `/menu/${id}`,
        method: 'PUT',
        data: body,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'Menu', id: arg.id },
        { type: 'Menu', id: 'LIST' },
      ],
    }),
    deleteMenu: builder.mutation<{ success?: boolean }, number | string>({
      query: (id) => ({ url: `/menu/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Menu', id },
        { type: 'Menu', id: 'LIST' },
      ],
    }),

    // Addons (kept simple; adjust endpoints if yours differ)
    getAddons: builder.query<{ items: Addon[] }, void>({
      query: () => ({ url: '/addon', method: 'GET' }),
      transformResponse: (r: any) => ({ items: r?.items ?? r?.result ?? r ?? [] }),
      providesTags: (r) =>
        Array.isArray(r?.items)
          ? [
              ...r.items.map((a) => ({ type: 'Addon' as const, id: a.id })),
              { type: 'Addon', id: 'LIST' },
            ]
          : [{ type: 'Addon', id: 'LIST' }],
    }),
    createAddon: builder.mutation<Addon, Partial<Addon>>({
      query: (data) => ({
        url: '/addon',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: [{ type: 'Addon', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetMenusQuery,
  useGetMenuQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
  useGetAddonsQuery,
  useCreateAddonMutation,
} = menuApi
