# Project Structure

```
Docker-Compose.yml
```

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
      ├── Assets
      │   └── Default-Avatar.png
      ├── Authentication
      │	  ├── Authentication
      │	  │   ├── Authentication.Controller.ts
      │	  │   ├── Authentication.Module.ts
      │	  │   └── Authentication.Service.ts
      │	  ├── FourtyTwo
      │	  │   └── FourtyTwo.Strategy.ts
      │	  ├── Interfaces
      │	  │   └── RequestWithUser.Interface.ts
      │	  ├── JSONWebToken
      │	  │   └── JWT.Strategy.ts
      │	  └── TwoFactor
      │	      ├── TwoFactor.Controller.ts
      │	      ├── TwoFactor.Dto.ts
      │	      ├── TwoFactor.Guard.ts
      │	      ├── TwoFactor.Service.ts
      │	      └── TwoFactor.Strategy.ts
      ├── Chat
      │	  ├── Controllers
      │	  │   ├── Chat.Controller.ts
      │	  │   └── Muted.Controller.ts
      │	  ├── Entities
      │	  │   ├── Message.Entity.ts
      │	  │   ├── Muted.Entity.ts
      │	  │   └── Room.Entity.ts
      │	  ├── Modules
      │	  │   └── Chat.Module.ts
      │	  ├── Services
      │	  │   ├── Chat.Service.ts
      │	  │   ├── Message.Service.ts
      │	  │   ├── Muted.Service.ts
      │	  │   └── Room.Service.ts
      │	  └── Gateway
      │	      └── Chat.Gateway.ts
      ├── Database
      │	  ├── DatabaseFile.Entity.ts
      │	  ├── DatabaseFile.Module.ts
      │	  ├── DatabaseFile.Controller.ts
      │	  └── DatabaseFile.Service.ts
      ├── Game
      │	  ├── Game.Entity.ts
      │	  ├── Game.Module.ts
      │	  ├── Game.Controller.ts
      │	  ├── Game.Service.ts
      │	  └── Game.Gateway.ts
      ├── Scoreboard
      │	  ├── Score.Entity.ts
      │	  ├── Score.Module.ts
      │	  ├── Score.Controller.ts
      │	  └── Score.Service.ts
      └── Users
	  ├── Users.Entity.ts
	  ├── Users.Module.ts
	  ├── Users.Controller.ts
	  ├── Users.Service.ts
	  └── Users.Seraliser.ts
```
<br>
<br>

### 🖥️ Main Files

- 1 .yml file

### 🏠 Frontend

- 48 .vue files
- 4 .js files
- 2 .json files
- 1 Dockerfile
- 1 .css file
- 1 .svg file

[![My Skills](https://skillicons.dev/icons?i=vue,js,docker,css,svg)](https://skillicons.dev)

Total of 57 Frontend Files

### :building_construction: Backend

- 41 .ts files
- 4 .json files
- 1 Dockerfile
- 1 .png file

[![My Skills](https://skillicons.dev/icons?i=ts,js,docker,nodejs,postgresql,nestjs)](https://skillicons.dev)

Total of 47 Backend Files

### :bar_chart: Grand Total

Grand Total of 105 Files

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

## Security

<img width="735" alt="Screen Shot 2023-06-06 at 8 32 07 PM" src="https://github.com/pasqualerossi/42_Transcendence/assets/58959408/167c8acf-759a-48c4-a0be-71859a6b30c3">

## Libraries and Frameworks

### Backend

#### NestJS
- @nestjs/platform-express
- @nestjs/common
- @nestjs/typeorm
- @nestjs/jwt
- @nestjs/config
- @nestjs/swagger
- @nestjs/platform-express
- @nestjs/core
- @nestjs/passport
- @nestjs/websockets

#### Other
- class-transformer
- typeorm
- express
- bcrypt
- otplib
- qrcode
- stream
- socket.io
- passport-42
- passport-jwt
- cookie-parser

### Frontend

- vue-router

## TypeScript Frameworks

[![My Skills](https://skillicons.dev/icons?i=vue,react,angular,nextjs,express)](https://skillicons.dev)

In this project, you can use any of the following:

- Vue (Our Chosen Framework For This Project)
- React
- Angular
- NextJS
- ExpressJS
