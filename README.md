Based on this GitHub Repo:

https://github.com/42akurz/ft_transcendence

It's the simplest and smallest Transcendence Project I can find.

# To-Do

- Fix up the Backend.

# Setup

<img width="712" alt="Screen Shot 2023-05-24 at 5 14 35 PM" src="https://github.com/pasqualerossi/42_Transcendence/assets/58959408/e44a0292-7d40-4901-a085-f0f266ac0822">

# Project Structure

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">

- <i class="devicon-docker-plain"></i> Docker-Compose.yml
- <i class="devicon-c-plain"></i> Makefile
- :house: Frontend
  - <i class="devicon-javascript-plain"></i> Babel.config.js
  - <i class="devicon-javascript-plain"></i> vue.config.js
  - <i class="devicon-javascript-plain"></i> jsconfig.json
  - <i class="devicon-javascript-plain"></i> package.json
  - <i class="devicon-docker-plain"></i> Dockerfile
  - :telescope: src
  	- <i class="devicon-vuejs-plain"></i> Main.vue
	- :signal_strength: Router
		- <i class="devicon-javascript-plain"></i> index.js
	- :convenience_store: Store
		- <i class="devicon-javascript-plain"></i> index.js
	- :framed_picture: Assets
		- 42-logo-white.svg
		- <i class="devicon-css3-plain"></i> main.css
	- :robot: Components
		- :speaking_head: Chat
			- <i class="devicon-vuejs-plain"></i> BaseCardRoom.vue 
			- <i class="devicon-vuejs-plain"></i> ChatFooter.vue
			- <i class="devicon-vuejs-plain"></i> ChatHeader.vue
			- <i class="devicon-vuejs-plain"></i> ChatMain.vue
			- <i class="devicon-vuejs-plain"></i> ChatSideNav.vue
			- <i class="devicon-vuejs-plain"></i> ChatSideNavCreateRoom.vue
			- <i class="devicon-vuejs-plain"></i> ChatSideNavGroups.vue
			- <i class="devicon-vuejs-plain"></i> ChatSideNavPrivate.vue
		- :arrow_heading_down: Dropdown
			- <i class="devicon-vuejs-plain"></i> DropdownChatAdmin.vue
			- <i class="devicon-vuejs-plain"></i> DropdownChatHeader.vue
		- :busts_in_silhouette: Friends
			- <i class="devicon-vuejs-plain"></i> FriendsFind.vue
			- <i class="devicon-vuejs-plain"></i> FriendsList.vue
			- <i class="devicon-vuejs-plain"></i> FriendsRequest.vue
		- :ping_pong: Game
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
		- :arrow_heading_up: Popup
			- <i class="devicon-vuejs-plain"></i> PopupChoice.vue
			- <i class="devicon-vuejs-plain"></i> PopupInformation.vue
			- <i class="devicon-vuejs-plain"></i> PopupNumber.vue
			- <i class="devicon-vuejs-plain"></i> PopupPassword.vue
		- :bust_in_silhouette: Profile
			- <i class="devicon-vuejs-plain"></i> BaseBoxNumberWithTitle.vue
			- <i class="devicon-vuejs-plain"></i> BaseCardUser.vue
			- <i class="devicon-vuejs-plain"></i> BaseSwitch.vue
			- <i class="devicon-vuejs-plain"></i> ProfileButtons.vue
			- <i class="devicon-vuejs-plain"></i> ProfileMatchHistory.vue
			- <i class="devicon-vuejs-plain"></i> TheNavBar.vue
		- :gear: Settings
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
	
- :building_construction: Backend
  - <i class="devicon-javascript-plain"></i> nest-cli.json
  - <i class="devicon-javascript-plain"></i> package.json
  - <i class="devicon-javascript-plain"></i> tsconfig.build.json
  - <i class="devicon-javascript-plain"></i> tsconfig.json
  - <i class="devicon-docker-plain"></i> Dockerfile
  - :telescope: src
  	- <i class="devicon-typescript-plain"></i> Main.ts
	- :framed_picture: Assets
		- default-avatar.png
	- :desktop_computer: Authentication
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
	- :speaking_head: Chat
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
	- :package: Database
		- <i class="devicon-typescript-plain"></i> databaseFile.entity.ts
		- <i class="devicon-typescript-plain"></i> databaseFile.module.ts
		- <i class="devicon-typescript-plain"></i> databaseFile.controller.ts
		- <i class="devicon-typescript-plain"></i> databaseFile.service.ts
	- :ping_pong: Game
		- <i class="devicon-typescript-plain"></i> game.entity.ts
		- <i class="devicon-typescript-plain"></i> game.module.ts
		- <i class="devicon-typescript-plain"></i> game.controller.ts
		- <i class="devicon-typescript-plain"></i> game.service.ts
		- <i class="devicon-typescript-plain"></i> game.gateway.ts
	- :tv: Scoreboard
		- <i class="devicon-typescript-plain"></i> score.entity.ts
		- <i class="devicon-typescript-plain"></i> score.module.ts
		- <i class="devicon-typescript-plain"></i> score.controller.ts
		- <i class="devicon-typescript-plain"></i> score.service.ts
	- :busts_in_silhouette: Users
		- <i class="devicon-typescript-plain"></i> users.entity.ts
		- <i class="devicon-typescript-plain"></i> users.module.ts
		- <i class="devicon-typescript-plain"></i> users.controller.ts
		- <i class="devicon-typescript-plain"></i> users.service.ts
		- <i class="devicon-typescript-plain"></i> users.seraliser.ts


## 🖥️ Main Files

- 1 .yml file
- 1 Makefile

## 🏠 Frontend

- 48 .vue files
- 4 .js files
- 2 .json files
- 1 Dockerfile
- 1 .css file
- 1 .svg file

[![My Skills](https://skillicons.dev/icons?i=vue,js,docker,css,svg)](https://skillicons.dev)

Total of 57 Frontend Files

## :building_construction: Backend

- 41 .ts files
- 4 .json files
- 1 Dockerfile
- 1 .png file

[![My Skills](https://skillicons.dev/icons?i=ts,js,docker,nodejs,postgresql)](https://skillicons.dev)

Total of 47 Backend Files

## :bar_chart: Grand Total

Grand Total of 106 Files
