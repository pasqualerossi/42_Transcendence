<template>
	<div class="base-box-number-title">
		<strong class="title">{{title}}</strong>
		<strong class="number">{{number}}</strong>
	</div>
</template>

<script>
	export default {
		name: 'BaseBoxNumberWithTitle',

		props: 
		{
			title: 
			{
				type: String,
				required: true
			},
			number: 
			{
				type: Number,
				required: true
			},
		}
	}
</script>

<style scoped>
	.base-box-number-title 
	{
		aspect-ratio: 1 / 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--blue-dark);
		color: white;
	}

	.base-box-number-title .title 
	{
		font-size: 20px;
	}

	.base-box-number-title .number 
	{
		font-size: 40px;
	}
</style>