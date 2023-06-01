<template>

<!-- This is for an options component that displays a message while searching for a game, a switch for toggling specials, -->
<!-- and buttons for playing or canceling searching for a pong game.-->
	<div class="options">
		<div v-if="waiting">searching game .......</div>
		<div class="switch">
			<strong>specials</strong>
			<BaseSwitch @checked="specials = $event"/>
		</div>
		<button v-if="!waiting" @click="searchGame">Play</button>
		<button v-if="waiting" @click="cancelSearchGame">Cancel</button>
	</div>
</template>

<style scoped>
	.options 
	{
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 25px;
	}

	.switch 
	{
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	button 
	{
		width: 100px;
		background-color: var(--blue-light);
		border: 2px solid black;
		color: white;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22px;
		font-weight: bold;
		cursor: pointer;
	}
</style>

<script setup>
// This is a script that sets up reactive variables, socket event listeners, and functions for an options component.

	import { computed, ref, onMounted, onUnmounted } from 'vue'
	
	import store from '@/Store/index.js';
	import BaseSwitch from '@/Components/BaseSwitch.vue'

	const emit = defineEmits(['enterGame'])
	const waiting = ref(false);
	const specials = ref(false);

	const socket = computed(() => 
	{
		return store.getters.getSocketGame;
	})

	const searchGame = () => 
	{
		socket.value.emit('searchGame', specials.value);
	}

	const cancelSearchGame = () => 
	{
		socket.value.emit('cancelSearchGame', (response) => 
		{
			waiting.value = false;
		});
	}

	const turnOffSocketListeners = () => 
	{
		if (socket.value) 
		{
			socket.value.off('searchGame');
			socket.value.off('cancelSearchGame');
		}
	}

	onUnmounted(() => 
	{
		turnOffSocketListeners();
		if (socket.value && waiting.value === true)
			cancelSearchGame();
	})

	onMounted(() => 
	{
		socket.value.on('createdGame', () => 
		{
			waiting.value = true;
		})

		socket.value.on('foundGame', (gameKey) => 
		{
			waiting.value = false;
			emit('enterGame', gameKey);
		})
	})
</script>