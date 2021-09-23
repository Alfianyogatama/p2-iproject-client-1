import axios from 'axios'

const api = axios.create({
	baseURL: "https://ayochat.herokuapp.com",
	headers: {
		access_token: localStorage.getItem('access_token'),
	},
})

export default api