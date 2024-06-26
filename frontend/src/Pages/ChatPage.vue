<template>
	<!-- The template defines the structure of the chat interface using a grid layout. -->

	<div class="grid-container" v-if="currentUser && socket">
		<ChatHeader class="header" v-if="currentRoom" :currentRoom="currentRoom"/>
		<ChatSideNav class="sidenav" :groupRooms="groupRooms"/>
		<ChatMain class="main" v-if="currentRoom" :currentRoom="currentRoom"/>
		<PopupInformation v-if="popupData" @confirmed="hidePopup" :visible="showInformationPopup" :title="popupData.title" :info="popupData.info"/>
		<ChatFooter class="footer" v-if="currentRoom" :roomName="currentRoom.name" :userId="currentUser.id"/>
	</div>
</template>

<style scoped>
	* {
		box-sizing: border-box;
	}

	.grid-container 
	{
		display: grid;
		grid-template-rows: 100px 10fr 100px;
		grid-template-columns: 280px 1fr;
		grid-template-areas:
			"sidenav header"
			"sidenav main"
			"sidenav footer";
		grid-gap: 0;
		overflow: hidden;
		max-height: calc(100vh - var(--nav-bar-height));
	}

	.header 
	{
		grid-area: header;
		background-color: var(--grey);
		color: var(--bue-dark);
	}

	.sidenav
	{
		grid-area: sidenav;
		background-color: #ffffff;
		overflow-y: auto;
		border-right: 1px solid black;
	}

	.main 
	{
		grid-area: main;
		background-color: var(--grey);
		color: white;
		border-top: 1px solid black;
		border-bottom: 1px solid black;
		overflow-y: hidden;
	}

	.footer 
	{
		grid-area: footer;
		background-color: var(--grey);
		color: white;
	}	
</style>

<script setup>
	// This handles the functionality of the chat interface.
	// It imports dependencies and defines variables and methods using Vue Composition API.
	// It interacts with the Vuex store to retrieve the current user and chat socket.
	// It also sets up event listeners for socket communication and performs actions based on received events.

	import { computed, onBeforeMount, ref, onUnmounted } from 'vue'
	import store from '@/Store/index.js';
	import { useRouter } from 'vue-router';

	import PopupInformation from '../Components/Popup/PopupInformation.vue'
	import ChatFooter from '@/Components/Chat/ChatFooter.vue'
	import ChatHeader from '@/Components/Chat/ChatHeader.vue'
	import ChatSideNav from '@/Components/Chat/ChatSideNav.vue'
	import ChatMain from '@/Components/Chat/ChatMain.vue'
	
	const router = useRouter()
	const currentRoom = ref(null);
	const groupRooms = ref([]);
	const showInformationPopup = ref(false);
	const popupData = ref(null);

	const currentUser = computed(() => 
	{
		return store.getters.getCurrentUser;
	})

	const socket = computed(() => 
	{
		return store.getters.getSocketChat;
	})

	// This ensures that the socket event listeners are removed to prevent memory leaks.

	onUnmounted(() => 
	{
		if (socket.value) 
		{
			socket.value.off();
		}
	})

	// This fetches the current user data and redirects to the home page if the user is not logged in.
	// It also sets up socket event listeners for refreshing the current room, refreshing the list of rooms, and handling bans, mutes, and blocks.

	onBeforeMount(async () => 
	{
		await store.dispatch('fetchCurrentUser');

		if (!currentUser.value) 
		{
			router.push('/');
			return ;
		}

		getGroupRooms();

		socket.value.on('refreshCurrentRoom', (roomName) => 
		{
			if (currentRoom.value && currentRoom.value.name === roomName) 
			{
				getCurrentRoom(roomName);
				scrollToLastMessage();
			}
		})

		socket.value.on('refreshRooms', () => 
		{
			getGroupRooms();
		})

		socket.value.on('refreshUser', () => 
		{
			store.dispatch('fetchCurrentUser');
		})

		socket.value.on('setCurrentRoom', (roomName) => 
		{
			getCurrentRoom(roomName);
		})

		socket.value.on('resetCurrentRoom', (deletedRoom) => 
		{
			if (currentRoom.value && deletedRoom === currentRoom.value.name) 
			{
				currentRoom.value = null;
			}
		})

		socket.value.on('banned', (roomName) => 
		{
			showPopup
			({
				title: 'Banned',
				info: `You have been banned from ${roomName}`,
			})
			currentRoom.value = null;
			getGroupRooms();
			store.dispatch('fetchCurrentUser');
		})

		socket.value.on('muted', (roomName) => 
		{
			showPopup
			({
				title: 'Muted',
				info: `You are muted in ${roomName}`,
			})
			store.dispatch('fetchCurrentUser');
		})

		socket.value.on('blocked', () => 
		{
			showPopup
			({
				title: 'Blocked',
				info: `You have been blocked`,
			})
			store.dispatch('fetchCurrentUser');
		})
	});

	const hidePopup = () => 
	{
		popupData.value = null;
		showInformationPopup.value = false;
	}

	const showPopup = (data) => 
	{
		popupData.value = data;
		showInformationPopup.value = true;
	}

	const scrollToLastMessage = () => 
	{
		const el = document.getElementById('chat-feed');
		if (el) 
		{
			setTimeout(() => 
			{
				el.scrollTop = el.scrollHeight;
			}, 50);
		}
	}

	const getCurrentRoom = (roomName) => 
	{
		socket.value.emit('findRoomByName', roomName, (response) => 
		{
			currentRoom.value = response;
		})
	}

	const getGroupRooms = () => 
	{
		socket.value.emit('findGroupRooms', (response) => 
		{
			groupRooms.value = response;
		})
	}
</script>