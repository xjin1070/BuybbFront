import axios from 'axios'

export async function searchType(tno) {
  const { data } = await axios.get('/type/findByTno/' + tno)
  return data
}
