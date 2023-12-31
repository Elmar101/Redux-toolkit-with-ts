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
    userId: string;
    title: string;
    author: string;
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
        fetchUserPosts: builder.query<IPostsResponse[], Pick<IPostsRequest, 'id'>>({
            query: (user) => {
                return {
                    url: '/posts',
                    method: 'GET',
                    params: {
                        userId: user.id
                    },
                }
            },
            
        }),
        createUserPost: builder.mutation<IPostsResponse, Omit<IPostsRequest, 'id'>>({
            query: (userPost) => {
                return {
                    url: '/posts',
                    method: 'POST',
                    body: {
                        userId: userPost.userId,
                        title: userPost.title,
                        author: userPost.author,
                    }
                }
            },
        }),
    })
});

export const postApiReducer = postApi.reducer;
export const { useFetchUserPostsQuery, useCreateUserPostMutation } = postApi;