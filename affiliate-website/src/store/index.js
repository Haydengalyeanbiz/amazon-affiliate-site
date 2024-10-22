import { createStore } from 'vuex';
import axios from 'axios';

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
			state.isAuthenticated = !!user;
		},
		logout(state) {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
	actions: {
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
				const response = await axios.post('/submit-post', postData);
				return response.data;
			} catch (error) {
				console.error('Failed to submit post:', error);
				throw error;
			}
		},

		// ! USER LOGIN
		async login({ commit }, credentials) {
			try {
				const response = await axios.post('/login-for-tara', credentials);
				commit('setUser', response.data);
				return response.data;
			} catch (error) {
				console.error('Failed to log in:', error);
				throw error;
			}
		},

		// ! USER LOGOUT
		logout({ commit }) {
			commit('logout'); // Clear user data and authentication state
			axios.post('/logout'); // Optionally, clear the session in the backend
		},
	},
});

export default store;
