<template>
	<!-- This displays a section for managing friends. -->
	<!-- It allows users to switch between different tabs and renders the content based on the selected tab. -->

	<div class="friends-wrapper">
		<div class="wrapper">
			<h2>Friends</h2>
			<h3>Change Tab</h3>
			<div class="tabs">
				<button :style="(currentTab === tab) ? 'background-color: var(--blue-light); color: white;' : 0" v-for="tab in tabs" :key="tab" @click="currentTab = tab"> {{tab}}</button>
			</div>
			<keep-alive>
				<component :is="currentTabComponent" :usersData="usersData" :key="currentTabComponent"></component>
			</keep-alive>
		</div>
	</div>
</template>

<style scoped>
	.friends-wrapper 
	{
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wrapper 
	{
		background-color: var(--grey);
		padding: 50px;
		border: 5px solid var(--blue-dark);
		width: 400px;
	}

	h2 
	{
		color: var(--blue-dark);
		letter-spacing: 2px;
	}

	h3 
	{
		color: var(--blue-dark);
		letter-spacing: 2px;
		margin-top: 50px;
	}

	.tabs 
	{
		margin: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 10px;
	}

	.tabs button 
	{
		width: 80px;
		height: 35px;
		border: 2px solid black;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background-color: var(--orange);
		font-size: 12px;
		font-weight: bold;
		color: black;
		cursor: pointer;
	}

	.tabs button:hover 
	{
		border: 2px solid  var(--blue-dark);
		color:  var(--grey);
		background-color:  var(--blue-light);
	}
</style>

<script>
// This fetches data from the server using Axios, interacts with the Vuex store, and manages different tabs for displaying friends-related content.
// This includes methods for retrieving and updating user data, as well as computed properties for accessing the current user.
// The component is mounted before rendering, ensuring that the necessary data is fetched and the user is authenticated.

import axios from 'axios'
import store from '@/Store/index.js';

import FriendsList from '../Components/Friends/FriendsList.vue'
import FriendsFind from '../Components/Friends/FriendsFind.vue'
import FriendsRequest from '../Components/Friends/FriendsRequest.vue'

export default {
	name: 'FriendsPage',

	components: 
	{
		FriendsList,
		FriendsFind,
		FriendsRequest,
	},

	data() 
	{
		return {
			response: null,
			currentTab: 'List',
			tabs: ['List', 'Find', 'Request'],
			usersData: 
			{
				allUsers: [],
				otherUsers: null,
			},
		}
	},

	computed: 
	{
		// Returns the component name associated with the current tab.
		currentTabComponent() 
		{
			return 'Friends' + this.currentTab;
		},

		// Retrieves the current user data from the Vuex store.
		currentUser() 
		{
			return store.getters.getCurrentUser;
		}
	},

	methods: 
	{	
		// Sends an HTTP GET request to retrieve all users' data and stores it in usersData.allUsers.
		async getAllUsers() 
		{
			await axios.get(`${process.env.VUE_APP_HOST_URL}:3000/Usersall`, {withCredentials: true})
			.then((response) => 
			{
				this.usersData.allUsers = response.data
			})
			.catch((error) => 
			{
				console.log('Error: ' + error.response.data.message)
			})
		},

		// Sends an HTTP GET request to retrieve other users' data and stores it in usersData.otherUsers.
		async getAllOtherUsers() 
		{
			await axios.get(`${process.env.VUE_APP_HOST_URL}:3000/Userspublic`, {withCredentials: true})
			.then((response) => 
			{
				this.usersData.otherUsers = response.data;
			})
			.catch((error) => 
			{
				console.log('Error: ' + error.response.data.message)
			})
		},
	},

	// This checks if there is a current user, redirects to the home page if not, and then calls the getAllUsers, 
	async beforeMount() 
	{
		if (!this.currentUser) 
		{
			this.$router.push('/');
			return ;
		}
		await this.getAllUsers();
		await this.getAllOtherUsers();
		await store.dispatch('fetchCurrentUser');
	},
}
</script>