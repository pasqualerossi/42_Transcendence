<template>
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
	import store from '@/store/index.js';
	import DropdownChatHeader from '@/components/DropdownChatHeader.vue';
	import PopupPassword from '@/components/PopupPassword.vue';
	import PopupChoice from '@/components/PopupChoice.vue';
	import { computed, ref } from 'vue';

	const dropdownTitle = 'Menu';
	const dropdownOptions = [
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
	

	/* PROPS */
	const props = defineProps({
		currentRoom: {
			type: Object,
			required: true,
		},
	})
	/* PROPS */


	/* COMPUTED */
	const currentUser = computed(() => {
		return store.getters.getCurrentUser
	})

	const filteredOptions = computed(() => {
		if (isAdmin(props.currentRoom, currentUser.value.username))
			return dropdownOptions;
		return dropdownOptions.filter(e => {
			return e.onlyAdmin === false;
		});
	})

	const socket = computed(() => {
		return store.getters.getSocketChat;
	})

	const otherUserName = computed(() => {
		const user =  props.currentRoom.chatUser.find(user => user.id !== currentUser.value.id);
		if (!user)
			return ;
		return user.username;
	})
	/* COMPUTED */


	/* FUNCTIONS */
	const isAdmin = (room, username) => {
		const filtered = room.admins.filter((e) => {
			return e.username === username;
		})
		return filtered.length > 0;
	}

	const showPopup = (data, type) => {
		switch(type) {
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

	const hidePopup = () => {
		showPopupChoice.value = false;
		showPopupPassword.value = false;
		popupData.value = null;
		errorPopupPassword.value = '';
	}

	const confirmedPopupChoice = (actionName) => {
		switch(actionName) {
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

	const dropdownAction = (actionName) => {
		switch(actionName) {
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
	/* FUNCTIONS */


	/* SOCKET ACTIONS */
	const leaveRoom = (roomName) => {
		socket.value.emit('leaveRoom', roomName);
	}

	const deleteRoom = (roomName) => {
		socket.value.emit('deleteRoom', roomName);
	}

	const setRoomPublic = (roomName) => {
		socket.value.emit('setRoomPublic', roomName);
	}

	const setRoomProtected = (roomName, password) => {
		socket.value.emit('setRoomProtected', {roomName, password});
		hidePopup();
	}
	/* SOCKET ACTIONS */
</script>

<style scoped>
	.header {
		padding: 0 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header strong {
		font-size: 20px;
	}
</style>