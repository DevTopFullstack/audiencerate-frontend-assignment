import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Segment {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'inactive' | 'archived';
  audienceSize: number;
  matchRate: number;
  dataSourceIds: string[];
  tags :string[];
  createdBy: string;
  createdAt:string;
  updatedAt:string;
}
export interface SegmentsResponse {
  data: Segment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface SegmentsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
export interface CreateSegmentRequest {
  name: string;
  description: string;
  status: string;
  audienceSize: number;
  matchRate: number;
  // Optional??
  dataSourceIds?: string[];
  tags?: string[];
  createdBy?: string;
}
export const apiSlice = createApi({
  reducerPath: 'api',           
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000',  
    // prepareHeaders: (headers) => {
    //   headers.set('Authorization', `Bearer ${token}`);
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getOverView: builder.query<{ [key: string]: any }, void>({
      query: () => '/api/overview',
    }),

    //  getSegmments: builder.query<{ [key: string]: any }, void>({
    //   query: () => '/api/segments',
    // }),
 getSegments: builder.query<SegmentsResponse, SegmentsParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.status) queryParams.append('status', params.status);
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
        
        return `/api/segments?${queryParams.toString()}`;
      },
    }),
  
    getSegmentById: builder.query({
      query: (id: string | number) => `/api/segments/${id}`,
    }),

    getSegmentTrend: builder.query({
      query: (id: string | number) => `/api/segments/${id}/trend`,
    }),

    getSegmentActivations: builder.query({
      query: (id: string | number) => `/api/segments/${id}/activations`,
    }),

    createSegment: builder.mutation<Segment, CreateSegmentRequest>({
      query: (newSegment) => ({
        url: '/api/segments',
        method: 'POST',
        body: newSegment,
      }),
    }),

 
  }),
});

// Export hooks for usage in components
export const { 
  useGetOverViewQuery, 
  useGetSegmentsQuery,
    useGetSegmentByIdQuery,   
  useGetSegmentTrendQuery,       
  useGetSegmentActivationsQuery,
  useCreateSegmentMutation
} = apiSlice;


