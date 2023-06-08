<template>
<!-- This is for an invite component that displays a list of available users and allows sending game invitations. -->

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

<style scoped>
	.invite 
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	button 
	{
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

<script setup>
// This is a script that interacts with the Vuex store and socket connection to handle the logic and functionality to invite people to a game of Pong.

	import { onBeforeMount, ref, computed, onMounted } from 'vue'

	import BaseCardUser from '@/Components/BaseCardUser.vue'
	import store from '@/Store/index.js'

	const availableUsers = ref([]);

	const socket = computed(() => 
	{
		return store.getters.getSocketGame;
	})

	const showAvailableUsers = () => 
	{
		socket.value.emit('showAvailableUsers', (users) => 
		{
			availableUsers.value = users;
		})
	}

	const sendGameInvitation = (userId) => 
	{
		socket.value.emit('sendGameInvitation', userId)
	}

	onMounted(() => 
	{
		showAvailableUsers();
	})
</script>