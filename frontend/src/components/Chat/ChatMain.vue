<template>
	<main class="main">
		<div class="main__messages" id="chat-feed">
			<div class="message"  v-for="message in currentRoom.messages" :key="message" :class="{ blue_text: message.fromName === 'ChatBot', align_right: message.fromName === currentUser.username }">
				<div class="message__name">[{{message.fromName}}]</div>
				<div class="text">{{message.text}}</div>
			</div>
		</div>
		<div class="main__users" v-if="currentRoom && currentUser">
			<div class="main__members">
				<div class="member" v-for="member in currentRoom.chatUser" :key="member">
					<BaseCardUser :data="member"/>
					<DropdownChatAdmin
						v-if="adminButtonConditions(member.username)"
						:unBanButton="false"
						@makeAdmin="makeAdmin(member.id)"
						@banUser="banUser(member.id)"
						@muteUser="showMutePopup(member.id)"
					/>
				</div>
			</div>
			<h3 v-if="currentRoom.access !== 'private'" style="color: var(--blue-dark)">Banned Users</h3>
			<div v-if="currentRoom.access !== 'private'" class="main__banned">
				<div class="member" v-for="member in currentRoom.bannedUsers" :key="member">
					<BaseCardUser :data="member"/>
					<DropdownChatAdmin
						v-if="adminButtonConditions(member.username)"
						:adminButton="false"
						:muteButton="false"
						:banButton="false"
						@unBanUser="unbanUser(member.id)"
					/>
				</div>
			</div>
			<button
				v-if="currentRoom.access === 'private'"
				style="margin-top: 20px;"
				@click="sendGameInvite">
				Send Game Invite
			</button>
		</div>
		<PopupNumber
			:visible="showPopupNumber"
			:info="'Time to mute in minutes'"
			:confirmButtonText="'Mute'"
			@confirmed="muteUser(userIdImTryingToMute, $event)"
			@canceled="hidePopup"
		/>
	</main>
</template>

<script setup>
	import store from '@/store/index.js';
	import { computed, ref, onMounted } from 'vue'
	import BaseCardUser from '@/components/BaseCardUser'
	import PopupNumber from '@/components/PopupNumber'
	import DropdownChatAdmin from '@/components/DropdownChatAdmin'

	const userIdImTryingToMute = ref(0);
	const showPopupNumber = ref(false);

	/* PROPS */
	const props = defineProps({
		currentRoom: {
			type: Object,
			required: true
		},
	})
	/* PROPS */

	onMounted(() => {
		const el = document.getElementById('chat-feed');
		if (el) {
			el.scrollTop = el.scrollHeight;
		}
	})


	/* COMPUTED */
	const currentUser = computed(() => {
		return store.getters.getCurrentUser
	})

	const socket = computed(() => {
		return store.getters.getSocketChat;
	})
	/* COMPUTED */


	/* FUNCTIONS */
	const isAdmin = (room, username) => {
		const filtered = room.admins.filter((e) => {
			return e.username === username;
		})
		return filtered.length > 0;
	}

	const adminButtonConditions = (userName) => {
		if (!isAdmin(props.currentRoom, currentUser.value.username))
			return false;
		if (isAdmin(props.currentRoom, userName))
			return false;
		return true;
	}

	const showMutePopup = (userId) => {
		userIdImTryingToMute.value = userId;
		showPopupNumber.value = true;
	}

	const hidePopup = () => {
		userIdImTryingToMute.value = 0;
		showPopupNumber.value = false;
	}

	const getOtherUserInPrivateRoom = () => {
		const user = props.currentRoom.chatUser.filter(
			user => user.id !== currentUser.value.id
		)
		if (user.length !== 1)
			return undefined
		return user[0].id
	}
	/* FUNCTIONS */


	/* SOCKET ACTIONS */
	const sendGameInvite = () => {
		const receiverId = getOtherUserInPrivateRoom();
		if (!receiverId)
			return ;
		store.getters.getSocketGame.emit('sendGameInvitation', receiverId)
	}

	const banUser = (userId) => {
		socket.value.emit('banUser', {
			banUserId: userId,
			roomName: props.currentRoom.name
		})
	}

	const muteUser = (newMutedId, muteTimeInMin) => {
		socket.value.emit('muteUser', {
			newMutedId,
			roomName: props.currentRoom.name,
			muteTimeInMinutes: muteTimeInMin
		})
		hidePopup();
	}

	const unbanUser = (userId) => {
		socket.value.emit('unbanUser', {
			banUserId: userId,
			roomName: props.currentRoom.name
		})
	}

	const makeAdmin = (userId) => {
		socket.value.emit('makeAdmin', {
			newAdminId: userId,
			roomName: props.currentRoom.name
		})
	}
	/* SOCKET ACTIONS */
</script>

<style scoped>
	button {
		padding: 10px;
		background-color: var(--blue-light);
		border: 1px solid black;
		border-radius: 5px;
		color: white;
		cursor: pointer;
	}

	.main {
		display: flex;
	}

	.main__messages {
		overflow-y: auto;
		flex: 1;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.main__users {
		overflow-y: auto;
		height: 100%;
		margin-left: auto;
		border-left: 1px solid black;
	}

	.member {
		padding: 16px;
		border-bottom: 1px solid black;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.message {
		margin: 0 auto 0 0;
		padding: 16px 20px;
		color: black;
		border: 1px solid black;
		background-color: white;
		text-align: left;
		width: fit-content;
		border-radius: 25px;
	}

	.message__name {
		font-weight: 700;
	}

	.blue_text {
		color: var(--blue-light);
	}

	.align_right {
		text-align: right;
		margin: 0 0 0 auto;
	}
</style>