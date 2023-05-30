<template>

<!-- This is a footer section with an input field and a send button to enter and send messages. -->

	<footer class="footer">
		<input v-model="messageText" placeholder="message">
		<button @click="(messageText) ? sendMessage() : 0">Send</button>
	</footer>
</template>

<script setup>

// This is a script section using the Vue 3 Composition API. 
// It includes reactive variables, event listeners, and lifecycle hooks.
// It handles sending messages in a chat room using a socket connection.

	import { ref, computed, onMounted, onUnmounted } from 'vue'
	import store from '@/store/index.js'

	const messageText = ref('');

	const props = defineProps({
		roomName: {
			type: String,
			required: true
		},
		userId: {
			type: Number,
			required: true
		}
	});

	const socket = computed(() => 
	{
		return store.getters.getSocketChat;
	})

	const findOtherUserId = (roomName) => 
	{
		const id = roomName.replace(props.userId.toString(), '').replace('_', '');
		return Number(id);
	}

	const sendMessage = () => 
	{
		socket.value.emit('sendMessage', 
		{
			roomName: props.roomName,
			receiverId: findOtherUserId(props.roomName),
			message: messageText.value,
		})
		messageText.value = '';
	}

	const readKey = (e) => 
	{
		if (e.key === 'Enter' && messageText.value) 
		{
			sendMessage();
		}
	}

	onUnmounted(() => 
	{
		document.removeEventListener('keydown', readKey);
	})

	onMounted(() => 
	{
		document.addEventListener('keydown', readKey);
	})
</script>

<style scoped>
	button 
	{
		height: 36px;
		width: 100px;
		background-color: var(--blue-light);
		border-radius: 5px;
		color: white;
		cursor: pointer;
		border: 1px solid var(--grey);
		font-weight: bold;
	}

	button:hover 
	{
		border-color: var(--blue-light);
	}

	.footer 
	{
		display: flex;
		align-items: center;
		flex-direction: row;
		gap: 10px;
		padding: 0 30px;
	}

	.footer input 
	{
		flex: 1;
		outline: none;
		color: black;
		padding: 8px 16px;
		border: 1px solid var(--blue-dark);
		border-radius: 5px;
		background-color: white;
		color: black;
	}
</style>