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
				const response = await axios.get('/posts'); // Flask API to get posts
				commit('setPosts', response.data); // Commit posts to the state
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
				const response = await axios.post('/submit-post', postData); // Flask API to submit post
				return response.data; // Return success message
			} catch (error) {
				console.error('Failed to submit post:', error);
				throw error;
			}
		},

		// ! USER LOGIN
		async login({ commit }, credentials) {
			try {
				const response = await axios.post('/login', credentials); // Flask API to login
				commit('setUser', response.data); // Store user data in state
				return response.data; // Login successful
			} catch (error) {
				console.error('Failed to log in:', error);
				throw error; // Re-throw error so the component can handle it
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
