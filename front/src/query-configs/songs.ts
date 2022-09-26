export const songsRequest = () => {
  return {
    url: `http://localhost:8080/songs`,
    transform: (body: any) => ({
      songs: body,
    }),
    update: {
      topStoryIds: (prev: any, next: any) => {
        // Discard previous `response` value (we don't need it anymore).
        return next;
      },
    },
  };
};
