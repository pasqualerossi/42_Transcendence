<template>
	<!-- This template represents a form for changing the user's profile picture. -->
	<!-- This displays the current profile picture, allows the user to select a new image file, and provides a button to submit the change. -->
	<!-- Also includes a preview of the selected image before uploading, along with a message that appears after the submission process. -->

	<div class="change-avatar-wrapper">
		<h2>Change Profile Picture</h2>
		<div>Your Current Picture:</div>
		<img :src="imageLink" width="65">
		<form @submit.prevent="onSubmit" enctype="multipart/form-data">
			<img v-if="previewImage" :src="previewImage" class="uploading-image" width="100" height="100"/>
			<input type="file" ref="file" id="selectedFile" style="display: none;" @change="onSelect"/>
			<input type="button" value="Upload Image" onclick="document.getElementById('selectedFile').click();" />
			<button>Submit</button>
			<small v-if="message">{{message}}</small>
		</form>
	</div>
</template>

<style scoped>
	h2 
	{
		color: var(--blue-dark);
		letter-spacing: 2px;
	}

	.change-avatar-wrapper 
	{
		background-color: var(--grey);
		padding: 50px;
		border: 5px solid var(--blue-dark);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 10px;
	}

	form 
	{
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: center;
		align-items: center;
	}

	input 
	{
		width: 150px;
		height: 30px;
		background-color: var(--orange);
		border: 2px solid black;
		color: black;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: bold;
		cursor: pointer;
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

	button:hover 
	{
		border: 2px solid  var(--blue-dark);
		color:  var(--grey);
		background-color:  var(--blue-light);
	}
</style>

<script>
// This script component handles the functionality of changing the user's avatar or profile picture.
// This communicates with the server to upload the selected image file and updates the user's profile with the new picture.
// This provides methods to handle image selection, previewing the selected image, validating the file type and size, and submitting the changes.
// Displays an error message if there are any issues during the upload process.
// The component receives the current user's information as a prop from the parent component.

import axios from 'axios'
import store from '@/Store/index.js'

export default {
	name: 'SettingsChangeAvatar',

	data() 
	{
		return {
			previewImage: '',
			file: '',
			message: ''
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

	computed: 
	{
		imageLink() 
		{
			if (this.currentUser.avatarId === 1 && this.currentUser.profilePictureURL)
				return this.currentUser.profilePictureURL;
			else
				return `${process.env.VUE_APP_HOST_URL}:3000/database-files/${this.currentUser.avatarId}`;
		},
	},

	methods: 
	{	
		// Sets the message property to the provided error message, clears the file property, 
		// and sets a timeout to clear the error message after 3 seconds.
		fileError(errorMessage) 
		{
			this.message = errorMessage;
			const timeout = setTimeout(() => 
			{
				this.message = '';
			}, 3000);
			this.file = '';
		},

		// Triggered when a file is selected. 
		// It reads the file as a data URL using FileReader and sets the previewImage property to the result. 
		// It checks the file's type and size, and if they don't meet the requirements, it calls fileError 
		// with the appropriate error message.
		onSelect(e)
		{
			const image = e.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = e => {
				this.previewImage = e.target.result;
			}
			const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
			const file = this.$refs.file.files[0];
			if (!allowedTypes.includes(file.type)) 
			{
				this.fileError('Filetype is wrong');
				return ;
			}
			if (file.size > 500000) 
			{
				this.fileError('Too large, max size allowed is 500kb');
				return ;
			}
			this.file = file;
		},

		// Triggered when the form is submitted. It checks if a file is selected 
		// and if not, calls fileError with a "select a valid file" error message. 
		// If a file is selected, it creates a new FormData object, appends the file to it, 
		// and sends a POST request using axios to upload the file. If the request is successful, 
		// it clears the previewImage property and dispatches a Vuex action to fetch the current user's data. 
		// If an error occurs, it sets the message property to the error message received from the server.
		async onSubmit()
		{
			if (this.file === '') 
			{
				this.fileError('Please Select A Valid File')
				return ;
			}
			const formData = new FormData();
			formData.append('file',this.file);
			try 
			{
				await axios.post(`${process.env.VUE_APP_HOST_URL}:3000/Usersavatar/`, formData, {withCredentials: true});
				this.previewImage = '';
				store.dispatch('fetchCurrentUser');
			}
			catch (err) 
			{
				this.message = err.response.data.error
			}
		}
	},
}
</script>