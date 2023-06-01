<template>
	<!-- This is a modal component that displays information and allows the user to select a number from a dropdown menu. -->
	<!-- It also provides an error message for invalid selections. -->
	<!-- The component includes cancel and confirm buttons for the user to cancel or confirm their selection. -->

	<div class="modal" v-if="visible">
		<div class="text">{{info}}</div>
		<select v-model.number="inputNumber">
			<option disabled value="">Please Select One</option>
			<option>5</option>
			<option>10</option>
			<option>15</option>
			<option>30</option>
			<option>60</option>
		</select>
		<small v-if="errorMessage">{{errorMessage}}</small>
		<div class="choices">
			<button class="cancel" @click="userCanceled">{{cancelButtonText}}</button>
			<button class="confirm" @click="userConfirmed">{{confirmButtonText}}</button>
		</div>
	</div>
</template>

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

	.modal select 
	{
		margin: 25px auto 0 auto;
		width: 100px;
		outline: none;
		color: black;
		padding: 5px;
		border: 2px solid black;
		border-radius: 5px;
		background-color: white;
		color: black;
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

<script>
// This is a component called "PopupNumber" that represents a modal popup window.
// It allows the user to select a number from a dropdown menu and provides options to confirm or cancel the selection. 
// The component emits events when the user confirms or cancels, and it also manages the input number and displays an optional error message.

export default {
	name: 'PopupNumber',

	data() 
	{
		return {
			inputNumber: 0,
		}
	},

	emits: ['confirmed', 'canceled'],

	props: 
	{
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
		errorMessage: 
		{
			type: String,
			default: ''
		}
	},

	methods: 
	{
		userConfirmed() 
		{
			this.$emit("confirmed", this.inputNumber);
			this.inputNumber = 0;
		},

		userCanceled() 
		{
			this.inputText = '';
			this.$emit("canceled");
		}
	}
}
</script>