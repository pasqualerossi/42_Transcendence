Based on this GitHub Repo:

https://github.com/42akurz/ft_transcendence

It's the simplest and smallest Transcendence Project I can find.

# To-Do

- Fix The Backend Files and Structure.

# Setup

<img width="712" alt="Screen Shot 2023-05-24 at 5 14 35 PM" src="https://github.com/pasqualerossi/42_Transcendence/assets/58959408/e44a0292-7d40-4901-a085-f0f266ac0822">

# Project Structure

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">

- <i class="devicon-docker-plain"></i> Docker-Compose.yml
- <i class="devicon-c-plain"></i> Makefile
- Frontend
  - <i class="devicon-javascript-plain"></i> Babel.config.js
  - <i class="devicon-javascript-plain"></i> vue.config.js
  - <i class="devicon-javascript-plain"></i> jsconfig.json
  - <i class="devicon-javascript-plain"></i> package.json
  - <i class="devicon-docker-plain"></i> Dockerfile
  - src
  	- <i class="devicon-vuejs-plain"></i> Main.vue
	- Router
		- <i class="devicon-javascript-plain"></i> index.js
	- Store
		- <i class="devicon-javascript-plain"></i> index.js
	- Assets
		- 42-logo-white.svg
		- <i class="devicon-css3-plain"></i> main.css
	- Components
		- Chat
			- <i class="devicon-vuejs-plain"></i> BaseCardRoom.vue 
			- <i class="devicon-vuejs-plain"></i> ChatFooter.vue
			- <i class="devicon-vuejs-plain"></i> ChatHeader.vue
			- <i class="devicon-vuejs-plain"></i> ChatMain.vue
			- <i class="devicon-vuejs-plain"></i> ChatSideNav.vue
			- <i class="devicon-vuejs-plain"></i> ChatSideNavCreateRoom.vue
			- <i class="devicon-vuejs-plain"></i> ChatSideNavGroups.vue
			- <i class="devicon-vuejs-plain"></i> ChatSideNavPrivate.vue
		- Dropdown
			- <i class="devicon-vuejs-plain"></i> DropdownChatAdmin.vue
			- <i class="devicon-vuejs-plain"></i> DropdownChatHeader.vue
		- Friends
			- <i class="devicon-vuejs-plain"></i> FriendsFind.vue
			- <i class="devicon-vuejs-plain"></i> FriendsList.vue
			- <i class="devicon-vuejs-plain"></i> FriendsRequest.vue
		- Game
			- <i class="devicon-vuejs-plain"></i> BaseCardGameSpectate.vue
			- <i class="devicon-vuejs-plain"></i> BaseCardMatchHistory.vue
			- <i class="devicon-vuejs-plain"></i> GameInvitePlayers.vue
			- <i class="devicon-vuejs-plain"></i> GamePauseMenu.vue
			- <i class="devicon-vuejs-plain"></i> GamePlayers.vue
			- <i class="devicon-vuejs-plain"></i> GameResult.vue
			- <i class="devicon-vuejs-plain"></i> GameScore.vue
			- <i class="devicon-vuejs-plain"></i> GameSearch.vue
			- <i class="devicon-vuejs-plain"></i> GameSpectate.vue
			- <i class="devicon-vuejs-plain"></i> TheGameInviteBox.vue
		- Popup
			- <i class="devicon-vuejs-plain"></i> PopupChoice.vue
			- <i class="devicon-vuejs-plain"></i> PopupInformation.vue
			- <i class="devicon-vuejs-plain"></i> PopupNumber.vue
			- <i class="devicon-vuejs-plain"></i> PopupPassword.vue
		- Profile
			- <i class="devicon-vuejs-plain"></i> BaseBoxNumberWithTitle.vue
			- <i class="devicon-vuejs-plain"></i> BaseCardUser.vue
			- <i class="devicon-vuejs-plain"></i> BaseSwitch.vue
			- <i class="devicon-vuejs-plain"></i> ProfileButtons.vue
			- <i class="devicon-vuejs-plain"></i> ProfileMatchHistory.vue
			- <i class="devicon-vuejs-plain"></i> TheNavBar.vue
		- Settings
			- <i class="devicon-vuejs-plain"></i> SettingsChangeAvatar.vue
			- <i class="devicon-vuejs-plain"></i> SettingsChangeName.vue
			- <i class="devicon-vuejs-plain"></i> SettingsChangeStatus.vue
			- <i class="devicon-vuejs-plain"></i> SettingsTwoFactorSetup.vue
	- Views
		- ChatView
			- <i class="devicon-vuejs-plain"></i> ChatView.vue
		- FriendsView
			- <i class="devicon-vuejs-plain"></i> FriendsView.vue
		- GameLobbyView
			- <i class="devicon-vuejs-plain"></i> GameLobbyView.vue
		- GameRoomView
			- <i class="devicon-vuejs-plain"></i> GameRoomView.vue
		- LoginView
			- <i class="devicon-vuejs-plain"></i> LoginView.vue
		- ProfileView
			- <i class="devicon-vuejs-plain"></i> ProfileView.vue
		- ScoreBoardView
			- <i class="devicon-vuejs-plain"></i> ScoreBoardView.vue
		- SettingsView
			- <i class="devicon-vuejs-plain"></i> SettingsView.vue
		- TwoFactorLoginView
			- <i class="devicon-vuejs-plain"></i> TwoFactorLoginView.vue
	
