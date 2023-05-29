<template>
	<div class="modal" v-if="visible">
		<div class="text">{{info}}</div>
		<button class="confirm" @click="userConfirmed">{{confirmButtonText}}</button>
	</div>
</template>

<script>
export default {
	name: 'PopupInformation',

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
		confirmButtonText: 
		{
			type: String,
			default: 'Ok'
		},
	},

	methods: 
	{
		userConfirmed() 
		{
			this.$emit("confirmed");
		},
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

	.modal .text 
	{
		color: black;
		font-weight: 700;
		font-size: 22px;
	}

	button 
	{
		margin: 25px auto 0 auto;
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