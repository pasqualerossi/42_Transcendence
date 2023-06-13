<template>

	<!-- CSS class called "main-container" -->
	<div class="main-container">

		<!-- Navigation Bar for the Web Page -->
		<TheNavBar/>

		<!-- CSS class called "main-view" -->
		<router-view class="main-view"/>
		
		<!-- This is only displayed if there is a valid game inviter ID and game inviter name -->
		<TheGameInviteBox v-if="gameInviterId && gameInviterName" :senderId="gameInviterId" :senderName="gameInviterName" :showDuration="3000" @hideAlert="gameInviterId = 0"/>
	
	</div>
</template>

<script>
	// This script sets up a Vue component that handles game invitations and navigation.
	// It imports components, store, and router.
	// It initialises data properties.
	// It sets up computed properties based on store getters.
	// It handles component lifecycle hooks for socket connections.
	// It listens to game invitation events and redirects to the game room.
	// Finally, it creates and mounts the Vue application.

	import { createApp } from 'vue'

	import TheNavBar from '@/Components/Profile/TheNavBar.vue'
	import TheGameInviteBox from '@/Components/Game/TheGameInviteBox.vue'
	import store from '@/Store/index.js'
	import router from './Router'

	// MAIN - Everything Starts From Here.
	createApp(App).use(router).use(store).mount('#app');
	
	// Create a Vue Web Application called App using 'createApp() function.
	// Add a router using app.use(router), to define the different routes in this web app.
	// Then add a store using the app.use(store). 
	// Store is a centralised storage system for the web app's data, that makes it easy to manage and share data across different components.
	// Finally mounts the web application by attaching a HTML element with the ID '#app' that will be will be rendered and displayed on the webpage.


	// EXPORT DEFAULT
	// This interacts with the store to fetch data, sets up event listeners for socket communication, and handle game invitations and redirects.

	export default 
	{
		data() 
		{
			return {
				gameInviterId: 0,
				gameInviterName: ''
			}
		},
		
		components: 
		{
			TheNavBar,
			TheGameInviteBox
		},

		computed: 
		{
			gameSocket() 
			{
				return store.getters.getSocketGame;
			},
	
			chatSocket() 
			{
				return store.getters.getSocketChat;
			},

			currentUser() 
			{
				return store.getters.getCurrentUser;
			}
		},

		unmounted() 
		{
			store.dispatch('closeSockets');
		},

		async beforeMount() 
		{
			await store.dispatch('fetchCurrentUser');
			if (this.currentUser)
				await store.dispatch('setupSockets');

			if (this.gameSocket) 
			{
				this.gameSocket.on('receivedGameInvitaion', ({id, name}) => 
				{
					this.gameInviterId = id;
					this.gameInviterName = name;
				})
	
				this.gameSocket.on('redirectToGame', (gameKey) => 
				{
					store.commit('setCurrentGameKey', Number(gameKey));
					store.commit('setCurrentGameRole', 'player');
					this.gameInviterId = 0;
					this.gameInviterName = '';
					this.$router.push('gameroom');
				})
			}
		}
	}
</script>

<style>
 /* This is CSS code that sets the style and appearance of elements on the web page. */

	:root 
	{
		--blue-dark: #0A1931;
		--blue-light: rgb(28, 123, 212);
		--grey: #EFEFEF;
		--orange: #FFC947;
		--nav-bar-height: 60px;
	}

	* {
		box-sizing: border-box;
	}

	body 
	{
		height: 100vh;
		padding: 0;
		margin: 0;
	}

	.main-container 
	{
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main-view 
	{
		flex: 1;
	}

	#app 
	{
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>