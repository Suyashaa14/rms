import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../lib/rtkAxiosBaseQuery'
import type { Category } from '../../../types/catalog'

type CategoryPayload = {
  name: string
  description?: string
  image: number | string
  status?: 'active' | 'inactive'
}

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

    getCategory: builder.query<Category, number | string>({
      query: (id) => ({ url: `/category/${id}`, method: 'GET' }),
      providesTags: (_r, _e, id) => [{ type: 'Category', id }],
    }),

    // POST /api/category
    createCategory: builder.mutation<Category, CategoryPayload>({
      query: (data) => ({
        url: '/category',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    // PUT /api/category/:id  (same body as create)
    updateCategory: builder.mutation<
      Category,
      { id: number | string; data: CategoryPayload }
    >({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: 'PUT',
        data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'Category', id: arg.id },
        { type: 'Category', id: 'LIST' },
      ],
    }),

    // DELETE /api/category/:id  (no payload, no query params)
    deleteCategory: builder.mutation<{ success?: boolean }, number | string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
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
