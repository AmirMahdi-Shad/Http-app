import http from "./httpService";

export const deleteComment = (commentId) => {
  return http.delete(`/comments/${commentId}`);
};
