Based on this GitHub Repo:

https://github.com/42akurz/ft_transcendence

It's the simplest and smallest Transcendence Project I can find.

# To-Do

- Fix up the Backend.

# Project Structure

Docker-Compose.yml

Makefile

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
### :building_construction: Backend
```
  ├── nest-cli.json
  ├── tsconfig.json
  ├── tsconfig.build.json
  ├── package.json
  ├── Dockerfile
  └── src
      ├── Main.ts

	- Assets
		- default-avatar.png
	- Authentication
		- Authentication
			- authentication.controller.ts
			- authentication.module.ts
			- authentication.service.ts
		- FourtyTwo
			- fourtyTwo.strategy.ts
		- Interfaces
			- requestWithUser.interface.ts
		- JWT
			- jwt.strategy.ts
		- TwoFactor
			- twoFactor.controller.ts
			- twoFactor.dto.ts
			- twoFactor.guard.ts
			- twoFactor.service.ts
			- twoFactor.strategy.ts
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

<br>

## 🖥️ Interactive Short Videos

### Docker
[Link 1](https://www.youtube.com/watch?v=Gjnup-PuquQ)
[Link 2](https://www.youtube.com/watch?v=gAkwW2tuIqE)

### PostgreSQL

[Link 1](https://www.youtube.com/watch?v=zsjvFFKOm3c)
[Link 2](https://www.youtube.com/watch?v=Cz3WcZLRaWc)
[Link 3](https://www.youtube.com/watch?v=4QN1BzxF8wM)
[Link 4](https://www.youtube.com/watch?v=W2Z7fbCLSTw)

### TypeScript
[Link 1](https://www.youtube.com/watch?v=zQnBQ4tB3ZA)
[Link 2](https://www.youtube.com/watch?v=ahCwqrYpIuM)
[Link 3](https://www.youtube.com/watch?v=ydkQlJhodio)
[Link 4](https://www.youtube.com/watch?v=H91aqUHn8sE)

### Vue
[Link 1](https://www.youtube.com/watch?v=nhBVL41-_Cw)
[Link 2](https://www.youtube.com/watch?v=wvRVfyPKOA0)
[Link 3](https://www.youtube.com/watch?v=cuHDQhDhvPE)

### NestJS
[Link 1](https://www.youtube.com/watch?v=0M8AYU_hPas)

### JSON
[Link 1](https://www.youtube.com/watch?v=rZUfzlOIqJo)

### JavaScript
[Link 1](https://www.youtube.com/watch?v=DHjqpvDnNGE&pp=ygUTamF2YXNjcmlwdCBmaXJlc2hpcA%3D%3D)
[Link 2](https://www.youtube.com/watch?v=9emXNzqCKyg)
[Link 3](https://www.youtube.com/watch?v=FSs_JYwnAdI)
[Link 4](https://www.youtube.com/watch?v=Mus_vwhTCq0)
[Link 5](https://www.youtube.com/watch?v=Sh6lK57Cuk4)
[Link 6](https://www.youtube.com/watch?v=lkIFF4maKMU&pp=ygUTamF2YXNjcmlwdCBmaXJlc2hpcA%3D%3D)
[Link 7](https://www.youtube.com/watch?v=aXOChLn5ZdQ)

### CSS
[Link 1](https://www.youtube.com/watch?v=OEV8gMkCHXQ)
[Link 2](https://www.youtube.com/watch?v=Qhaz36TZG5Y)
[Link 3](https://www.youtube.com/watch?v=K74l26pE4YA)
[Link 4](https://www.youtube.com/watch?v=ouncVBiye_M)
[Link 5](https://www.youtube.com/watch?v=705XCEruZFs)
[Link 6](https://www.youtube.com/watch?v=uuOXPWCh-6o)
[Link 7](https://www.youtube.com/watch?v=NtRmIp4eMjs)

### YML
[Link 1](https://www.youtube.com/watch?v=0fbnyS_lHW4)

### Chat
[Link 1](https://www.youtube.com/watch?v=UBUNrFtufWo)

### Web Development
[Link 1](https://www.youtube.com/watch?v=erEgovG9WBs)
[Link 2](https://www.youtube.com/watch?v=q1fsBWLpYW4)
[Link 3](https://www.youtube.com/watch?v=Sxxw3qtb3_g)

<br>

## Project Overview

<img width="796" alt="Screen Shot 2023-06-05 at 3 32 22 PM" src="https://github.com/pasqualerossi/42_Transcendence/assets/58959408/fc3c968e-96ac-4770-a90d-3ab4a4d18941">
