<template>
	<aside class="sidenav">
		<div class="sidenav__tabs">
			<button
				:style="(currentSidenavTab == 'Groups') ? 'background-color: var(--orange);' : 'background-color: var(--grey)'"
				@click="currentSidenavTab = 'Groups'">
				Groups
			</button>
			<button
				:style="(currentSidenavTab == 'Private') ? 'background-color: var(--orange);' : 'background-color: var(--grey)'"
				@click="currentSidenavTab = 'Private'">
				Private
			</button>
		</div>

		<ChatSidenavGroups
			v-if="currentSidenavTab === 'Groups'"
			:groupRooms="groupRooms"
		/>

		<ChatSidenavPrivate
			v-if="currentSidenavTab === 'Private'"
		/>
	</aside>
</template>

<script setup>
	import { ref } from'vue';
	import ChatSidenavGroups from '@/components/ChatSidenavGroups.vue'
	import ChatSidenavPrivate from '@/components/ChatSidenavPrivate.vue'

	const currentSidenavTab = ref('Groups');

	const props = defineProps({
		groupRooms: {
			type: Array,
			required: true
		}
	})
</script>

<style scoped>
	button {
		width: 80px;
		height: 35px;
		border: 2px solid black;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background-color: var(--grey);
		font-size: 12px;
		font-weight: bold;
		color: black;
		cursor: pointer;
	}

	.sidenav {
		display: flex;
		flex-direction: column;
	}

	.sidenav__tabs {
		height: 100px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding-top: 16px;
	}
</style>