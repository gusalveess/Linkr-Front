import axios from "axios";

const API_URL = "https://linkrr-project.herokuapp.com";

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

function listPosts() {
	const config = createHeaders();

	const promise = axios.get(`${API_URL}/posts`, config);

	return promise;
}

function deletePost(id) {
	const config = createHeaders();

	const promise = axios.delete(`${API_URL}/posts/${id}`, config);

	return promise;
}

function editPost({ body, id }) {
	const config = createHeaders();

	const promise = axios.put(`${API_URL}/posts/${id}`, body, config);

	return promise;
}

function listHashtags() {
	const config = createHeaders();

	const promise = axios.get(`${API_URL}/hashtags`, config);

	return promise;
}

function listPostsWithHashtag(hashtag) {
	const config = createHeaders();

	const promise = axios.get(`${API_URL}/posts/${hashtag}`, config);

	return promise;
}

function listPostsId(id){
	const config = createHeaders();

	const promise = axios.get(`${API_URL}/user/${id}`,config)

	return promise
}

export {
	signIn,
	signUp,
	createPost,
	listPosts,
	deletePost,
	editPost,
	listHashtags,
	listPostsWithHashtag,
	listPostsId
};
