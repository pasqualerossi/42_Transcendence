<template>
<!-- This is the template section of a chat sidebar component. -->
<!-- It consists of two tabs, "Groups" and "Private," represented by buttons. -->
<!-- Depending on the selected tab, different components are rendered. -->
<!-- If the "Groups" tab is active, the ChatSideNavGroups component is displayed, which shows group chat rooms. -->
<!-- If the "Private" tab is active, the ChatSideNavPrivate component is shown, which likely handles private or one-on-one conversations. -->
<!-- The user can switch between the tabs by clicking on the respective buttons. -->

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

		<ChatSideNavGroups
			v-if="currentSidenavTab === 'Groups'"
			:groupRooms="groupRooms"
		/>

		<ChatSideNavPrivate
			v-if="currentSidenavTab === 'Private'"
		/>
	</aside>
</template>

<style scoped>
	button 
	{
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

	.sidenav 
	{
		display: flex;
		flex-direction: column;
	}

	.sidenav__tabs 
	{
		height: 100px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding-top: 16px;
	}
</style>

<script setup>
// This script sets up a chat sidebar component with a reactive variable for tracking the selected tab and receives a prop for group chat rooms.

	import { ref } from'vue';
	import ChatSideNavGroups from '@/Components/ChatSideNavGroups.vue'
	import ChatSideNavPrivate from '@/Components/ChatSideNavPrivate.vue'

	const currentSidenavTab = ref('Groups');

	const props = defineProps({
		groupRooms: 
		{
			type: Array,
			required: true
		}
	})
</script>