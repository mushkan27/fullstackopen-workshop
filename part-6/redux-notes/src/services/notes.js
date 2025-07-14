import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async (newNote) => {
  const response = await axios.post(baseUrl, newNote)
  return response.data
}

