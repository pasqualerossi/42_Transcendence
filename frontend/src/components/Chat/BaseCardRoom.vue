<template>

<!-- This is a card component that represents a room in a user interface. -->
<!-- It displays the room's name and access information. -->
<!-- Depending on the room's access type, it shows different buttons. -->
<!-- If the room is protected, it displays a "Join" button that emits a "passwordProtection" event when clicked, allowing the user to enter a password for access. -->
<!-- If the room is not protected, it shows an "Enter" button that emits an "enterRoom" event when clicked, indicating the user's intention to enter the room. -->

<div>
	<div class="card" @click="goToProfilePage">
		<div class="room-info">
			<span class="roomname">{{room.name}}</span>
			<span class="access">{{room.access}}</span>
		</div>
		<button
			v-if="showJoinButton"
			@click="(room.access === 'protected') ? $emit('passwordProtection', room.name) : $emit('joinRoom', room.name)">
			Join
		</button>
		<button
			v-if="showEnterButton"
			@click="$emit('enterRoom', room.name)">
			&rarr;
		</button>
	</div>
</div>
</template>

<script>

// This is a component called "BaseCardRoom" that represents a card for displaying room information in a user interface.
// It has three properties: 
// 1. "room" (the room object containing information like name and access).
// 2. "showEnterButton" (a boolean indicating whether to show the enter button).
// 3. "showJoinButton" (a boolean indicating whether to show the join button).
//
// The component emits events: 
// 1. "passwordProtection" when the join button is clicked for a protected room.
// 2. "joinRoom" when the join button is clicked for a non-protected room.
// 3. "enterRoom" when the enter button is clicked. 
//
// These events allow the parent component to handle the corresponding actions based on user interaction with the card.

export default {
	name: 'BaseCardRoom',

	emits: ['passwordProtection', 'joinRoom', 'enterRoom'],

	props: {
		room: {
			type: Object,
			required: true
		},
		showEnterButton: {
			type: Boolean,
			required: true
		},
		showJoinButton: {
			type: Boolean,
			required: true
		}
	}
}
</script>

<style scoped>
	.card {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: var(--blue-dark);
		border: 2px solid white;
		color: var(--grey);
		border-radius: 60px;
		width: 220px;
		padding: 15px;
	}

	.card:hover {
		background-color: black;
		border-color: black;
	}

	.room-info {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
		text-align: left;
	}

	.room-info .roomname {
		font-size: 14px;
		font-weight: 700;
		letter-spacing: 2px;
	}

	.room-info .access {
		font-size: 16px;
		color: var(--orange);
	}

	button {
		width: 40px;
		height: 40px;
		cursor: pointer;
		margin: 0 10px;
		border: 1px solid var(--orange);
		background-color: var(--blue-dark);
		color: var(--orange);
		border-radius: 25px;
	}
</style>