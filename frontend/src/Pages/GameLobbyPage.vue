<template>
	<!-- This displays a game lobby interface when there is a current user and a socket connection established. -->
	<!-- This includes a GameSearch component for searching and entering game rooms, -->
	<!-- and two other components, GameSpectate and GameInvitePlayers, displayed in rows within the lobby. -->
	<!-- The template is conditionally rendered based on the presence of the current user and socket connection. -->

	<div class="game-lobby-wrapper" v-if="currentUser && socket">
		<GameSearch @enterGame="enterGameRoom($event)" :socket="socket"/>
		<div class="rows">
			<GameSpectate class="row-item"/>
			<GameInvitePlayers class="row-item"/>
		</div>
	</div>
</template>

<style scoped>
	.game-lobby-wrapper 
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 60px;
		padding: 50px;

	}

	.rows 
	{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 25px;
		justify-content: center;
		padding: 5px;
	}

	.row-item 
	{
		flex-grow: 1;
		background-color: var(--grey);
		padding: 50px;
		border: 5px solid var(--blue-dark);
	}
</style>

<script setup>
	// This script sets up dependencies and computed variables, handles user navigation and game room entry.
	// The enterGameRoom function is defined, which is triggered when a user wants to enter a game room. 
	// It sets the current game key and role in the store, and navigates the user to the game room view using the router.push method.
	// The onBeforeMount hook is used to fetch the current user from the store and perform a check.
	// If the current user is not available, it redirects the user to the home page.

	import { computed, onBeforeMount } from 'vue'
	import store from '@/Store/index.js';
	import { useRouter } from 'vue-router';

	import GameInvitePlayers from '@/Components/Game/GameInvitePlayers.vue'
	import GameSpectate from '@/Components/Game/GameSpectate.vue'
	import GameSearch from '@/Components/Game/GameSearch.vue'
	
	const router = useRouter()

	const socket = computed(() => 
	{
		return store.getters.getSocketGame;
	})

	const currentUser = computed(() => 
	{
		return store.getters.getCurrentUser;
	})

	// This is called when a user wants to enter a game room.
	// It sets the current game key and role in the Vuex store. 
	// Then navigates to the "gameroom" route using the Vue Router.
	const enterGameRoom = (gameKey) => 
	{
		store.commit('setCurrentGameKey', Number(gameKey));
		store.commit('setCurrentGameRole', 'player');
		router.push('gameroom');
	}

	// This fetches the current user data from the Vuex store. 
	// If there is no current user, it redirects to the home page using the Vue Router.
	onBeforeMount(async () => 
	{
		await store.dispatch('fetchCurrentUser');

		if (!currentUser.value) 
		{
			router.push('/');
			return ;
		}
	})
</script>