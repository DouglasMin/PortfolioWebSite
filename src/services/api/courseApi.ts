providesTags: (_, __, id) => [{ type: 'Course', id }],

invalidatesTags: (_, __, { id }) => [
  { type: 'Course', id }
],

onQueryStarted: async (arg, { queryFulfilled }) => {
  try {
    await queryFulfilled;
  } catch (error) {
    console.error('Error:', error);
  }
}, 