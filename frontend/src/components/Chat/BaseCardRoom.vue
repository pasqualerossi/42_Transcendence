<template>
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