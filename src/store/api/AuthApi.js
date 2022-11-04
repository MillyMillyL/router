import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api/auth/" }),
  endpoints(build) {
    return {
      register: build.mutation({
        query(user) {
          return {
            url: "local/register",
            method: "post",
            body: user, //username, password, email
          };
        },
      }),
      login: build.mutation({
        query(user) {
          return {
            url: "local",
            method: "post",
            body: user, //identifier
          };
        },
      }),
    };
  },
});

export const { useRegisterMutation, useLoginMutation } = AuthApi;
