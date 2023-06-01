<template>
	<!-- This is a component called "BaseBoxNumberTitle" that represents a box with a title and a number. -->
	<!-- It is designed to visually display information in a clear and concise manner. -->
	<!-- The title is typically a descriptive label, while the number represents a numerical value or quantity. -->
	<!-- The component's layout and styling create a visually appealing and organized presentation of the title and number within the box. -->

	<div class="base-box-number-title">
		<strong class="title">{{title}}</strong>
		<strong class="number">{{number}}</strong>
	</div>
</template>

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

<script>
// This is a component called "BaseBoxNumberWithTitle."
// It takes in two properties: "title" as a required string and "number" as a required number. 
// The component is responsible for rendering a box with a title and a number, using the provided properties.
// It allows to create instances of this component with different titles and numbers to display relevant information in a visually consistent and structured manner.

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