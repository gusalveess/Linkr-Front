import axios from "axios";

const API_URL = "http://localhost:4000";

function createHeaders() {
	const token = JSON.parse(localStorage.getItem("linkr"))?.token;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return config;
}

function signIn(body) {
	const promise = axios.post(`${API_URL}/signin`, body);

	return promise;
}

function signUp(body) {
	const promise = axios.post(`${API_URL}/signup`, body);

	return promise;
}

function createPost(body) {
	const config = createHeaders();

	const promise = axios.post(`${API_URL}/posts`, body, config);

	return promise;
}

export { signIn, signUp, createPost };
