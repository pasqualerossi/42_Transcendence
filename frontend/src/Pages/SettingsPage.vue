<template>
	<!-- This template represents a settings menu in a user interface. -->
	<!-- It is conditionally rendered based on whether a currentUser is available. -->
	<!-- Inside the menu, there are several items such as SettingsChangeAvatar, SettingsChangeStatus, SettingsChangeName, and SettingsTwoFactorSetup, each represented by a component. -->
	<!-- These components handle different settings functionalities, such as changing the user's avatar, status, name, and setting up two-factor authentication. -->

	<div class="settings-wrapper" v-if="currentUser">
		<div class="menu">
			<SettingsChangeAvatar class="menu-item" :currentUser="currentUser"/>
			<SettingsChangeStatus class="menu-item" :currentUser="currentUser"/>
			<SettingsChangeName class="menu-item" :currentUser="currentUser"/>
			<SettingsTwoFactorSetup class="menu-item"/>
		</div>
	</div>
</template>

<style scoped>
	.settings-wrapper 
	{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 50px;
	}

	.menu 
	{
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		gap: 20px;
	}

	.menu-item 
	{
		width: 450px;
		height: 450px;
	}

	a, button 
	{
		border: 2px solid black;
		padding: 5px;
		border-radius: 5px;
		text-decoration: none;
		background-color: var(--grey);
		font-size: 14px;
		font-weight: bold;
		color: black;
	}

	a.router-link-exact-active 
	{
		background-color: var(--orange);
	}
</style>

<script>
	// This script handles the settings view in a user interface.
	// This imports and includes components for various settings functionalities.
	// This fetches the current user from the store and redirects if the user is not available.

	import store from '@/Store/index.js'

	import SettingsTwoFactorSetup from '@/Components/Settings/SettingsTwoFactorSetup.vue'
	import SettingsChangeAvatar from '@/Components/Settings/SettingsChangeAvatar.vue'
	import SettingsChangeStatus from '@/Components/Settings/SettingsChangeStatus.vue'
	import SettingsChangeName from '@/Components/Settings/SettingsChangeName.vue'

	export default {
		name: 'SettingsPage',

		components: 
		{
			SettingsTwoFactorSetup,
			SettingsChangeAvatar,
			SettingsChangeStatus,
			SettingsChangeName
		},

		async beforeMount() 
		{
			await store.dispatch('fetchCurrentUser');

			if (!this.currentUser) 
			{
				this.$router.push('/')
				return ;
			}
		},

		computed: 
		{
			currentUser() 
			{
				return store.getters.getCurrentUser;
			},
		}
	}
</script>