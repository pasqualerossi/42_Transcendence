<template>
	<div class="spectate">
		<h2>Spectate Game</h2>
		<button @click="showGames">Refresh Games</button>
		<div class="live-games" v-for="game in liveGames" :key="game">
			<BaseCardGameSpectate :gameInfo="game" @spectateGame="spectateGame($event)"/>
		</div>
	</div>
</template>

<script setup>
	import { onBeforeMount, ref, computed, onMounted } from 'vue'

	import store from '@/store/index.js'
	import { useRouter } from 'vue-router';
	import BaseCardGameSpectate from '@/components/BaseCardGameSpectate.vue'
	
	const router = useRouter()
	const liveGames = ref([]);

	const socket = computed(() => 
	{
		return store.getters.getSocketGame;
	})

	const showGames = () => 
	{
		socket.value.emit('showGames', (games) => 
		{
			liveGames.value = games;
		})
	}

	const spectateGame = (gameKey) => 
	{
		socket.value.emit('spectateGame', Number(gameKey), (key) => 
		{
			store.commit('setCurrentGameKey', key);
			store.commit('setCurrentGameRole', 'spectator');
			router.push('gameroom');
		})
	}

	onMounted(() => 
	{
		showGames();
	})
</script>

<style scoped>
	.spectate 
	{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	button 
	{
		width: 150px;
		height: 40px;
		background-color: var(--orange);
		border: 2px solid black;
		color: black;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: bold;
		cursor: pointer;
	}
</style>