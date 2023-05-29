<template>
	<div class="friends">
		<h3>Friend Requests</h3>
		<div v-for="user in orderedRequestsList" :key="user">
			<BaseCardUser class="user-card" :data="user"/>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'

import store from '@/store/index.js';
import BaseCardUser from '@/components/BaseCardUser.vue'


export default {
	name: 'FriendsRequest',

	props: 
	{
		usersData: 
		{
			required: true
		}
	},

	components: 
	{
		BaseCardUser,
	},

	computed: 
	{
		orderedRequestsList() 
		{
			if (this.currentUser)
				return _.orderBy(this.currentUser.receivedFriendRequests, 'username')
		},

		currentUser() 
		{
			return store.getters.getCurrentUser;
		},
	},

	created() 
	{
		store.dispatch('fetchCurrentUser');
	}
}
</script>

<style scoped>
	.friends 
	{
		background-color: var(--blue-light);
		border: 5px solid var(--blue-dark);
		color: var(--grey);
		border-radius: 60px;
		margin: 30px 0 0 0;
		padding-bottom: 50px;
	}

	h3 
	{
		color: white;
		letter-spacing: 2px;
		margin-top: 50px;
	}

	.user-card 
	{
		margin: 10px 0;
	}
</style>