<template>
	<div class="players">
		<BaseCardUser v-if="playerLeft" :data="playerLeft" :showStatus="false" :allowPrivatePageOnClick="false"/>
		VS
		<BaseCardUser v-if="playerRight" :data="playerRight" :showStatus="false" :allowPrivatePageOnClick="false"/>
	</div>
</template>

<script setup>
	import BaseCardUser from '@/components/BaseCardUser.vue'

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