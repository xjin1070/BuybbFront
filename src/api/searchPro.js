import axios from 'axios'

export async function searchPro(page, limit, name) {
  // const path = '/' + limit
  // const path2 = '?name=' + name
  // const path3 = '&position=' + position
  const { data } = await axios.get('/productInfo/findByPname?pname=' + name + '&pageNum=' + page + '&pageSize=' + limit)
  // /productInfo/findByPname?pname=一加&pageNum=2&pageSize=1
  return data
}
