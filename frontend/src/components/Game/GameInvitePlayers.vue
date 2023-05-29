<template>
	<div class="invite">
		<h2>Send Invites</h2>
		<button @click="showAvailableUsers">Refresh Users</button>
		<div class="available-users" v-for="user in availableUsers" :key="user">
			<BaseCardUser
				:data="user"
				:allowPrivatePageOnClick="false"
				@click="sendGameInvitation(user.id)"
			/>
		</div>
	</div>
</template>

<script setup>
	import BaseCardUser from '@/components/BaseCardUser.vue'
	import { onBeforeMount, ref, computed, onMounted } from 'vue'
	import store from '@/store/index.js'

	const availableUsers = ref([]);

	const socket = computed(() => {
		return store.getters.getSocketGame;
	})

	const showAvailableUsers = () => {
		socket.value.emit('showAvailableUsers', (users) => {
			availableUsers.value = users;
		})
	}

	const sendGameInvitation = (userId) => {
		socket.value.emit('sendGameInvitation', userId)
	}

	onMounted(() => {
		showAvailableUsers();
	})
</script>

<style scoped>
	.invite {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	button {
		width: 150px;
		height: 40px;
		background-color: var(--orange);
		border: 2px solid black;
		color: black;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: bold;
		cursor: pointer;
	}
</style>