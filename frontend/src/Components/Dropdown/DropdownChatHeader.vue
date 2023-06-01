<template>
	<!-- This template represents a button with a dropdown menu. -->
	<!-- Clicking the button toggles the visibility of the dropdown menu, which contains buttons representing different options. -->

	<div class="button-wrapper">
		<button id="header-toggle-button" @click="changeDropdownState">&uarr;</button>
		<div class="button-dropdown" id="header-dropdown">
			<div v-for="option in options" :key="option">
				<button @click="emitSelected(option.title)">{{option.title}}</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.button-wrapper 
	{
		position: relative;
	}

	#header-toggle-button 
	{
		transition: 0.5s;
		border: 1px solid var(--grey);
		background-color: var(--blue-dark);
		color: var(--orange);
		border-radius: 50%;
		height: 35px;
		width: 35px;
		margin-left: 10px;
		padding-bottom: 3px;
		cursor: pointer;
	}

	#header-toggle-button:hover 
	{
		border-color: var(--blue-dark);
	}

	.button-dropdown 
	{
		display: none;
		border-radius: 5px;
		border: 1px solid var(--grey);
		background-color: var(--blue-dark);
		position: absolute;
		right: 0;
		margin-top: 2px;
		padding: 15px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}

	.button-dropdown button 
	{
		width: 100px;
		height: 30px;
		cursor: pointer;
		background-color: var(--blue-light);
		border: 1px solid black;
		border-radius: 5px;
		color: white;
	}

	.button-dropdown button:hover 
	{
		border: 1px solid var(--blue-light);
	}

	.animate 
	{
		transition: 0.5s;
		transform: rotate(-180deg);
	}
</style>

<script>
export default {
	name: 'DropdownChatHeader',

	emits: ['selected'],

	data() 
	{
		return {
			dropdownIsShown: false
		}
	},

	props: 
	{
		options: 
		{
			type: Array,
			default: []
		}
	},

	methods: 
	{
		showDropdown() 
		{
			this.dropdownIsShown = true;
			const elem = document.getElementById('header-dropdown');
			elem.style.display = 'flex';
		},

		hideDropdown() 
		{
			this.dropdownIsShown = false;
			const elem = document.getElementById('header-dropdown');
			elem.style.display = 'none';
		},

		emitSelected(option) 
		{
			this.hideDropdown();
			this.$emit('selected', option)
		},

		addAnimation() 
		{
			const elem = document.getElementById('header-toggle-button');
			elem.classList.add('animate');
		},

		removeAnimation() 
		{
			const elem = document.getElementById('header-toggle-button');
			elem.classList.remove('animate');
		},

		changeDropdownState() 
		{
			if (this.dropdownIsShown) 
			{
				this.removeAnimation();
				this.hideDropdown();
			}
			else if (!this.dropdownIsShown) 
			{
				this.addAnimation();
				this.showDropdown();
			}
		}
	}
}
</script>