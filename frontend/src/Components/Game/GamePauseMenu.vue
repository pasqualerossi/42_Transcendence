<template>
<!-- This is for a pause component that displays the "PAUSE" text and two buttons for resuming and exiting the game. -->

	<div class="pause">
		<strong>PAUSE</strong>
		<button @click="$emit('resumeGame')">Resume</button>
		<button @click="$emit('exitGame')">Exit</button>
	</div>
</template>

<style scoped>
	.pause 
	{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--blue-light);
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 30px;
		width: 370px;
		height: 370px;
	}

	strong 
	{
		color: white;
		font-size: 35px;
		font-weight: bold;
	}

	button 
	{
		width: 168px;
		height: 42px;
		margin: 0 10px;
		background-color: var(--orange);
		border: 2px solid black;
		color: black;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 21px;
		font-weight: bold;
		cursor: pointer;
	}
</style>

<script>
// This is a script for a game pause menu that emits events for exiting or resuming the game.

	export default {
		name: 'GamePauseMenu',

		emits: ['exitGame', 'resumeGame'],
	}
</script>