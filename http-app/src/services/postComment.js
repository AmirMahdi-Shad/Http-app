import http from "./httpService";

export const postComment = (data) => {
  return http.post("/comments", data);
};
