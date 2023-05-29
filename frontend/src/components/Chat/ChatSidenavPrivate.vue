<template>
	<div class="private">
		<h3>Private Chats</h3>
		<div class="room" v-for="user in currentUser.friends" :key="user">
			<BaseCardUser
				:allowPrivatePageOnClick="false"
				@click="enterPrivateRoom(user.id)"
				:data="user"
			/>
		</div>
	</div>
</template>

<script setup>
	import { computed, onBeforeMount, ref } from'vue';
	import  store  from '@/store/index.js';
	import BaseCardUser from '@/components/BaseCardUser.vue'


	/* COMPUTED */
	const currentUser = computed(() => {
		return store.getters.getCurrentUser
	})

	const socket = computed(() => {
		return store.getters.getSocketChat;
	})
	/* COMPUTED */


	/* SOCKET ACTIONS */
	const enterPrivateRoom = (receiverId) => {
		socket.value.emit('enterPrivateRoom', receiverId);
	}
	/* SOCKET ACTIONS */
</script>

<style scoped>
	.private {
		display: flex;
		flex-direction: column;
	}

	.room {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 16px;
		border-bottom: 1px solid black;
		color: black;
	}
</style>