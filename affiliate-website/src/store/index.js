import { createStore } from 'vuex';

const store = createStore({
	state() {
		return {
			posts: [],
			isAuthenticated: false,
		};
	},
	mutations: {
		setPosts(state, posts) {
			state.posts = posts;
		},
		setAuthenticated(state, status) {
			state.isAuthenticated = status;
		},
	},
	actions: {
		fetchPosts({ commit }) {
			// ? this is where the fetch posts and other fetches from the backend will go.
		},
	},
});
