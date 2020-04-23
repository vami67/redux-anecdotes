import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdoteObject) => {
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

const update = async (id, anecdoteObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, anecdoteObject)
  return response.data
}

export default { getAll, create, update }