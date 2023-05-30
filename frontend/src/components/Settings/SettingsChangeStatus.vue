<template>

	<!-- A component that allows the user to change their status. -->
	<!-- This displays the current status of the user and provides buttons to set different status options such as "Offline," "Online," and "Do Not Disturb."  -->
	<!-- When a button is clicked, it triggers a method to update the user's status accordingly. -->

	<div class="change-status-wrapper">
		<h2>Change User Status</h2>
		<div>Current Status:</div>
		<strong>{{userStatus}}</strong>
		<div class="status">
			<button @click="setUserStatus(0)">Offline</button>
			<button @click="setUserStatus(1)">Online</button>
			<button @click="setUserStatus(3)">Do Not Disturb</button>
		</div>
	</div>
</template>

<script>

// This is a component that handles the functionality to change the user's status. 
// It receives the current user object as a prop and displays the user's current status.
// It provides buttons for different status options such as "Offline," "Online," and "Do not Disturb."
// When a button is clicked, it triggers a method to update the user's status by dispatching an action to the store. 
// The computed property 'userStatus()' converts the numerical status value to a descriptive string for display purposes.

import store from '@/store/index.js'

export default {
	name: 'SettingsChangeStatus',

	props: 
	{
		currentUser: 
		{
			type: Object,
			required: true
		}
	},

	computed: 
	{
		userStatus() 
		{
			switch(this.currentUser.status) 
			{
				case (0):
					return 'offline'
				case (1):
					return 'online'
				case (2):
					return 'in game'
				case (3):
					return 'do not disturb'
			}
		},
	},

	methods: 
	{
		async setUserStatus(status) 
		{
			await store.dispatch('setUserStatus', status)
		}
	},
}
</script>

<style scoped>
	.change-status-wrapper 
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 14px;
		align-items: center;
		background-color: var(--grey);
		border: 5px solid var(--blue-dark);
		padding: 50px;
	}

	h2 
	{
		color: var(--blue-dark);
		letter-spacing: 2px;
	}

	.status 
	{
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
		justify-content: center;
	}

	.status button 
	{
		width: 150px;
		height: 30px;
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

	.status button:hover 
	{
		background-color:  var(--blue-light);
		color: white;
	}
</style>