<template>
<!-- This template represents the display of private chats in the chat interface. -->
<!-- It shows a list of users who are friends with the current user and allows them to enter private chat rooms by clicking on a user's card. -->
<!-- It uses the BaseCardUser component to render user cards. -->
<!-- Handles the enterPrivateRoom method to initiate entry into a private chat room associated with a specific user. -->

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

<style scoped>
	.private 
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

<script setup>
// This script sets up a component that connects to a store and handles socket communication for entering a private chat room.

	import { computed, onBeforeMount, ref } from'vue';
	
	import  store  from '@/Store/index.js';
	import BaseCardUser from '@/Components/BaseCardUser.vue'

	const currentUser = computed(() => 
	{
		return store.getters.getCurrentUser
	})

	const socket = computed(() => 
	{
		return store.getters.getSocketChat;
	})

	const enterPrivateRoom = (receiverId) => 
	{
		socket.value.emit('enterPrivateRoom', receiverId);
	}
</script>