import Main from "./pages/Main";
import { authApi, defaultapi } from "./services/api";
export const sortManage = async(category, sort, page, type, province, city) =>{
  let data = {}


  data["category"] = category
  data["sort"] = sort
  data["page"] = page
  if(type != null){
    data["type"] = type
  }
  if((type == 'offline' || type == null) && (province != '' && province !='시/도 선택')){
    data["province"] = province
  }
  if((type == 'offline' || type == null) && (city != '' && city != '구/군 선택')){    
    data["city"] = city
  }

  console.log(data);
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
