<template>
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

<script>
	import axios from 'axios'
	import store from '@/store/index.js'

	import BaseCardUser from '@/components/Profile/BaseCardUser.vue'
	
	export default {
		name: 'ScoreBoardView',

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