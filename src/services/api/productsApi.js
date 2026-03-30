import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    getSimpleProducts: builder.query({
      query: () => "/products/simple",
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),

    searchProducts: builder.query({
      query: (params) => {
        const query = new URLSearchParams();
        if (params.category) query.append("category", params.category);
        if (params.materials) query.append("materials", params.materials);
        if (params.sizes) query.append("sizes", params.sizes);
        if (params.colors) query.append("colors", params.colors);
        if (params.maxPrice) query.append("maxPrice", params.maxPrice);
        if (params.sort) query.append("sort", params.sort);
        if (params.search) query.append("search", params.search);
        query.append("page", params.page || 1);
        query.append("limit", params.limit || 15);

        return `/products/search?${query.toString()}`;
      },
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    getFeaturedProducts: builder.query({
      query: () => "/products/featured",
    }),

    // New endpoint to get filter facets
    getFacets: builder.query({
      query: () => "/products/facets",
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,

  useGetSimpleProductsQuery,
  useLazyGetSimpleProductsQuery,

  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,

  useSearchProductsQuery,
  useLazySearchProductsQuery,

  useGetFeaturedProductsQuery,
  useLazyGetFeaturedProductsQuery,

  useCreateProductMutation,

  useGetFacetsQuery, 
  useLazyGetFacetsQuery,
} = productsApi;
