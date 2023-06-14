<template>
	<!-- A component called "ProfileMatchHistory" that displays the match history of a user's profile. -->
	<!-- It includes a title "Match History" and a list of "score" elements. Each score element represents a match and uses the "BaseCardMatchHistory" component to display detailed information about the game.  -->
	<!-- The component iterates over the "limitedMatchHistory" array and binds each match to the component. -->
	<!-- It also passes the current user's ID to the "BaseCardMatchHistory" component for reference. -->

	<div class="profile-match-history">
		<h2>Match History</h2>
		<div class="score" v-for="match in limitedMatchHistory" :key="match">
			<BaseCardMatchHistory :gameInfo="match" :currentUserId="user.id"/>
		</div>
	</div>
</template>

<style scoped>
	h2 
	{
		color: var(--blue-dark);
		letter-spacing: 2px;
		margin: 0 0 30px 0;
	}
</style>

<script>
// This is a component called "ProfileMatchHistory" that fetches and displays the match history of a user's profile.
// It uses the "BaseCardMatchHistory" component to render individual match cards.
// The match history is fetched from an API endpoint using Axios, and the limited match history is stored in the component's data.
// The "fetchHistory" method is responsible for fetching the match history and is called when the component is mounted.

	import axios from 'axios'
	import BaseCardMatchHistory from '@/Components/BaseCardMatchHistory.vue'

	export default {
		name: 'ProfileMatchHistory',

		components: 
		{
			BaseCardMatchHistory
		},

		data() 
		{
			return {
				limitedMatchHistory: []
			}
		},

		props: 
		{
			user: 
			{
				type: Object,
				required: true
			}
		},

		methods: 
		{
			// Retrieves the match history for a user by making a GET request to the server using axios. 
			// It uses the user.id property and a limit of 10 matches. 
			// The request is made with the withCredentials option set to true. 
			// Upon receiving a response, the method returns the data from the response. 
			// If an error occurs, the error message is logged to the console.
			async fetchHistory() 
			{
				this.limitedMatchHistory = await axios.get(`${process.env.VUE_APP_HOST_URL}:3000/score/matchHistory/${this.user.id}/${10}`, {withCredentials: true})
				.then(async (response) => 
				{
					return await response.data;
				})
				.catch((error) => 
				{
					console.log('Error: ' + error.response.data.message)
				})
			}
		},

		// Retrieve the Match History.
		mounted() 
		{
			this.fetchHistory();
		}
	}
</script>