import http from "./httpService";

export const getCommentById = (commentId) => {
  return http.get(`/comments/${commentId}`);
};
