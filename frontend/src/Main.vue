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

	import TheNavBar from '@/components/Profile/TheNavBar.vue'
	import TheGameInviteBox from '@/components/Game/TheGameInviteBox.vue'
	import store from '@/store/index.js'
	import router from './router'
	import { createApp } from 'vue'

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

	// MAIN - Everything Starts From Here.
	createApp(App).use(router).use(store).mount('#app');
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