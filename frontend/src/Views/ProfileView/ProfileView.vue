<template>
	<!-- This template represents a profile view page that displays information about a user. -->
	<!-- It includes sections for user information and match history. -->
	<!-- The page also includes buttons for navigating back, viewing the user's profile, and displaying match history. -->
	<!-- An error message is shown if there is an error. -->

	<div class="wrapper">
		<div class="profile" v-if="user && currentUser">
			<button @click="goPageBack" class="close-button" v-if="buttonsAllowed">&#x2715;</button>
			<div class="flex-container">
				<div class="info"> <ProfileUserInfo :user="user"/></div>
				<div class="history"> <ProfileMatchHistory :user="user"/></div>
			</div>
			<ProfileButtons v-if="buttonsAllowed && (currentUser.id !== user.id)" :user="user"/>
		</div>
		<small style="color: red;" v-if="errorMsg">{{errorMsg}}</small>
	</div>
</template>

<style scoped>
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	.wrapper 
	{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 50px;
	}

	.profile 
	{
		background-color: var(--grey);
		border: 5px solid var(--blue-dark);
		padding: 50px;
		width: 60%;
		min-width: 400px;
		max-width: 1000px;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.profile .close-button 
	{
		transition: .8s;
		background-color: transparent;
		border: none;
		color: red;
		font-weight: bold;
		width: 35px;
		height: 35px;
		font-size: 18px;
		margin-left: auto;
	}

	.profile .close-button:hover 
	{
		transition: .8s;
		transform: rotate(360deg);
	}

	.flex-container 
	{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: stretch;
		gap: 50px;
	}

	.flex-container .info 
	{
		flex: 1;
		min-width: 250px;
	}

	.flex-container .history 
	{
		flex: 1;
		min-width: 250px;
		display: flex;
		justify-content: center;
		margin-bottom: auto;
		align-self: stretch;
	}

	button 
	{
		width: 100%;
		padding: 10px;
		background-color: var(--blue-light);
		border: 1px solid black;
		border-radius: 5px;
		color: white;
		font-weight: bold;
	}

	button:hover 
	{
		cursor: pointer;
		background-color: var(--orange);
		color: var(--blue-dark);
	}
</style>

<script>
	// This script represents the logic and functionality for the ProfileView component.
	// This fetches user data from the server based on the user ID and displays it on the profile page.
	// This handles navigation, error handling, and computed properties for the component.
	// The component includes sub-components such as ProfileMatchHistory, ProfileButtons, and ProfileUserInfo for displaying specific sections of the user's profile.
	// This script interacts with the store to access and update data using Vuex.

	import store from '@/Store/index.js'
	import axios from 'axios'
	
	import ProfileMatchHistory from '@/Components/Profile/ProfileMatchHistory.vue'
	import ProfileUserInfo from '@/Components/Profile/ProfileUserInfo.vue'
	import ProfileButtons from '@/Components/Profile/ProfileButtons.vue'

	export default {
		name: 'ProfileView',

		components: 
		{
			ProfileMatchHistory,
			ProfileButtons,
			ProfileUserInfo
		},

		data() 
		{
			return {
				errorMsg: '',
				user: null,
				buttonsAllowed: true,
			}
		},
	
		async beforeMount() 
		{
			await store.dispatch('fetchCurrentUser');
			if (!this.currentUser) 
			{
				this.$router.push('/');
				return ;
			}
		},

		created() 
		{
			this.fetchUser(this.watchingCurrentProfileID);
		},

		unmounted() 
		{
			store.commit('setWatchingCurrentProfileID', 0);
		},

		methods: 
		{
			async fetchUser(id) 
			{
				if (id === 0) 
				{
					await axios.get(`${process.env.VUE_APP_HOST_URL}:3000/users/myuser`, {withCredentials: true})
					.then((response) => 
					{
						this.user = response.data
						this.buttonsAllowed = false
					})
					.catch((error) => 
					{
						this.errorMsg = 'Error: ' + error.response.data.message
					})
				}
				else 
				{
					await axios.get(`${process.env.VUE_APP_HOST_URL}:3000/users/id/${id}`, {withCredentials: true})
					.then((response) => 
					{
						this.user = response.data
					})
					.catch((error) => 
					{
						this.errorMsg = 'Error: ' + error.response.data.message
					})
				}
			},

			goPageBack() 
			{
				this.$router.back();
			},
		},

		computed: 
		{
			imageLink() 
			{
				if (this.user.avatarId === 1 && this.user.profilePictureURL)
					return this.user.profilePictureURL;
				else
					return `${process.env.VUE_APP_HOST_URL}:3000/database-files/${this.user.avatarId}`;
			},

			userStatus() 
			{
				switch(this.user.status) 
				{
					case (0):
						return 'offline'
					case (1):
						return 'online'
					case (2):
						return 'in game'
					case (3):
						return 'do not disturb'
				}
			},

			currentUser() 
			{
				return store.getters.getCurrentUser;
			},

			watchingCurrentProfileID() 
			{
				return store.getters.getWatchingCurrentProfileID;
			}
		},
	}
</script>