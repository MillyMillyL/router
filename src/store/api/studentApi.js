import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const studentApi = createApi({
  reducerPath: "studentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",
    prepareHeaders: (headers, { getState }) => {
      //获取用户的token
      const token = getState().auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["student"],

  endpoints(builder) {
    return {
      getStudents: builder.query({
        query() {
          return "students";
        },

        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data;
        },
        providesTags: [{ type: "student", id: "LIST" }],
      }),

      getStudentById: builder.query({
        query(id) {
          return `students/${id}`;
        },
        transformResponse(baseQueryReturnValue) {
          return baseQueryReturnValue.data;
        },
        keepUnusedDataFor: 60,
        providesTags: (result, error, id) => [{ type: "student", id }],
      }),

      delStudent: builder.mutation({
        query(id) {
          return { url: `students/${id}`, method: "delete" };
        },
        invalidatesTags: ["student"],
      }),

      addStudent: builder.mutation({
        query(stu) {
          return {
            url: "students",
            method: "post",
            body: { data: stu },
          };
        },
        invalidatesTags: [{ type: "student", id: "LIST" }],
      }),

      updateStudent: builder.mutation({
        query(stu) {
          return {
            url: `students/${stu.id}`,
            method: "put",
            body: { data: stu.attributes },
          };
        },
        invalidatesTags: (result, error, stu) => [
          { type: "student", id: stu },
          { type: "student", id: "LIST" },
        ],
      }),
    };
  },
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useDelStudentMutation,
  useAddStudentMutation,
  useUpdateStudentMutation,
} = studentApi;

export default studentApi;
