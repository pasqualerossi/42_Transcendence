<template>
	<div class="new_room">
		<input v-model="newRoomName" placeholder="new room name">
		<small v-if="roomNameErrorMessage" class="room-name-error">{{roomNameErrorMessage}}</small>
		<select v-model="newRoomState">
			<option value="public">public</option>
			<option value="protected">protected</option>
		</select>
		<input v-if="newRoomState === 'protected'" v-model="newRoomPassword" placeholder="password">
		<button @click="(newRoomName) ? createNewRoom() : roomNameError(`Name can't be blank!`)">Create Room</button>
	</div>
</template>

<script setup>
	import { computed, ref } from'vue';
	import  store  from '@/store/index.js';

	const roomNameErrorMessage = ref('');
	const newRoomName = ref('');
	const newRoomState = ref('public');
	const newRoomPassword = ref('');


	/* COMPUTED */
	const currentUser = computed(() => {
		return store.getters.getCurrentUser
	})

	const socket = computed(() => {
		return store.getters.getSocketChat;
	})
	/* COMPUTED */


	/* FUNCTIONS */
	const roomNameError = (errorMessage) => {
		roomNameErrorMessage.value = errorMessage;
		const timeout = setTimeout(() => {
			roomNameErrorMessage.value = ''
		}, 3000);
	}
	/* FUNCTIONS */


	/* SOCKET ACTIONS */
	const createNewRoom = () => {
		if (newRoomName.value.length > 10) {
			roomNameError('Error: Maximum name length is 10')
			return ;
		}
		if (newRoomPassword.value.length > 64) {
			roomNameError('Error: Maximum password length is 64')
			return ;
		}
		socket.value.emit('createRoom', {
				roomName: newRoomName.value,
				access: newRoomState.value,
				roomPassword: newRoomPassword.value
			}, (success) => {
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
	/* SOCKET ACTIONS */
</script>

<style scoped>
	button {
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

	.new_room {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	input, select {
		outline: none;
		color: black;
		padding: 5px;
		border: 2px solid black;
		border-radius: 5px;
		background-color: white;
		color: black;
	}
</style>