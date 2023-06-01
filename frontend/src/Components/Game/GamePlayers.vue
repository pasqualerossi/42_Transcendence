<template>
<!-- This is for a players component that displays two user cards side by side, without showing the status or allowing to click to a private page. -->

	<div class="players">
		<BaseCardUser v-if="playerLeft" :data="playerLeft" :showStatus="false" :allowPrivatePageOnClick="false"/>
		VS
		<BaseCardUser v-if="playerRight" :data="playerRight" :showStatus="false" :allowPrivatePageOnClick="false"/>
	</div>
</template>

<style scoped>
	.players 
	{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 20px;
		padding: 20px 0;
	}
</style>

<script setup>
// This is a script that imports the BaseCardUser component and defines the required props for the players component.

	import BaseCardUser from '@/Components/BaseCardUser.vue'

	const props = defineProps
	({
		playerLeft: 
		{
			type: Object,
			required: true
		},
		playerRight: 
		{
			type: Object,
			required: true
		}
	})
</script>