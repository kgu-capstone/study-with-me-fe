import Main from "./pages/Main";
import { authApi, defaultapi } from "./services/api";
export const sortManage = async(category, sort, type) =>{
  let data = {}

  data["category"] = category
  data["sort"] = sort
  data["page"] = 0
  if(type != null){
    data["type"] = type
  }
  if(type == 'offline'){ // 조건에 offline && 시/도를 선택했을 때도 추가해도 좋을 듯 해요
    data["province"] = '지역선택 구현하면 어기에 시/도 props 넣기'
    data["city"] = '지역선택 구현하면 어기에 구/군 props 넣기'
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
