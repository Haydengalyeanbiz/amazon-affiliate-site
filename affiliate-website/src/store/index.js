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
	},
	actions: {
		// ! USER LOGIN
		async login({ commit }, credentials) {
			try {
				const response = await axios.post('/login-for-tara', credentials);
				console.log('Login response:', response.data);
				commit('setUser', response.data.user);
				console.log('User set in state:', response.data.user);
				return response.data;
			} catch (error) {
				if (error.response && error.response.status === 401) {
					throw new Error('Invalid email or password');
				}
				console.error('Failed to log in:', error);
				throw error;
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
			console.log('State before submitting post:', state.isAuthenticated);
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
		// ! USER LOGOUT
		async logout({ commit }) {
			try {
				await axios.post('/logout');
				commit('logout');
			} catch (error) {
				console.error('Failed to log out:', error);
			}
		},
	},
});

export default store;
