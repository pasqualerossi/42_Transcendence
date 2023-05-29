<template>
	<div class="main-container">
		<TheNavBar/>
		<router-view class="main-view"/>
		<TheGameInviteBox v-if="gameInviterId && gameInviterName" :senderId="gameInviterId" :senderName="gameInviterName" :showDuration="3000" @hideAlert="gameInviterId = 0"/>
	</div>
</template>

<script>
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