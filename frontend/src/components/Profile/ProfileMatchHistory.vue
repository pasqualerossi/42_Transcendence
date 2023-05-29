<template>
	<div class="profile-match-history">
		<h2>Match History</h2>
		<div class="score" v-for="match in limitedMatchHistory" :key="match">
			<BaseCardMatchHistory :gameInfo="match" :currentUserId="user.id"/>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	import BaseCardMatchHistory from '@/components/BaseCardMatchHistory.vue'

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

		mounted() 
		{
			this.fetchHistory();
		}
	}
</script>

<style scoped>
	h2 
	{
		color: var(--blue-dark);
		letter-spacing: 2px;
		margin: 0 0 30px 0;
	}
</style>