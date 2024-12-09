import { createStore } from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.withCredentials = true;

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
				commit('setUser', response.data.user);
				console.log('Login successful');
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
