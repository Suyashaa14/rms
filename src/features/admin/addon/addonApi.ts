import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../lib/rtkAxiosBaseQuery'

export interface Addon {
  id: number | string
  title: string
  description?: string
  price?: number
  status?: 'active' | 'inactive'
}

export const addonApi = createApi({
  reducerPath: 'addonApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Addon'],
  endpoints: (builder) => ({
    // GET /addon  → unify to { items: Addon[] }
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

    // POST /addon  → returns created Addon
    createAddon: builder.mutation<Addon, Partial<Addon>>({
      query: (data) => ({
        url: '/addon',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'application/json' },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: created } = await queryFulfilled
          // Update the cached list so the checkbox list refreshes instantly
          dispatch(
            addonApi.util.updateQueryData('getAddons', undefined, (draft) => {
              if (!draft?.items) draft.items = []
              // avoid duplicates if server echoes existing id
              if (!draft.items.find((a) => String(a.id) === String(created.id))) {
                draft.items.unshift(created)
              }
            })
          )
        } catch {
          // ignore — UI will show error from mutation if needed
        }
      },
      invalidatesTags: [{ type: 'Addon', id: 'LIST' }],
    }),
  }),
})

export const { useGetAddonsQuery, useCreateAddonMutation } = addonApi
