<template>
<!-- This is for a score component that displays the scores of two entities. -->

	<div class="score">
		<span>{{score.left}}</span>
		<span>{{score.right}}</span>
	</div>
</template>

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

<script>
// This is a script for a game score component that requires a prop named "score" of type Object.

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