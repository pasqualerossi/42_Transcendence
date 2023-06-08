<template>
	<!-- This represents a scoreboard component that displays the top 10 players based on their wins. -->
	<!-- It includes a table with columns for rank, player, and wins. -->
	<!-- Each row represents a player with their corresponding rank, name, and number of wins. -->
	<!-- The component also handles error messages and displays them if necessary. -->
	<!-- The user's own score is highlighted in a different style. -->
	<!-- The data for each player is passed to the BaseCardUser component for rendering user-specific information. -->

	<div class="score-board-wrapper" v-if="currentUser">
		<div class="score-board">
			<h2>TOP 10</h2>
			<table>
				<tr>
					<th>
						Rank
					</th>
					<th>
						Player
					</th>
					<th>
						Wins
					</th>
				</tr>
				<tr class="user" v-for="(user, index) in scoreboard" :key="user">
					<td class="stat-text">
						{{index + 1}}
					</td>
					<td>
						<BaseCardUser
							:data="user"
						/>
					</td>
					<td class="stat-text">
						{{user.wins}}
					</td>
				</tr>
			</table>
			<small v-if="errorMsg">{{errorMsg}}</small>
		</div>
	</div>
</template>

<style scoped>
	.score-board-wrapper 
	{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 50px;
	}

	.score-board 
	{
		background-color: var(--grey);
		padding: 50px;
		border: 5px solid var(--blue-dark);
		width: 800px;
	}

	table 
	{
		margin: 0 auto;
		width: 100%;
		border-collapse: collapse;
	}

	table th, td 
	{
		border: 1px solid black;
		padding: 20px;
	}

	.stat-text 
	{
		font-weight: bold;
		font-size: 20px;
	}
</style>

<script>
	// This script is a Vue component called ScoreBoardPage. 
	// It fetches the top player's data from the server and displays it in a scoreboard table.
	// It uses Axios for HTTP requests and Vuex for state management.
	// The component includes a BaseCardUser component for rendering user information.

	import axios from 'axios'
	import store from '@/Store/index.js'

	import BaseCardUser from '@/Components/Profile/BaseCardUser.vue'
	
	export default {
		name: 'ScoreBoardPage',

		computed: 
		{
			currentUser() 
			{
				return store.getters.getCurrentUser;
			}
		},

		components: 
		{
			BaseCardUser
		},

		data() 
		{
			return {
				scoreboard: [],
				limiter: 10,
				errorMsg: '',
			}
		},

		methods: 
		{
			async getScoreBoard() 
			{
				await axios.get(`${process.env.VUE_APP_HOST_URL}:3000/score/ladder/desc/limit/${this.limiter}`, {withCredentials: true})
				.then((response) => 
				{
					this.scoreboard = response.data
					this.errorMsg = ''
				})
				.catch((error) => 
				{
					this.errorMsg = 'Error: ' + error.response.data.message
				})
			}
		},

		async beforeMount() 
		{
			await store.dispatch('fetchCurrentUser');

			if (!this.currentUser) 
			{
				this.$router.push('/')
				return ;
			}
		},

		created() 
		{
			this.getScoreBoard();
		}
	}
</script>