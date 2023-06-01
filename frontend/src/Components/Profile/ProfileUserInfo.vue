<template>
	<!-- This is a component called "ProfileInfo" that displays basic information about a user's profile. -->
	<!-- It includes the user's username, an image, their number of wins and losses displayed as boxes, and their current status.  -->
	<!-- The component uses the "BaseBoxNumberWithTitle" component to render the boxes for wins and losses. -->
	<!-- The image source is determined by the "imageLink" computed property. -->

	<div class="profile-info">
		<h2 class="info__title">Profile</h2>
		<h2 class="info__username">{{user.username}}</h2>
		<img class="info__image" :src="imageLink">
		<BaseBoxNumberWithTitle id="box1" v-if="user" :title="'Wins'" :number="user.wins"/>
		<BaseBoxNumberWithTitle id="box2" v-if="user" :title="'Loses'" :number="user.loses"/>
		<h3 class="info__status">{{userStatus}}</h3>
	</div>
</template>

<style scoped>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.profile-info 
	{
		display: grid;
		grid-template-areas:
			'title title'
			'name name'
			'image image'
			'wins loses'
			'status status';
		gap: 5px;
	}

	.info .info__title 
	{
		grid-area: title;
		margin: 0 0 30px 0;
		color: var(--blue-dark);
		letter-spacing: 2px;
		margin: 0 0 30px 0;
	}

	.info .info__username 
	{
		grid-area: name;
		border: 3px solid var(--blue-dark);
		background-color: var(--blue-dark);
		color: white;
		padding: 10px 0;
		width: 100%;
	}

	.info .info__image 
	{
		grid-area: image;
		border: 3px solid var(--blue-dark);
		width: 100%;
	}

	.info #box1 
	{
		grid-area: wins;
		box-sizing: border-box;
		border: 3px solid var(--blue-dark);
		align-self: stretch;
		justify-self: stretch;
	}

	.info #box2 
	{
		grid-area: loses;
		box-sizing: border-box;
		border: 3px solid var(--blue-dark);
		align-self: stretch;
		justify-self: stretch;
	}

	.info .info__status 
	{
		grid-area: status;
		border: 3px solid var(--blue-dark);
		background-color: var(--blue-dark);
		color: white;
		letter-spacing: 2px;
		width: 100%;
		padding: 10px 0;
	}
</style>

<script>
// This is a component called "ProfileUserInfo" that displays user-specific information within a profile. 
// It imports and utilises the "BaseBoxNumberWithTitle" component to render boxes with titles and numbers.
// The component receives a user object as a prop, which contains information such as the user's avatar, profile picture URL, status, wins, and losses. 
// The computed properties "imageLink" and "userStatus" are used to determine the image source and status text based on the user's data.

	import BaseBoxNumberWithTitle from '@/Components/BaseBoxNumberWithTitle.vue'

	export default {
		name: 'ProfileUserInfo',

		components: 
		{
			BaseBoxNumberWithTitle,
		},

		props: 
		{
			user: 
			{
				type: Object,
				required: true
			}
		},

		computed: 
		{
			imageLink() 
			{
				if (this.user.avatarId === 1 && this.user.profilePictureURL)
					return this.user.profilePictureURL;
				else
					return `${process.env.VUE_APP_HOST_URL}:3000/database-files/${this.user.avatarId}`;
			},

			userStatus() 
			{
				switch(this.user.status) 
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
			}
		},
	}
</script>