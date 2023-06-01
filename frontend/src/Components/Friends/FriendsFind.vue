<template>
	<!-- This template represents a component for finding friends. -->
	<!-- It includes a search input field and displays user cards based on the search results. -->

	<div class="friends">
		<h3>Find Friends</h3>
		<input v-model="filterText" placeholder="search user">
		<div v-if="filteredUsers">
			<div v-for="user in orderedFilteredUsers" :key="user">
				<BaseCardUser class="user-card" :data="user"/>
			</div>
		</div>
	</div>
</template>

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

	input 
	{
		width: 200px;
		margin-bottom: 20px;
		color: var(--blue-dark);
		outline: none;
		background-color: var(--grey);
		height: 30px;
		padding: 0 10px;
		border: 2px solid var(--blue-dark);
		font-size: 14px;
		border-radius: 25px;
	}

	.user-card 
	{
		margin: 10px 0;
	}
</style>

<script>
// This script is a component that handles the functionality of finding friends.
// It manages data, filters and sorts users based on search criteria, and interacts with the application's store to fetch the current user's data.

import _ from 'lodash'
import store from '@/Store/index.js';
import BaseCardUser from '@/Components/BaseCardUser.vue'

export default {
	name: 'FriendsFind',

	data() 
	{
		return {
			filterText: '',
		}
	},

	components: 
	{
		BaseCardUser,
	},

	props: 
	{
		usersData: 
		{
			required: true
		},
	},

	computed: 
	{
		filteredUsers () 
		{
			let filter = new RegExp(this.filterText, 'i');

			if (this.usersData.otherUsers)
				return this.usersData.otherUsers.filter(el => el.username.match(filter));
		},

		orderedFilteredUsers() 
		{
			return _.orderBy(this.filteredUsers, 'username')
		},

		currentUser() 
		{
			return store.getters.getCurrentUser;
		}
	},

	created() 
	{
		store.dispatch('fetchCurrentUser');
	}
}
</script>