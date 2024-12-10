import { createStore } from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
	const csrfToken = document.cookie
		.split('; ')
		.find((row) => row.startsWith('csrf_token='))
		?.split('=')[1];
	if (csrfToken) {
		config.headers['X-CSRF-Token'] = csrfToken;
	}
	return config;
});

const store = createStore({
	state() {
		return {
			posts: [],
			user: null,
			isAuthenticated: false,
		};
	},
	mutations: {
		setPosts(state, posts) {
			state.posts = posts;
		},
		setUser(state, user) {
			state.user = user;
			state.isAuthenticated = true;
		},
		logout(state) {
			state.user = null;
			state.isAuthenticated = false;
		},
		removePost(state, postId) {
			state.posts = state.posts.filter((post) => post.id !== postId);
		},
	},
	actions: {
		// ! USER LOGIN
		async login({ commit }, credentials) {
			try {
				const response = await axios.post('/login-for-tara', credentials);
				commit('setUser', response.data.user);
				return response.data;
			} catch (error) {
				if (error.response && error.response.status === 401) {
					throw new Error('Invalid email or password');
				}
				console.error('Failed to log in:', error);
				throw error;
			}
		},
		// ! USER LOGOUT
		async logout({ commit }) {
			try {
				await axios.post('/logout');
				commit('logout');
			} catch (error) {
				console.error('Failed to log out:', error);
			}
		},
		// ! GET ALL POSTS
		async fetchPosts({ commit }) {
			try {
				const response = await axios.get('/posts');
				commit('setPosts', response.data);
			} catch (error) {
				console.error('Failed to fetch posts:', error);
			}
		},

		// ! SUBMIT NEW POST
		async submitPost({ state }, postData) {
			if (!state.isAuthenticated) {
				throw new Error('User is not authenticated');
			}

			try {
				const response = await axios.post('/submit-post', postData, {
					withCredentials: true,
				});
				return response.data;
			} catch (error) {
				console.error('Failed to submit post:', error);
				throw error;
			}
		},
		// ! FETCH A SINGLE POST
		async fetchSinglePost(_, postId) {
			// Replace `commit` with `_`
			try {
				const response = await axios.get(`/api/posts/${postId}`);
				return response.data; // Return the post data
			} catch (error) {
				console.error('Failed to fetch single post:', error);
				throw error;
			}
		},
		// ! UPDATE A POST
		async updatePost(_, updatedPost) {
			try {
				const response = await axios.put(
					`/api/posts/${updatedPost.id}`,
					updatedPost
				);
				console.log('Post updated successfully:', response.data);
				return response.data; // Return the updated data if needed
			} catch (error) {
				console.error('Failed to update post:', error);
				throw error;
			}
		},
		// ! DELETE A POST
		async deletePost({ commit }, postId) {
			return axios
				.delete(`/posts/${postId}`)
				.then(() => {
					commit('removePost', postId); // Update the state
				})
				.catch((error) => {
					console.error('Failed to delete post:', error);
					throw error;
				});
		},
	},
});

export default store;
