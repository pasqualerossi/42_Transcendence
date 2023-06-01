<template>
<!-- This is for an invite box component that shows a game invitation from a sender. -->
<!-- It includes buttons to accept or decline the invitation. -->

	<div class="invite-box" v-if="invitesAllowed">
		<strong>Received Game invitation from: {{senderName}}</strong>
		<div class="buttons">
			<button @click="acceptGameInvite">Accept</button>
			<button @click="hideAlert">Decline</button>
		</div>
	</div>
</template>

<style scoped>
	.invite-box 
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 50px;

		border: 3px solid var(--blue-dark);
		background-color: var(--grey);
		color: var(--blue--dark);
		transition: 0.5s;
		font-size: 20px;

		position: sticky;
		bottom: 10px;
		left: 0;
		right: 0;

		margin: 10px;
	}

	.invite-box .buttons 
	{
		display: flex;
		flex-direction: row;
		gap: 12px;
		justify-content: center;
		align-items: center;
	}

	button 
	{	
		width: 150px;
		height: 40px;
		background-color: var(--blue-light);
		border: 2px solid black;
		color: white;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
	}
</style>

<script>
// This is for displaying and handling game invitations.
// It shows an alert box with the sender's information, allows accepting or declining the invitation, and automatically hides after a specified duration.

import store from '@/Store/index.js'

export default {
	name: 'TheGameInviteBox',

	data() 
	{
		return {
			timeoutId: 0,
		}
	},

	computed: 
	{
		currentRoute() 
		{
			return this.$route.name;
		},

		invitesAllowed() 
		{
			if (this.currentRoute === '2falogin' || this.currentRoute === 'login' || this.currentRoute === 'gameroom')
				return false;
			return true;
		}
	},

	props: 
	{
		showDuration: 
		{
			type: Number,
			default: 2000
		},
		senderId: 
		{
			type: Number,
			required: true
		},
		senderName: 
		{
			type: String,
			required: true
		}
	},

	methods: 
	{
		hideAlert() 
		{
			clearTimeout(this.timeoutId);
			this.$emit('hideAlert');
		},

		acceptGameInvite() 
		{
			store.getters.getSocketGame.emit('acceptGameInvite', this.senderId)
			this.hideAlert();
		},
	},

	unmounted() 
	{
		clearTimeout(this.timeoutId);
	},

	mounted() 
	{
		this.timeoutId = setTimeout(() => 
		{
			this.$emit('hideAlert')
		}, this.showDuration);
	}
}
</script>