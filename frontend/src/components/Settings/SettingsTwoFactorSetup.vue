<template>
	<div class="two-factor-wrapper" v-if="currentUser">
		<h2>Setup Two Factor</h2>
		<div class="code" v-if="!currentUser.isTwoFactorAuthenticationEnabled">
			<button v-on:click="gen_qrcode">Gen Code</button>
			<img v-if="qrCode" :src="qrCode" width="100">
		</div>
		<form v-if="!currentUser.isTwoFactorAuthenticationEnabled" @submit.prevent="send2FA">
			<input placeholder="enter code" type="text" id="2FACode" v-model="formData.twoFactorAuthenticationCode" />
			<small v-if="errorMsg">{{errorMsg}}</small>
			<button class="confirm-button">Submit</button>
		</form>
		<button v-if="currentUser.isTwoFactorAuthenticationEnabled" class="confirm-button" @click="turnOffTwoFA">Diasble</button>
	</div>
</template>


<script>
import axios from 'axios'
import store from '@/store/index.js'

export default {
	name: 'SettingsTwoFactorSetup',

	data() 
	{
		return {
			formData: 
			{
				twoFactorAuthenticationCode: '',
			},
			errorMsg: '',
			qrCode: '',
		}
	},

	methods: 
	{
		send2FA() 
		{
			if (this.formData.code == '') 
			{
				this.errorMsg = 'Please enter your code!';
				return;
			}
			else 
			{
				axios.post(`${process.env.VUE_APP_HOST_URL}:3000/2fa/turn-on`, this.formData, {withCredentials: true})
				.then(async (response) => 
				{
					await store.dispatch('fetchCurrentUser');
					this.$router.push('/');
				})
				.catch((error) => 
				{
					this.errorMsg = 'Error while activating!'
				})
				this.formData.code = '';
			}
		},

		gen_qrcode()
		{
			this.qrCode = `${process.env.VUE_APP_HOST_URL}:3000/2fa/generate?` + new Date().getTime();
		},

		turnOffTwoFA() 
		{
			axios.post(`${process.env.VUE_APP_HOST_URL}:3000/2fa/turn-off`, null, {withCredentials: true})
			.then((response) => 
			{
				store.dispatch('fetchCurrentUser');
				this.errorMsg = 'Successfully deactivated 2FA!'
			})
			.catch((error) => 
			{
				this.errorMsg = 'Error while deactivating!'
			})
		}
	},

	computed: 
	{
		currentUser() 
		{
			return store.getters.getCurrentUser;
		}
	}
}
</script>

<style scoped>
	.code 
	{
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: center;
		align-items: center;
	}

	.two-factor-wrapper 
	{
		background-color: var(--grey);
		padding: 50px;
		border: 5px solid var(--blue-dark);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	h2 
	{
		color: var(--blue-dark);
		letter-spacing: 2px;
	}

	form 
	{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
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

	.confirm-button 
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

	.code button 
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
</style>