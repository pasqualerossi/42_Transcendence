<template>

	<!-- This template represents a modal component that shows a message and allows the user to confirm or cancel an action.-->

	<div class="modal" v-if="visible">
		<div class="text">{{info}}</div>
		<div class="choices">
			<button class="cancel" @click="userCanceled">{{cancelButtonText}}</button>
			<button class="confirm" @click="userConfirmed">{{confirmButtonText}}</button>
		</div>
	</div>
</template>

<script>

// This script is a component that handles the behavior and functionality of a popup choice component.
// It emits events when the user confirms or cancels the choice.

export default {
	name: 'PopupChoice',

	emits: ['confirmed', 'canceled'],

	props: 
	{
		title: 
		{
			type: String,
			required: true
		},
		info: 
		{
			type: String,
			required: true
		},
		visible: 
		{
			type: Boolean,
			required: true,
		},
		cancelButtonText: 
		{
			type: String,
			default: 'Cancel'
		},
		confirmButtonText: 
		{
			type: String,
			default: 'Confirm'
		},
	},

	methods: 
	{
		userConfirmed() 
		{
			this.$emit("confirmed", this.title);
		},

		userCanceled() 
		{
			this.$emit("canceled");
		}
	}
}
</script>

<style scoped>
	.modal 
	{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 50px;
		min-width: 300px;
	}

	.cancel 
	{
		background-color: rgb(98, 98, 98);
	}

	.modal .text 
	{
		color: black;
		font-weight: 700;
		font-size: 22px;
	}

	.modal .choices 
	{
		display: flex;
		justify-content: space-between;
		margin-top: 25px;
	}

	button 
	{
		width: 80px;
		height: 40px;
		background-color: var(--blue-light);
		border: 2px solid black;
		color: white;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: bold;
		cursor: pointer;
	}
</style>