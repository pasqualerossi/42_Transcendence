<template>
	<div class="score">
		<span>{{score.left}}</span>
		<span>{{score.right}}</span>
	</div>
</template>

<script>
	export default {
		name: 'GameScore',

		props: 
		{
			score: 
			{
				type: Object,
				required: true
			}
		}
	}
</script>

<style scoped>
	.score 
	{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	span 
	{
		font-size: 50px;
		padding: 0 40px;
	}
</style>