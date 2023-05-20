import Main from "./pages/Main";
import { authApi, defaultapi } from "./services/api";
export const sortManage = async(category, sort, type, province, city) =>{
  let data = {}

  console.log(category, sort, type, province, city);

  data["category"] = category
  data["sort"] = sort
  data["page"] = 0
  if(type != null){
    data["type"] = type
  }
  if(type == 'offline' && (province != '' || city == '')){
    data["province"] = province
    data["city"] = city
  }

  return await defaultapi.get(`studies`, {
    params: data
  })
    .then((response) => {
      return response.data.studyList;
    })
    .catch((err) => {
      console.log(err);
    });    
}
