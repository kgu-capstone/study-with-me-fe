import Main from "./pages/Main";
import { authApi } from "./services/api";
export function sortManage(category, sort, type) {
  console.log(category, sort, type);
  authApi
    .get(`studies?category=${category}&sort=${sort}&page=0&type=${type}`)
    .then((Response) => {
      return Response.data.studyList;
    })
    .catch((err) => {
      console.log(err);
    });
}
