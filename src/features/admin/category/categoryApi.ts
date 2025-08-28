import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../lib/rtkAxiosBaseQuery'
import type { Category, CategoryCreate } from '../../../types/catalog'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<{ result: Category[] }, void>({
      query: () => ({ url: '/category', method: 'GET' }),
      providesTags: (r) =>
        Array.isArray(r?.result) && r.result.length
          ? [
              ...r.result.map((c) => ({ type: 'Category' as const, id: c.id })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),
    getCategory: builder.query<Category, number>({
      query: (id) => ({ url: `/category/${id}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'Category', id }],
    }),
    createCategory: builder.mutation<Category, CategoryCreate>({
      query: (body) => ({ url: '/category', method: 'POST', data: body }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation<Category, { id: number; body: CategoryCreate }>({
      query: ({ id, body }) => ({ url: `/category/${id}`, method: 'PUT', data: body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Category', id }, { type: 'Category', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({ url: `/category/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Category', id }, { type: 'Category', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
