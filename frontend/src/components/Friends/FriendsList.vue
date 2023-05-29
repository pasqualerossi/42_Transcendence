<template>
	<div class="xxx">
		<h3>My Friends</h3>
		<div v-for="friend in orderedFriendsList" :key="friend">
			<BaseCardUser class="user-card" :data="friend"/>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'

import store from '@/store/index.js';
import BaseCardUser from './BaseCardUser.vue'

export default {
	name: 'FriendsList',

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
		filteredUsers () 
		{
			let filter = new RegExp(this.filterText, 'i');

			if (this.usersData.otherUsers)
				return this.usersData.otherUsers.filter(el => el.username.match(filter));
		},

		currentUser() 
		{
			return store.getters.getCurrentUser;
		},

		orderedFriendsList() 
		{
			if (this.currentUser)
				return _.orderBy(this.currentUser.friends, 'username')
		},
	},

	created() 
	{
		store.dispatch('fetchCurrentUser');
	}
}
</script>

<style scoped>
	.xxx 
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