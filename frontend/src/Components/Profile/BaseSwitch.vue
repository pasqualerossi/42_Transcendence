<template>
	<!-- A component representing a checkbox input element. -->
	<!-- It allows the user to toggle a boolean value and emits an event when the checkbox is changed, passing the updated boolean value. -->

	<input type="checkbox" v-model="bool" @change="$emit('checked', bool)">
</template>

<style scoped>
	input[type="checkbox"] 
	{
		position: relative;
		height: 40px;
		width: 80px;
		-webkit-appearance: none;
		background-color: #c6c6c6;
		outline: none;
		border-radius: 20px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
		transition: .5s;
	}

	input:checked[type="checkbox"] 
	{
		height: 40px;
		width: 80px;
		-webkit-appearance: none;
		background-color: var(--blue-light);
		outline: none;
		border-radius: 20px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
		transition: .5s;
	}

	input[type="checkbox"]:before 
	{
		content: '';
		position: absolute;
		width: 40px;
		height: 40px;
		border-radius: 20px;
		top: 0;
		left: 0;
		background-color: #fff;
		transition: .5s;
		transform: scale(1.1);
		box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
		cursor: pointer;
	}

	input:checked[type="checkbox"]:before 
	{
		left: 40px;
	}
</style>

<script>
// A component representing a switch control.
// It maintains an internal boolean value that can be toggled. 
// The component emits an event when the switch is checked or unchecked, providing the updated boolean value to the parent component.

	export default {
		name: 'BaseSwitch',

		emits: ['checked'],

		data() 
		{
			return 
			{
				bool: false
			}
		}
	}
</script>