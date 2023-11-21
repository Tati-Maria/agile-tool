/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    'User',
    'Project',
    'Sprint',
    'Task',
    'Comment',
  ],
  endpoints: builder => ({}),
});
