<template>
	<div class="login-wrapper">
		<button @click="login">
			<img src="@/assets/42-logo-white.svg">
			<strong>Login</strong>
		</button>
	</div>
</template>

<script>
	export default {
		name: 'LoginView',

		methods: 
		{
			login() 
			{
				location.replace(`${process.env.VUE_APP_HOST_URL}:3000/authentication/callback`);
			}
		},
	}
</script>

<style scoped>
	.login-wrapper 
	{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	button 
	{
		width: 200px;
		height: 70px;
		background-color: var(--blue-dark);
		border: 2px solid var(--blue-dark);
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
		background-color: var(--blue-light);
	}

	img 
	{
		height: 35px;
		margin-right: 5px;
	}

	strong 
	{
		font-size: 20px;
		margin-left: 5px;
		font-weight: bold;
	}
</style>