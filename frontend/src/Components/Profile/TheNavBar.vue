<template>
	<div class="nav-wrapper" v-if="navbarAllowed && currentUser">
		
		<!-- Go To Profile Page -->
		<router-link to="/profile">Profile</router-link>

		<!-- Go To Pong Game Page -->
		<router-link to="/gamelobby">Play</router-link>

		<!-- Go To Friends Page -->
		<router-link to="/friends">Friends</router-link>

		<!-- Go To Chat Page -->
		<router-link to="/chat">Chat</router-link>

		<!-- Go To Scoreboard Page -->
		<router-link to="/scoreboard">Scoreboard</router-link>

		<!-- Go To Settings Page -->
		<router-link to="/settings">Settings</router-link>

		<!-- Logout Button -->
		<button @click="logoutAPI">Logout</button>
	</div>
</template>

<style scoped>
	.nav-wrapper 
	{
		position: sticky;
		top: 0;
		left: 0;
		background-color: white;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		height: var(--nav-bar-height);
		border-bottom: 2px solid black;
	}

	a, button 
	{
		width: 100px;
		height: 35px;
		outline: none;
		text-decoration: none;
		border: 2px solid black;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background-color: var(--grey);
		font-size: 14px;
		font-weight: bold;
		color: black;
	}

	button:hover 
	{
		cursor: pointer;
	}

	a.router-link-exact-active 
	{
		background-color: var(--orange);
	}
</style>

<script>
// This is a navigation bar component that handles user authentication and provides logout functionality.
// It interacts with the server and Vuex store to manage user data.

	import axios from 'axios'
	import store from '@/Store/index.js';

	export default {
		name: 'TheNavBar',

		data() 
		{
			return {
				errorMsg: '',
			}
		},

		computed: 
		{
			// Retrieves the name of the current route using this.$route.name. It returns the name of the current route.
			currentRoute() 
			{
				return this.$route.name;
			},

			// Retrieves the current user data from the Vuex store using the getCurrentUser getter.
			currentUser() 
			{
				return store.getters.getCurrentUser;
			},

			// Checks the value of currentRoute and determines whether the navbar should be displayed. 
			// If the current route is '2falogin', 'login', or 'gameroom', it returns false; otherwise, it returns true.
			navbarAllowed() 
			{
				if (this.currentRoute === '2falogin' || this.currentRoute === 'login' || this.currentRoute === 'gameroom')
					return false;
				return true;
			}
		},

		// This dispatches the 'fetchCurrentUser' action from the Vuex store, which fetches the current user's data.
		async created() 
		{
			await store.dispatch('fetchCurrentUser');
		},

		methods: 
		{
			// Logs out the user by making a POST request to the server using axios. 
			// It sends the request to the /Authentication/logout endpoint with the withCredentials option set to true. 
			// Upon successful logout, it dispatches the 'setUserStatus' action with a value of 0, commits the 'setCurrentUser' mutation with a value of null, 
			// and navigates the user to the '/' route. If an error occurs, the error message is stored in the errorMsg property.
			logoutAPI() 
			{
				axios.post(`${process.env.VUE_APP_HOST_URL}:3000/Authentication/logout`, null, {withCredentials: true})
				.then((response) => 
				{
					store.dispatch('setUserStatus', 0);
					store.commit('setCurrentUser', null);
					this.$router.push('/')
				})
				.catch((error) => 
				{
					this.errorMsg = 'Error: ' + error.response.data.message
				})
			},
		}
	}
</script>