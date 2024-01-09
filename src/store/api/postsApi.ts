import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const MAIN_URL = 'http://localhost:8000';

interface IPostsResponse {
    id: string, 
    title: string, 
    author: string, 
    userId: string
};

interface IPostsRequest {
    id: string;
};

export const customHeaders = (headers: Headers) => {
    headers.set('authorization', `Bearer MY-TOKEN`);
};

export const postApi = createApi({
    reducerPath: 'api/posts',
    baseQuery: fetchBaseQuery({ 
        baseUrl: MAIN_URL,
        prepareHeaders: customHeaders,
    }),
    endpoints: (builder) => ({
        fetchUserPosts: builder.query<IPostsResponse[], IPostsRequest>({
            query: (user) => {
                return {
                    url: '/posts',
                    params: {
                        userId: user.id
                    },
                    method: 'GET',
                }
            },
            
        }),
    })
});

export const postApiReducer = postApi.reducer;
export const { useFetchUserPostsQuery } = postApi;