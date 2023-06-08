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

### File Extensions Explained
```
Controller.ts
- Manages requests and responses for parts of the application.

Module.ts 
- Groups related components together.

Service.ts
- Provides specific functions and operations that other parts of the application can use.

Strategy.ts
- Defines different ways to solve a problem and allows the application to choose the best approach at runtime.

Interface.ts
-  Sets rules for how different parts of the application should interact and communicate.

Dto.ts
- Defines a structure for transferring data between different parts of the application.

Guard.ts
- Ensures that certain parts of the application can only be accessed by authorised users or under specific conditions.

Entity.ts
- Represents a specific object or concept within the application, such as a user or a product.

Serialiser.ts
- Converts objects or data into a format that can be easily stored, sent, or displayed.
```
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
