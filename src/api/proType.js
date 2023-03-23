// import request from '@/utils/request'
import axios from 'axios'
// export const reqStoreList = () => ({ url: 'localhost:8080/emp/1/2', method: 'get' })
export async function getProTypeList() {
  const { data } = await axios.get('/type/findAll')
  // if (data.status === 1) {
  //   data.status = '正常'
  // } else {
  //   data.status = '已经下架'
  // }
  // if (data.status === 1) {
  //   return '<em style="color:green">正常</em>'
  // }
  // return '<em style="color:red">已下架</em>'
  return data
}
