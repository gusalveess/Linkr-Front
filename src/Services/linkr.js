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

function logout() {
	const config = createHeaders();

	const promise = axios.post(`${API_URL}/logout`, {}, config);

	return promise;
}

function createPost(body) {
	const config = createHeaders();

	const promise = axios.post(`${API_URL}/posts`, body, config);

	return promise;
}

function listPosts(page) {
	const config = createHeaders();

	const promise = axios.get(`${API_URL}/posts/?page=${page}`, config);

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

function listPostsWithHashtag(hashtag, page) {
	const config = createHeaders();

	const promise = axios.get(
		`${API_URL}/posts/${hashtag}/?page=${page}`,
		config
	);

	return promise;
}

function listPostsFromUser(id, page) {
	const config = createHeaders();

	const promise = axios.get(
		`${API_URL}/user/${id}/posts/?page=${page}`,
		config
	);

	return promise;
}

function listPostsAfterId(id) {
	const config = createHeaders();

	const promise = axios.get(`${API_URL}/posts/?after=${id}`, config);

	return promise;
}

function repost(id) {
	const config = createHeaders();

	const promise = axios.post(`${API_URL}/posts/${id}/share`, {}, config);

	return promise;
}

function like(id) {
	const config = createHeaders();

	const promise = axios.post(`${API_URL}/posts/${id}/like`, {}, config);

	return promise;
}

function follow(id) {
	const config = createHeaders();

	const promise = axios.post(`${API_URL}/users/${id}/follow`, {}, config);

	return promise;
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
	listPostsFromUser,
	listPostsAfterId,
	repost,
	logout,
	like,
	follow,
};
