import { createApi } from '@reduxjs/toolkit/query/react';
import { db } from '../../firebase-config';
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

const firebaseBaseQuery = async ({ baseUrl, url, method, body }) => {
  switch (method) {
    case 'GET':
      const snapshot = await getDocs(collection(db, url));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { data };

    case 'POST':
      const docRef = await addDoc(collection(db, url), body);
      return { data: { id: docRef.id, ...body } };

    case 'DELETE':
      // Implement code to delete data based on the 'url'
      // For example, if 'url' is a reference to a document, you can delete it like this:
      console.log('body: ', body);
      console.log('url: ', url);
      await deleteDoc(doc(db, url, body.id));

      return { data: { body } };

    case 'PUT':
      await updateDoc(doc(db, url, body.id), body);

      return { data: { body } };

    default:
      throw new Error(`Unhandled method ${method}`);
  }
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: firebaseBaseQuery,
  tagTypes: ['users'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ user }) => ({
        baseUrl: '',
        url: 'users',
        method: 'POST', // PUT = modifiera data - DELETE = ta bort data
        body: user
      }),
      invalidatesTags: ['users']
    }),
    getUsers: builder.query({
      query: () => ({
        baseUrl: '',
        url: 'users',
        method: 'GET', // PUT = modifiera data - DELETE = ta bort data
        body: ''
      }),
      providesTags: ['users']
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        baseUrl: '',
        url: `users`,
        method: 'DELETE', // Use 'DELETE' method for deleting a user
        body: { id: id }
      }),
      invalidatesTags: ['users']
    }),
    updateUser: builder.mutation({
      query: ({ user }) => ({
        baseUrl: '',
        url: 'users',
        method: 'PUT',
        body: user
      }),
      invalidatesTags: ['users']
    })
  })
});



export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: firebaseBaseQuery,
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({ posts }) => ({
        baseUrl: '',
        url: 'posts',
        method: 'POST', // PUT = modifiera data - DELETE = ta bort data
        body: posts
      }),
    }),
    getPosts: builder.query({
      query: () => ({
        baseUrl: '',
        url: 'posts',
        method: 'GET', // PUT = modifiera data - DELETE = ta bort data
        body: ''
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        baseUrl: '',
        url: `posts`,
        method: 'DELETE', // Use 'DELETE' method for deleting a user
        body: { id: id }
      }),
    }),
    updatePost: builder.mutation({
      query: ({ posts }) => ({
        baseUrl: '',
        url: 'posts',
        method: 'PUT',
        body: posts
      }),
    })
  })
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation
} = usersApi;

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation
} = postsApi;
