<template>
	<!-- This template represents a form for changing the user's username or display name. -->
	<!-- This displays the current username and provides an input field where the user can enter a new name.  -->
	<!-- When the "Submit" button is clicked, the changeUsername method is triggered, which handles the submission and validation of the new name. -->
	<!-- If there is an error with the name, such as it being too short or already taken, an error message is displayed below the input field. -->
	<!-- The component relies on the currentUser prop to display the current username. -->

	<div class="change-name-wrapper">
		<h2>Change Username</h2>
		<div>Current Name:</div>
		<strong>{{currentUser.username}}</strong>
		<div class="name">
			<input type="text" placeholder="new name" v-model="newName">
			<small v-if="nameError">{{nameError}}</small>
			<button @click="changeUsername">Submit</button>
		</div>
	</div>
</template>

<style scoped>
	.change-name-wrapper 
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 14px;
		align-items: center;
		background-color: var(--grey);
		border: 5px solid var(--blue-dark);
		padding: 50px;
	}

	.name 
	{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	h2 
	{
		color: var(--blue-dark);
		letter-spacing: 2px;
	}

	input 
	{
		width: 150px;
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
		width: 150px;
		height: 30px;
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
	// A component that allows the user to change their username. 
	// Validates the new name input, displays error messages for invalid input, and sends a request to the server to update the username.
	// It also updates the current user's data after a successful update.

	import axios from 'axios'
	import store from '@/Store/index.js'

	export default {
		name: 'SettingsChangeName',

		data() 
		{
			return {
				newName: '',
				nameError: '',
				timeoutId: 0
			}
		},

		props: 
		{
			currentUser: 
			{
				type: Object,
				required: true
			}
		},

		methods: 
		{
			showNameError(message) 
			{
				clearTimeout(this.timeoutId);
				this.nameError = message;
				this.timeoutId = setTimeout(() => { this.nameError = ''; }, 3000);
			},

			async changeUsername() 
			{
				if (this.newName.length > 8) 
				{
					this.showNameError('Name cant have more then 8 characters')
					return ;
				}
				if (this.newName.includes(' ')) 
				{
					this.showNameError('Name cant have spaces')
					return ;
				}
				await axios.post(`${process.env.VUE_APP_HOST_URL}:3000/Usersupdate/name/${this.newName}`, null, { withCredentials: true })
				.then((response) => 
				{
					this.newName = '';
					store.dispatch('fetchCurrentUser');
				})
				.catch((error) => 
				{
					if (error.response.data.message == 'Name is taken') 
					{
						this.showNameError('Name is taken')
					}
					this.newName = '';
				})
			}
		}
	}
</script>