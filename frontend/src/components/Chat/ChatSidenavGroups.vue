<template>

<!-- This template represents a chat interface for displaying available chat rooms and the user's own rooms. -->
<!-- It includes components for creating new rooms, displaying room cards, and handling password protection for protected rooms. -->
<!-- Users can join or enter rooms depending on their access permissions. -->

	<div class="groups">
		<ChatSidenavCreateRoom />

		<h3>Available Rooms</h3>
		<div class="room" v-for="room in filterGroups" :key="room.name">
			<BaseCardRoom 
				v-if="room"
				:room="room"
				:showEnterButton="false"
				:showJoinButton="true"
				@passwordProtection="showPopup($event)"
				@joinRoom="joinRoom($event)"
			/>
		</div>

		<h3>My Rooms</h3>
		<div class="room" v-for="room in filterMyRooms" :key="room.name">
			<BaseCardRoom 
				v-if="room"
				:room="room"
				:showEnterButton="true"
				:showJoinButton="false"
				@enterRoom="enterRoom($event)"
			/>
		</div>

		<PopupPassword
			v-if="popupData && roomNameImTryingToEnter"
			:info="popupData.info"
			:visible="showPopupPassword"
			:errorMessage="errorPopupPassword"
			@confirmed="validateRoomAccess(roomNameImTryingToEnter, $event)"
			@canceled="hidePopup"
		/>
	</div>
</template>

<script setup>

// This script sets up the logic for the chat interface.
// It handles the display and interaction of chat rooms, including filtering available rooms and the user's own rooms.
// It uses components such as BaseCardRoom to render room cards, PopupPassword for password protection.
// ChatSidenavCreateRoom for creating new rooms.
// It also communicates with the server through the socket to join or enter rooms, validate room access, and handle password verification.

	import { computed, ref } from'vue';
	import  store  from '@/store/index.js';
	import BaseCardRoom from '@/components/BaseCardRoom.vue'
	import PopupPassword from '@/components/PopupPassword.vue'
	import ChatSidenavCreateRoom from '@/components/ChatSidenavCreateRoom.vue'

	const showPopupPassword = ref(false);
	const errorPopupPassword = ref('');
	const popupData = ref(null);
	const roomNameImTryingToEnter = ref('');

	const props = defineProps({
		groupRooms: 
		{
			type: Array,
			required: true
		}
	})

	const socket = computed(() => 
	{
		return store.getters.getSocketChat;
	})

	const currentUser = computed(() => 
	{
		return store.getters.getCurrentUser
	})

	const filterGroups = computed(() => 
	{
		if (props.groupRooms) 
		{
			return props.groupRooms.filter(room => 
			{
				return !(room.chatUser.some(user => user.username === currentUser.value.username))
			})
		}
	})

	const filterMyRooms = computed(() => 
	{
		return currentUser.value.chatRoom.filter(room => 
		{
			return room.access !== 'private';
		})
	})

	const showPopup = (roomName) => 
	{
		popupData.value = { info: 'Enter Room Passord!' }
		roomNameImTryingToEnter.value = roomName;
		showPopupPassword.value = true;
	}

	const hidePopup = () => 
	{
		showPopupPassword.value = false;
		roomNameImTryingToEnter.value = '';
		popupData.value = null;
		errorPopupPassword.value = '';
	}

	const validateRoomAccess = (roomName, password) => 
	{
		socket.value.emit('validateRoomAccess', {roomName, password}, (error) => 
		{
			if (error) 
			{
				errorPopupPassword.value = 'Wrong Password!'
			}
			else 
			{
				joinRoom(roomName);
				hidePopup();
			}
		})
	}

	const joinRoom = (roomName) => 
	{
		socket.value.emit('joinRoom', roomName);
	}

	const enterRoom = (roomName) => 
	{
		socket.value.emit('enterRoom', roomName);
	}
</script>

<style scoped>
	button 
	{
		padding: 10px;
		background-color: var(--blue-light);
		border: 1px solid black;
		border-radius: 5px;
		color: white;
	}

	.groups 
	{
		display: flex;
		flex-direction: column;
	}

	.room 
	{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 16px;
		border-bottom: 1px solid black;
		color: black;
	}
</style>