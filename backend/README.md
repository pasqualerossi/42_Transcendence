## Project Structure

### :building_construction: Backend
```
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
      │    ├── Pong
      │    │   ├── Game.Entity.ts
      │	   │   ├── Game.Module.ts
      │	   │   ├── Game.Controller.ts
      │	   │   ├── Game.Service.ts
      │	   │   └── Game.Gateway.ts
      │    └── Scoreboard
      │	      ├── Score.Entity.ts
      │	      ├── Score.Module.ts
      │	      ├── Score.Controller.ts
      │	      └── Score.Service.ts
      └── Users
	  ├── Users.Entity.ts
	  ├── Users.Module.ts
	  ├── Users.Controller.ts
	  ├── Users.Service.ts
	  └── Users.Seraliser.ts
```

<br>

### 📂 File Extensions Explained

<br>

🎮 Controller.ts
- Handles requests from users and sends back responses. It's like a traffic cop directing the flow of information.

📦 Module.ts 
- Groups related parts of the application together. Think of it as putting similar things in the same box for organisation.

👷 Service.ts
- Provides specific functions or tasks that the application needs. It's like having specialized workers who can do specific jobs.

🕴️ Strategy.ts
- Defines different ways to solve a problem. It's like having different approaches or methods to tackle a task.

🖥️ Interface.ts
- Sets rules for how different parts of the application should work together. It's like having a blueprint or a contract that everyone agrees to follow.

🗒️ Dto.ts
- Defines a structure for transferring data between different parts of the application. It's like having a standardised form for sharing information.

💂 Guard.ts
- Protects certain parts of the application and allows access only to authorised users or under specific conditions. It's like having security guards at the entrance to check who can enter.

🧍 Entity.ts
- Represents a specific object or thing in the application, such as a user or a product. It's like having a model or a representation of something you want to work with.

📅 Serialiser.ts
- Converts data into a format that can be easily stored, sent, or displayed. It's like translating information into a language that computers or other systems can understand.

<br>

## :building_construction: Files Count

- 41 .ts files
- 4 .json files
- 1 Dockerfile
- 1 .png file

[![My Skills](https://skillicons.dev/icons?i=ts,js,docker,nodejs,postgresql,nestjs)](https://skillicons.dev)

Total of 47 Backend Files

<br>

## :building_construction: Backend Libraries and Frameworks

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

<br>

# 🎥 Introduction Videos

## Docker
[Link 1](https://www.youtube.com/watch?v=Gjnup-PuquQ)
[Link 2](https://www.youtube.com/watch?v=gAkwW2tuIqE)

## PostgreSQL

[Link 1](https://www.youtube.com/watch?v=zsjvFFKOm3c)
[Link 2](https://www.youtube.com/watch?v=Cz3WcZLRaWc)
[Link 3](https://www.youtube.com/watch?v=4QN1BzxF8wM)
[Link 4](https://www.youtube.com/watch?v=W2Z7fbCLSTw)

## TypeScript
[Link 1](https://www.youtube.com/watch?v=zQnBQ4tB3ZA)
[Link 2](https://www.youtube.com/watch?v=ahCwqrYpIuM)
[Link 3](https://www.youtube.com/watch?v=ydkQlJhodio)
[Link 4](https://www.youtube.com/watch?v=H91aqUHn8sE)

## NestJS
[Link 1](https://www.youtube.com/watch?v=0M8AYU_hPas)

## JSON
[Link 1](https://www.youtube.com/watch?v=rZUfzlOIqJo)

## Chat
[Link 1](https://www.youtube.com/watch?v=UBUNrFtufWo)

## Web Development
[Link 1](https://www.youtube.com/watch?v=erEgovG9WBs)
[Link 2](https://www.youtube.com/watch?v=q1fsBWLpYW4)
[Link 3](https://www.youtube.com/watch?v=Sxxw3qtb3_g)
