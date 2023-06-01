<template>
<!-- This is a template for creating a new room in a chat application. -->
<!-- It consists of input fields for entering the room name and password (if it's a protected room). -->
<!-- A dropdown for selecting the room's state (public or protected). -->
<!-- And a button to create the room. -->
<!-- If the room name is not provided, an error message is displayed. -->

	<div class="new_room">
		<input v-model="newRoomName" placeholder="new room name">
		<small v-if="roomNameErrorMessage" class="room-name-error">{{roomNameErrorMessage}}</small>
		<select v-model="newRoomState">
			<option value="public">Public</option>
			<option value="protected">Protected</option>
		</select>
		<input v-if="newRoomState === 'protected'" v-model="newRoomPassword" placeholder="password">
		<button @click="(newRoomName) ? createNewRoom() : roomNameError(`Name can't be blank!`)">Create Room</button>
	</div>
</template>

<style scoped>
	button 
	{
		height: 40px;
		background-color: var(--blue-light);
		border: 2px solid black;
		color: white;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		font-weight: bold;
		cursor: pointer;
	}

	.new_room 
	{
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	input, select 
	{
		outline: none;
		color: black;
		padding: 5px;
		border: 2px solid black;
		border-radius: 5px;
		background-color: white;
		color: black;
	}
</style>

<script setup>
// This script manages the creation of new chat rooms. 
// It handles input validation, emits events to the chat socket, and displays error messages if necessary.

	import { computed, ref } from'vue';
	import  store  from '@/Store/index.js';

	const roomNameErrorMessage = ref('');
	const newRoomName = ref('');
	const newRoomState = ref('public');
	const newRoomPassword = ref('');

	const currentUser = computed(() => 
	{
		return store.getters.getCurrentUser
	})

	const socket = computed(() => 
	{
		return store.getters.getSocketChat;
	})

	const roomNameError = (errorMessage) => 
	{
		roomNameErrorMessage.value = errorMessage;
		const timeout = setTimeout(() => 
		{
			roomNameErrorMessage.value = ''
		}, 3000);
	}

	const createNewRoom = () => 
	{
		if (newRoomName.value.length > 10) 
		{
			roomNameError('Error: Maximum name length is 10')
			return ;
		}
		if (newRoomPassword.value.length > 64) 
		{
			roomNameError('Error: Maximum password length is 64')
			return ;
		}
		socket.value.emit('createRoom', 
		{
				roomName: newRoomName.value,
				access: newRoomState.value,
				roomPassword: newRoomPassword.value
			}, (success) => 
			{
				if (success)
					store.dispatch('fetchCurrentUser');
				else
					roomNameError(`Error: ${newRoomName.value} already exists`);
			}
		);
		newRoomName.value = '';
		newRoomPassword.value = '';
		newRoomState.value = 'public';
	}
</script>