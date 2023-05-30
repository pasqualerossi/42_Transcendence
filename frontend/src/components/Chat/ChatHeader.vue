<template>

<!-- This is a header component in a chat application. -->
<!-- It displays the current room's name or the name of the other user in a private chat. -->
<!-- It also includes dropdown menus and pop-up windows for performing actions related to the chat room, such as password protection or making choices. -->

	<header class="header">
		<strong v-if="currentRoom.access !== 'private'">{{currentRoom.name}}</strong>
		<strong v-if="currentRoom.access === 'private'">{{otherUserName}}</strong>
		<DropdownChatHeader
			v-if="currentRoom.access !== 'private'"
			@selected="dropdownAction($event)"
			:title="dropdownTitle"
			:options="filteredOptions"
		/>

		<PopupPassword
			v-if="popupData"
			:info="popupData.info"
			:visible="showPopupPassword"
			:errorMessage="errorPopupPassword"
			@confirmed="setRoomProtected(currentRoom.name, $event)"
			@canceled="hidePopup"
		/>

		<PopupChoice
			v-if="popupData"
			:title="popupData.title"
			:info="popupData.info"
			:visible="showPopupChoice"
			@confirmed="confirmedPopupChoice($event)"
			@canceled="hidePopup"
		/>
	</header>
</template>

<script setup>

// This is a script section of a component in a chat application.
// It defines the behavior and functionality of the header component.
// It imports other components such as DropdownChatHeader, PopupPassword, and PopupChoice for dropdown menus and pop-up windows. 
// It also includes computed properties, methods, and variables to handle various actions such as leaving a room, deleting a room, setting room password, and handling user permissions. 
// The script sets up event listeners and emits events to communicate with the parent component and other components.

	import store from '@/store/index.js';
	import DropdownChatHeader from '@/components/DropdownChatHeader.vue';
	import PopupPassword from '@/components/PopupPassword.vue';
	import PopupChoice from '@/components/PopupChoice.vue';
	import { computed, ref } from 'vue';

	const dropdownTitle = 'Menu';
	const dropdownOptions = 
	[
		{
			title: 'Leave',
			onlyAdmin: false
		},
		{
			title: 'Delete',
			onlyAdmin: true
		},
		{
			title: 'Password',
			onlyAdmin: true
		},
		{
			title: 'Public',
			onlyAdmin: true
		}
	];

	const popupData = ref(null);
	const showPopupPassword = ref(false);
	const showPopupChoice = ref(false);
	const errorPopupPassword = ref('');
	
	const props = defineProps({
		currentRoom: 
		{
			type: Object,
			required: true,
		},
	})

	const currentUser = computed(() => 
	{
		return store.getters.getCurrentUser
	})

	const filteredOptions = computed(() => 
	{
		if (isAdmin(props.currentRoom, currentUser.value.username))
			return dropdownOptions;
		return dropdownOptions.filter(e => 
		{
			return e.onlyAdmin === false;
		});
	})

	const socket = computed(() => 
	{
		return store.getters.getSocketChat;
	})

	const otherUserName = computed(() => 
	{
		const user =  props.currentRoom.chatUser.find(user => user.id !== currentUser.value.id);
		if (!user)
			return ;
		return user.username;
	})

	const isAdmin = (room, username) => 
	{
		const filtered = room.admins.filter((e) => 
		{
			return e.username === username;
		})
		return filtered.length > 0;
	}

	const showPopup = (data, type) => 
	{
		switch(type) 
		{
			case 'Password':
				popupData.value = data;
				showPopupPassword.value = true;
				break ;
			case 'Choice':
				popupData.value = data;
				showPopupChoice.value = true;
				break ;
		}
	}

	const hidePopup = () => 
	{
		showPopupChoice.value = false;
		showPopupPassword.value = false;
		popupData.value = null;
		errorPopupPassword.value = '';
	}

	const confirmedPopupChoice = (actionName) => 
	{
		switch(actionName) 
		{
			case 'Leave':
				leaveRoom(props.currentRoom.name);
				break ;
			case 'Delete':
				deleteRoom(props.currentRoom.name);
				break ;
			case 'Public':
				setRoomPublic(props.currentRoom.name);
				break ;
		}
		hidePopup();
	}

	const dropdownAction = (actionName) => 
	{
		switch(actionName) 
		{
			case 'Leave':
				showPopup({ title: 'Leave', info: 'Leave Room?' }, 'Choice');
				break ;
			case 'Delete':
				showPopup({ title: 'Delete', info: 'Delete Room?' }, 'Choice');
				break ;
			case 'Password':
				showPopup({ title: 'Password', info: 'Set Room Password!' }, 'Password');
				break ;
			case 'Public':
				showPopup({ title: 'Public', info: 'Remove Room Password?' }, 'Choice');
				break ;
		}
	}

	const leaveRoom = (roomName) => 
	{
		socket.value.emit('leaveRoom', roomName);
	}

	const deleteRoom = (roomName) => 
	{
		socket.value.emit('deleteRoom', roomName);
	}

	const setRoomPublic = (roomName) => 
	{
		socket.value.emit('setRoomPublic', roomName);
	}

	const setRoomProtected = (roomName, password) => 
	{
		socket.value.emit('setRoomProtected', {roomName, password});
		hidePopup();
	}
</script>

<style scoped>
	.header 
	{
		padding: 0 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header strong 
	{
		font-size: 20px;
	}
</style>