- Backend
  - <i class="devicon-javascript-plain"></i> nest-cli.json
  - <i class="devicon-javascript-plain"></i> package.json
  - <i class="devicon-javascript-plain"></i> tsconfig.build.json
  - <i class="devicon-javascript-plain"></i> tsconfig.json
  - <i class="devicon-docker-plain"></i> Dockerfile
  - src
  	- <i class="devicon-typescript-plain"></i> Main.ts
	- Assets
		- default-avatar.png
	- Authentication
		- Authentication
			- <i class="devicon-typescript-plain"></i> authentication.controller.ts
			- <i class="devicon-typescript-plain"></i> authentication.module.ts
			- <i class="devicon-typescript-plain"></i> authentication.service.ts
		- FourtyTwo
			- <i class="devicon-typescript-plain"></i> fourtyTwo.strategy.ts
		- Interfaces
			- <i class="devicon-typescript-plain"></i> requestWithUser.interface.ts
		- JWT
			- <i class="devicon-typescript-plain"></i> jwt.strategy.ts
		- TwoFactor
			- <i class="devicon-typescript-plain"></i> twoFactor.controller.ts
			- <i class="devicon-typescript-plain"></i> twoFactor.dto.ts
			- <i class="devicon-typescript-plain"></i> twoFactor.guard.ts
			- <i class="devicon-typescript-plain"></i> twoFactor.service.ts
			- <i class="devicon-typescript-plain"></i> twoFactor.strategy.ts
	- Chat
		- Controllers
			- <i class="devicon-typescript-plain"></i> chat.controller.ts
			- <i class="devicon-typescript-plain"></i> muted.controller.ts
		- Entities
			- <i class="devicon-typescript-plain"></i> message.entity.ts
			- <i class="devicon-typescript-plain"></i> muted.entity.ts
			- <i class="devicon-typescript-plain"></i> room.entity.ts
		- Modules
			- <i class="devicon-typescript-plain"></i> chat.module.ts
		- Services
			- <i class="devicon-typescript-plain"></i> chat.service.ts
			- <i class="devicon-typescript-plain"></i> message.service.ts
			- <i class="devicon-typescript-plain"></i> muted.service.ts
			- <i class="devicon-typescript-plain"></i> room.service.ts
		- <i class="devicon-typescript-plain"></i> chat.gateway.ts
	- Database
		- <i class="devicon-typescript-plain"></i> databaseFile.entity.ts
		- <i class="devicon-typescript-plain"></i> databaseFile.module.ts
		- <i class="devicon-typescript-plain"></i> databaseFile.controller.ts
		- <i class="devicon-typescript-plain"></i> databaseFile.service.ts
	- Game
		- <i class="devicon-typescript-plain"></i> game.entity.ts
		- <i class="devicon-typescript-plain"></i> game.module.ts
		- <i class="devicon-typescript-plain"></i> game.controller.ts
		- <i class="devicon-typescript-plain"></i> game.service.ts
		- <i class="devicon-typescript-plain"></i> game.gateway.ts
	- Scoreboard
		- <i class="devicon-typescript-plain"></i> score.entity.ts
		- <i class="devicon-typescript-plain"></i> score.module.ts
		- <i class="devicon-typescript-plain"></i> score.controller.ts
		- <i class="devicon-typescript-plain"></i> score.service.ts
	- Users
		- <i class="devicon-typescript-plain"></i> users.entity.ts
		- <i class="devicon-typescript-plain"></i> users.module.ts
		- <i class="devicon-typescript-plain"></i> users.controller.ts
		- <i class="devicon-typescript-plain"></i> users.service.ts
		- <i class="devicon-typescript-plain"></i> users.seraliser.ts
