<template>
	<div class="change-status-wrapper">
		<h2>Change User Status</h2>
		<div>Current Status:</div>
		<strong>{{userStatus}}</strong>
		<div class="status">
			<button @click="setUserStatus(0)">Offline</button>
			<button @click="setUserStatus(1)">Online</button>
			<button @click="setUserStatus(3)">Do not Disturb</button>
		</div>
	</div>
</template>

<script>
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