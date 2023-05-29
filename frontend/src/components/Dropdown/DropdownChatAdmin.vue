<template>
	<div class="button-wrapper">
		<button :id="componentId + 'toggle-button'" class="toggle-button" @click="changeDropdownState">&uarr;</button>
		<div class="button-dropdown" :id="componentId + 'dropdown'">
			<button v-if="adminButton" @click="emitMakeAdmin">Admin</button>
			<button v-if="muteButton" @click="emitMuteUser">Mute</button>
			<button v-if="banButton" @click="emitBanUser">Ban</button>
			<button v-if="unBanButton" @click="emitUnBanUser">Unban</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DropdownChatAdmin',

	emits: ['makeAdmin', 'banUser', 'muteUser', 'unBanUser'],

	data() 
	{
		return {
			dropdownIsShown: false,
			componentId: null,
		}
	},

	props: 
	{
		adminButton: 
		{
			type: Boolean,
			default: true,
		},
		muteButton: 
		{
			type: Boolean,
			default: true,
		},
		banButton: 
		{
			type: Boolean,
			default: true,
		},
		unBanButton: 
		{
			type: Boolean,
			default: true,
		}
	},

	mounted() 
	{
		this.componentId = this.uuidv4();
	},

	methods: 
	{
		uuidv4() 
		{
			return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
				(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
			);
		},

		showDropdown() 
		{
			this.dropdownIsShown = true;
			const elem = document.getElementById(this.componentId + 'dropdown');
			elem.style.display = 'flex';
		},

		hideDropdown() 
		{
			this.dropdownIsShown = false;
			const elem = document.getElementById(this.componentId + 'dropdown');
			elem.style.display = 'none';
		},

		emitMakeAdmin() 
		{
			this.hideDropdown()
			this.$emit('makeAdmin')
		},

		emitMuteUser() 
		{
			this.hideDropdown()
			this.$emit('muteUser')
		},

		emitBanUser() 
		{
			this.hideDropdown()
			this.$emit('banUser')
		},

		emitUnBanUser() 
		{
			this.hideDropdown()
			this.$emit('unBanUser')
		},

		addAnimation() 
		{
			const elem = document.getElementById(this.componentId + 'toggle-button');
			elem.classList.add('animate');
		},

		removeAnimation() 
		{
			const elem = document.getElementById(this.componentId + 'toggle-button');
			elem.classList.remove('animate');
		},

		changeDropdownState() 
		{
			if (this.dropdownIsShown) 
			{
				this.removeAnimation();
				this.hideDropdown();
			}
			else if (!this.dropdownIsShown) 
			{
				this.addAnimation();
				this.showDropdown();
			}
		}
	}
}
</script>

<style scoped>
	.button-wrapper 
	{
		position: relative;
	}

	.toggle-button 
	{
		transition: 0.5s;
		border: 1px solid var(--grey);
		background-color: var(--blue-dark);
		color: var(--orange);
		border-radius: 50%;
		height: 35px;
		width: 35px;
		margin-left: 10px;
		padding-bottom: 3px;
		cursor: pointer;
	}

	.toggle-button:hover 
	{
		border-color: var(--blue-dark);
	}

	.button-dropdown 
	{
		z-index: 1;
		display: none;
		border-radius: 5px;
		border: 1px solid var(--grey);
		background-color: var(--blue-dark);
		position: absolute;
		right: 0;
		margin-top: 2px;
		padding: 15px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}

	.button-dropdown button 
	{
		width: 80px;
		height: 30px;
		padding: 5px 0;
		cursor: pointer;
		background-color: var(--blue-light);
		border: 1px solid var(--blue-dark);
		border-radius: 5px;
		color: white;
	}

	.button-dropdown button:hover 
	{
		border: none;
	}

	.animate 
	{
		transition: 0.5s;
		transform: rotate(-180deg);
	}
</style>