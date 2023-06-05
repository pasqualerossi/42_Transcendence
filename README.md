Based on this GitHub Repo:

https://github.com/42akurz/ft_transcendence

It's the simplest and smallest Transcendence Project I can find.

# To-Do

- Fix up the Backend.

# Project Structure

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">

- <i class="devicon-docker-plain"></i> Docker-Compose.yml
- <i class="devicon-c-plain"></i> Makefile
### :house: Frontend
```
  ├── Babel.config.js
  ├── vue.config.js
  ├── jsconfig.json
  ├── package.json
  ├── Dockerfile
  └── src
      ├── Main.vue
      ├── Router
      |   └── index.js
      ├── Store
      |   └── index.js
      ├── Assets
      |   ├── 42-logo-white.svg
      |	  └── main.css
      ├── Components
      |   ├── Chat
      |   │   ├── BaseCardRoom.vue
      |	  │   ├── ChatFooter.vue
      |   │   ├── ChatHeader.vue
      |   │   ├── ChatMain.vue
      |   │   ├── ChatSideNav.vue
      |	  │   ├── ChatSideNavCreateRoom.vue
      |	  │   ├── ChatSideNavGroups.vue
      |	  │   └── ChatSideNavPrivate.vue
      |	  ├── Dropdown
      |	  │   ├── DropdownChatAdmin.vue
      |	  │   └── DropdownChatHeader.vue
      |	  ├── Friends
      |	  │   ├── FriendsFind.vue
      |	  │   ├── FriendsList.vue
      |	  │   └── FriendsRequest.vue
      |	  ├── Game
      |	  │   ├── BaseCardGameSpectate.vue
      |	  │   ├── BaseCardMatchHistory.vue
      |	  │   ├── GameInvitePlayers.vue
      |	  │   ├── GamePauseMenu.vue
      |	  │   ├── GamePlayers.vue
      |	  │   ├── GameResult.vue
      |	  │   ├── GameScore.vue
      |	  │   ├── GameSearch.vue
      |	  │   ├── GameSpectate.vue
      |	  │   └── TheGameInviteBox.vue
      |	  ├── Popup
      |	  │   ├── PopupChoice.vue
      |	  │   ├── PopupInformation.vue
      |	  │   ├── PopupNumber.vue
      |	  │   └── PopupPassword.vue
      |	  ├── Profile
      |	  │   ├── BaseBoxNumberWithTitle.vue
      |	  │   ├── BaseCardUser.vue
      |	  │   ├── BaseSwitch.vue
      |	  │   ├── ProfileButtons.vue
      |	  │   ├── ProfileMatchHistory.vue
      |	  │   └── TheNavBar.vue
      |	  └── Settings
      |	      ├── SettingsChangeAvatar.vue
      |	      ├── SettingsChangeName.vue
      |	      ├── SettingsChangeStatus.vue
      |	      └── SettingsTwoFactorSetup.vue
      └── Views
          ├── ChatView
          |   └── ChatView.vue
      	  ├── FriendsView
      	  │   └── FriendsView.vue
      	  ├── GameLobbyView
      	  │   └── GameLobbyView.vue
      	  ├── GameRoomView
      	  │   └── GameRoomView.vue
          ├── LoginView
      	  │   └── LoginView.vue
      	  ├── ProfileView
      	  │   └── ProfileView.vue
      	  ├── ScoreBoardView
      	  │   └── ScoreBoardView.vue
      	  ├── SettingsView
      	  │   └── SettingsView.vue
	  └── TwoFactorLoginView	
              └── TwoFactorLoginView
```
- :building_construction: Backend
```
  - <i class="devicon-npm-original-wordmark"></i> nest-cli.json
  - <i class="devicon-npm-original-wordmark"></i> package.json
  - <i class="devicon-npm-original-wordmark"></i> tsconfig.build.json
  - <i class="devicon-npm-original-wordmark"></i> tsconfig.json
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
```
<br>
<br>

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

[![My Skills](https://skillicons.dev/icons?i=ts,js,docker,nodejs,postgresql,nestjs)](https://skillicons.dev)

Total of 47 Backend Files

## :bar_chart: Grand Total

Grand Total of 106 Files
