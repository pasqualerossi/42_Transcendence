import { Injectable, Logger } from '@nestjs/common';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { Socket } from 'socket.io';
import { GameData } from './game.entity';
import { ScoreService } from 'src/scoreboard/score.service';
import { Score } from 'src/scoreboard/score.entity';


@Injectable()
export class GameService {
	constructor(
		private readonly usersService: UsersService,
		private readonly scoreService: ScoreService,
	) {}

	private logger: Logger = new Logger(GameService.name)

	/************************** GAME DATA **************************/
	public gameKeyToReadyPlayers: Map<number, number[]> = new Map()
	public gameRooms: Map<number, GameData> = new Map()
	private pendingInvitations: Map<number, GameData> = new Map()
	private gameKeyToActionTimeout: Map<number, NodeJS.Timeout> = new Map()
	/************************** GAME DATA **************************/
	
	/************************* GAME CONFIG *************************/
	private readonly BASE_PADDLE_SPEED: number = 30
	private readonly BASE_BALL_SPEED: number = 4
	private readonly BASE_BALL_SPEED_INCREASE: number = 1
	private readonly BASE_SCORE_LIMIT: number = 5
	private readonly BASE_ACTION_INTERVAL_MS: number = 6000
	private readonly BASE_COUNTDOWN_SECONDS: number = 5
	
	private readonly BASE_COLOR_WALL: string = 'black'
	private readonly BASE_COLOR_BACKGROUND: string = '#EFEFEF'
	private readonly BASE_COLOR_PADDLE: string = 'black'
	private readonly BASE_COLOR_BALL: string = '#185ADB'
	
	private readonly BASE_CANVAS_HEIGHT: number = 585
	private readonly BASE_CANVAS_WIDTH: number = 750
	private readonly BASE_GRID: number = 15
	private readonly BASE_PADDLE_HEIGHT: number = this.BASE_GRID * 5
	/************************* GAME CONFIG *************************/

	async validateToken(client: Socket) {
		const userId: number = Number(client.handshake.headers.authorization);
		const user = await this.usersService.findById(userId);
		if (!user) {
			client.disconnect();
			return null;
		}
		return user;
	}

	/* INIT */
	initGameData(gameData: GameData): GameData {
		gameData.canvasHeight = this.BASE_CANVAS_HEIGHT
		gameData.canvasWidth = this.BASE_CANVAS_WIDTH
		gameData.grid = this.BASE_GRID
		gameData.paddleHeight = this.BASE_PADDLE_HEIGHT
		gameData.maxPaddleY = this.BASE_CANVAS_HEIGHT - this.BASE_GRID - this.BASE_PADDLE_HEIGHT

		gameData.paddleSpeed = this.BASE_PADDLE_SPEED
		gameData.ballSpeed = this.BASE_BALL_SPEED

		gameData.wallColor = this.BASE_COLOR_WALL
		gameData.backgroundColor = this.BASE_COLOR_BACKGROUND

		gameData.gameLoopIntervalID = null
		gameData.spectatorsID = []

		gameData.leftPaddle = {
			x: this.BASE_GRID * 2,
			y: this.BASE_CANVAS_HEIGHT / 2 - this.BASE_PADDLE_HEIGHT / 2,
			width: this.BASE_GRID,
			height: this.BASE_PADDLE_HEIGHT,
			velocity: 0,
			color: this.BASE_COLOR_PADDLE,
		}

		gameData.rightPaddle = {
			x: this.BASE_CANVAS_WIDTH - this.BASE_GRID * 3,
			y: this.BASE_CANVAS_HEIGHT / 2 - this.BASE_PADDLE_HEIGHT / 2,
			width: this.BASE_GRID,
			height: this.BASE_PADDLE_HEIGHT,
			velocity: 0,
			color: this.BASE_COLOR_PADDLE,
		}

		gameData.ball = {
			x: this.BASE_CANVAS_WIDTH / 2,
			y: this.BASE_CANVAS_HEIGHT / 2,
			width: this.BASE_GRID,
			height: this.BASE_GRID,
			resetting: false,
			velocityY: this.BASE_BALL_SPEED,
			velocityX: -this.BASE_BALL_SPEED,
			color: this.BASE_COLOR_BALL,
		}

		gameData.score = {
			limit: this.BASE_SCORE_LIMIT,
			left: 0,
			right: 0,
		}

		return gameData;
	}
	/* INIT */


	/* GAME ENGINE */
	movePedal(gameKey: number, userId: number, pedalDirection: string) {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey)
		if (!gameInstance)
			return ;
		if (userId === gameInstance.userLeftSideID) {
			const updatedPedalLeft = {...gameInstance.leftPaddle};
			if (pedalDirection === 'up')
				updatedPedalLeft.velocity = -gameInstance.paddleSpeed;
			else if (pedalDirection === 'down')
				updatedPedalLeft.velocity = gameInstance.paddleSpeed;
			// move paddles by their velocity
			updatedPedalLeft.y += updatedPedalLeft.velocity;
			// prevent paddles from going through walls
			if (updatedPedalLeft.y < gameInstance.grid)
				updatedPedalLeft.y = gameInstance.grid;
			else if (updatedPedalLeft.y > gameInstance.maxPaddleY)
				updatedPedalLeft.y = gameInstance.maxPaddleY;
			this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey), leftPaddle: updatedPedalLeft})
		}
		else if (userId === gameInstance.userRightSideID) {
			const updatedPedalRight = {...gameInstance.rightPaddle};
			if (pedalDirection === 'up')
				updatedPedalRight.velocity = -gameInstance.paddleSpeed;
			else if (pedalDirection === 'down')
				updatedPedalRight.velocity = gameInstance.paddleSpeed;
			// move paddles by their velocity
			updatedPedalRight.y += updatedPedalRight.velocity;
			// prevent paddles from going through walls
			if (updatedPedalRight.y < gameInstance.grid)
				updatedPedalRight.y = gameInstance.grid;
			else if (updatedPedalRight.y > gameInstance.maxPaddleY)
				updatedPedalRight.y = gameInstance.maxPaddleY;
			this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey), rightPaddle: updatedPedalRight})
		}
	}

	moveBall(gameKey: number) {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey)
		if (!gameInstance)
			return ;
		const updatedBall = {...gameInstance.ball};
		// move ball by its velocity with an increasing speed
		updatedBall.x += (updatedBall.velocityX *= this.BASE_BALL_SPEED_INCREASE);
		updatedBall.y += (updatedBall.velocityY *= this.BASE_BALL_SPEED_INCREASE);
		// prevent ball from going through walls by changing its velocity
		if (updatedBall.y < gameInstance.grid) {
			updatedBall.y = gameInstance.grid;
			updatedBall.velocityY *= -1;
		}
		else if (updatedBall.y + gameInstance.grid > gameInstance.canvasHeight - gameInstance.grid) {
			updatedBall.y = gameInstance.canvasHeight - gameInstance.grid * 2;
			updatedBall.velocityY *= -1;
		}
		this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey), ball: updatedBall})
	}

	collides(obj1: any, obj2: any) {
		if (obj1.x && obj2.x && obj1.y && obj2.y && obj1.width && obj2.width && obj1.height && obj2.height) {
			return obj1.x < obj2.x + obj2.width &&
					obj1.x + obj1.width > obj2.x &&
					obj1.y < obj2.y + obj2.height &&
					obj1.y + obj1.height > obj2.y;
		}
		else
			return false
	}

	ballCollision(gameKey: number) {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey)
		if (!gameInstance)
			return ;
		const updatedBall = {...gameInstance.ball};

		// check to see if ball collides with paddle. if they do change x velocity
		if (this.collides(updatedBall, gameInstance.leftPaddle)) {
			updatedBall.velocityX *= -1;

			// move ball next to the paddle otherwise the collision will happen again
			// in the next frame
			updatedBall.x = gameInstance.leftPaddle.x + gameInstance.leftPaddle.width;
		}
		else if (this.collides(updatedBall, gameInstance.rightPaddle)) {
			updatedBall.velocityX *= -1;

			// move ball next to the paddle otherwise the collision will happen again
			// in the next frame
			updatedBall.x = gameInstance.rightPaddle.x - updatedBall.width;
		}
		this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey), ball: updatedBall})
	}

	changeBallSpeed(x: number = this.BASE_BALL_SPEED, updatedBall: any) {
		if (updatedBall.velocityX < 0)
			updatedBall.velocityX = -x;
		else
			updatedBall.velocityX = x;
		
		if (updatedBall.velocityY < 0)
			updatedBall.velocityY = -x;
		else
			updatedBall.velocityY = x;

		return updatedBall;
	}

	// TODO: give some time for the player to recover before launching the ball again
	resetBall(gameKey: number) {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey)
		if (!gameInstance)
			return ;

		const updatedBall = {...gameInstance.ball};
		const updatedScore = {...gameInstance.score};

		// reset ball if it goes past paddle (but only if we haven't already done so)
		if ((updatedBall.x < 0 || updatedBall.x > gameInstance.canvasWidth) && !updatedBall.resetting) {
			updatedBall.resetting = true;

			// increase score counter after goal
			if (updatedBall.x < 0)
				updatedScore.right++;
			if (updatedBall.x > gameInstance.canvasWidth)
				updatedScore.left++;

			// resets ball speed after each goal
			const {velocityX, velocityY} = this.changeBallSpeed(this.BASE_BALL_SPEED, updatedBall);
			updatedBall.velocityX = velocityX;
			updatedBall.velocityY = velocityY;
			updatedBall.resetting = false;
			// reset ball to center of screen
			updatedBall.x = gameInstance.canvasWidth / 2;
			updatedBall.y = gameInstance.canvasHeight / 2;
			// make ball go to player that scored last goal
			updatedBall.velocityY *= (-1);
			updatedBall.velocityX *= (-1);
		}
		this.gameRooms.set(gameKey, {
			...this.gameRooms.get(gameKey),
			ball: updatedBall,
			score: updatedScore,
		})
	}
	/* GAME ENGINE */


	/* UTILS */
	gameIsWaitingForPlayer(gameKey: number): boolean {
		const game: GameData | undefined = this.gameRooms.get(gameKey);
		if (!game)
			return false;
		if (game.userLeftSideID && !game.userRightSideID)
			return true;
		return false;
	}

	deleteGame(gameKey: number) {
		this.gameRooms.delete(gameKey);
	}

	findKeyOfAvailableGame(specialActions: boolean): number | undefined {
		if (specialActions === true) {
			for (let [key, value] of this.gameRooms.entries()) {
				if (value.userLeftSideID && !value.userRightSideID && value.specialAction)
					return key;
			}
		}
		else if (specialActions === false) {
			for (let [key, value] of this.gameRooms.entries()) {
				if (value.userLeftSideID && !value.userRightSideID && !value.specialAction)
					return key;
			}
		}
		return undefined;
	}

	findGameKeyByPlayerID(playerId: number): number | undefined {
		for (let [key, value] of this.gameRooms.entries()) {
			if (value.userLeftSideID && !value.userRightSideID)
				if (playerId === value.userLeftSideID)
					return key;
			if (value.userLeftSideID && value.userRightSideID) {
				if (playerId === value.userLeftSideID || playerId === value.userRightSideID)
					return key;
			}
		}
		return undefined;
	}

	getWinnerID(gameInstance: GameData): number {
		if (gameInstance.score.left > gameInstance.score.right)
			return gameInstance.userLeftSideID;
		return gameInstance.userRightSideID;
	}
	
	getLoserID(gameInstance: GameData): number {
		if (gameInstance.score.left > gameInstance.score.right)
			return gameInstance.userRightSideID;
		return gameInstance.userLeftSideID;
	}

	getOtherPlayerID(gameKey: number, playerId: number): number | undefined {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey);
		if (!gameInstance)
			return undefined;
		if (gameInstance.userLeftSideID === playerId)
			return gameInstance.userRightSideID;
		if (gameInstance.userRightSideID === playerId)
			return gameInstance.userLeftSideID;
		return undefined;
	}

	timeout(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	randomNumberBetween(min: number, max: number): number {
		return (Math.floor((Math.random() * (max - min) + min)));
	}

	userIsSpectator(gameKey: number, userId: number): boolean | undefined {
		const room: GameData | undefined = this.gameRooms.get(gameKey);
		if (!room)
			return undefined;
		return room.spectatorsID.includes(userId);
	}

	userIsInWaitingRoom(userId: number): number | undefined {
		for (let [key, value] of this.gameRooms.entries()) {
			if (value.userLeftSideID && !value.userRightSideID) {
				if (userId === value.userLeftSideID)
					return key;
			}
		}
		return undefined;
	}

	async getPlayersByGameKey(gameKey: number): Promise<Object | void> {
		const game: GameData | undefined = this.gameRooms.get(gameKey);
		if (!game)
			return ;
		const playerLeft: User | null = await this.usersService.findById(game.userLeftSideID);
		const playerRight: User | null = await this.usersService.findById(game.userRightSideID);
		if (!playerLeft || !playerRight)
			return ;
		return {playerLeft, playerRight}
	}
	/* UTILS */


	/* GAME STATE */
	async gameOver(client: Socket, gameInstance: GameData, gameKey: number) {
		const winnerId: number = this.getWinnerID(gameInstance);
		const loserId: number = this.getLoserID(gameInstance);
		client.nsp.to(gameKey.toString()).emit('playerWins', {winnerId, loserId});
		clearTimeout(this.gameKeyToActionTimeout.get(gameKey));
		this.gameKeyToActionTimeout.delete(gameKey);
		clearInterval(gameInstance.gameLoopIntervalID);
		const newScore: Score = new Score({
			playerOneId: gameInstance.userLeftSideID,
			playerTwoId: gameInstance.userRightSideID,
			scorePlayerOne: gameInstance.score.left,
			scorePlayerTwo: gameInstance.score.right,
		})
		await this.scoreService.addScore(newScore, winnerId, loserId);
		this.usersService.addWin(winnerId);
		this.usersService.addLose(loserId);
		this.deleteGame(gameKey);
		await this.usersService.setStatus(1, winnerId);
		await this.usersService.setStatus(1, loserId);
	}

	checkWinner(gameKey: number, client: Socket): boolean {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey);
		if (!gameInstance)
			return ;
		if (gameInstance.score.left >= gameInstance.score.limit
			|| gameInstance.score.right >= gameInstance.score.limit) {
				this.gameOver(client, gameInstance, gameKey);
				return true;
			}
		return false;
	}

	startGameCountdown(client: Socket, gameKey: number, countdownSeconds: number) {
		let counter: number = countdownSeconds;
		client.nsp.to(gameKey.toString()).emit('countdown', counter);
		const intervalId = setInterval(() => {
			counter--;
			client.nsp.to(gameKey.toString()).emit('countdown', counter);
			if (counter === 0) {
				clearInterval(intervalId);
				client.nsp.to(gameKey.toString()).emit('killCountdown');
			}
		}, 1000)
	}

	gameLoop(client: Socket, gameKey: number) {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey);
		if (!gameInstance)
			return ;
		const intervalID = setInterval(() => {
			this.moveBall(gameKey);
			this.resetBall(gameKey);
			if (!this.checkWinner(gameKey, client))
				this.ballCollision(gameKey);
			client.nsp.to(gameKey.toString()).emit('updateGame', this.gameRooms.get(gameKey));
		}, 16);
		this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey), gameLoopIntervalID: intervalID})
		if (gameInstance.specialAction)
			this.startActionInterval(gameKey);
	}

	async startGame(client: Socket, gameKey: number) {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey);
		if (!gameInstance)
			return ;
		await this.usersService.setStatus(2, gameInstance.userLeftSideID);
		await this.usersService.setStatus(2, gameInstance.userRightSideID);
		this.gameRooms.set(gameKey, this.initGameData(gameInstance))
		this.startGameCountdown(client, gameKey, this.BASE_COUNTDOWN_SECONDS);
		await this.timeout(this.BASE_COUNTDOWN_SECONDS * 1000);
		this.gameLoop(client, gameKey);
	}

	pauseGame(gameKey: number) {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey);
		if (!gameInstance)
			return ;
		clearTimeout(this.gameKeyToActionTimeout.get(gameKey));
		this.gameKeyToActionTimeout.delete(gameKey);
		clearInterval(gameInstance.gameLoopIntervalID);
	}

	resumeGame(client: Socket, gameKey: number) {
		this.gameLoop(client, gameKey);
	}

	async exitGame(quitterId: number, gameKey: number) {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey);
		if (!gameInstance)
			return ;
		const winnerId: number | undefined = this.getOtherPlayerID(gameKey, quitterId);
		clearTimeout(this.gameKeyToActionTimeout.get(gameKey));
		this.gameKeyToActionTimeout.delete(gameKey);
		clearInterval(gameInstance.gameLoopIntervalID);
		const newScore: Score = new Score({
			playerOneId: winnerId,
			playerTwoId: quitterId,
			scorePlayerOne: 3,
			scorePlayerTwo: 0,
		})
		await this.scoreService.addScore(newScore, winnerId, quitterId);
		this.usersService.addWin(winnerId);
		this.usersService.addLose(quitterId);
		this.deleteGame(gameKey);
		await this.usersService.setStatus(1, winnerId);
		await this.usersService.setStatus(1, quitterId);
	}
	/* GAME STATE */


	/* MATCHMAKING */
	createGameInstance(createrId: number, specialActions: boolean): string {
		const newGameRoom: GameData = new GameData();
		newGameRoom.userLeftSideID = createrId;
		newGameRoom.specialAction = specialActions;
		newGameRoom.spectatorsID = [];
		this.gameRooms.set(createrId, newGameRoom);
		return createrId.toString();
	}

	joinGameInstance(gameKey: number, joinerId: number): string {
		this.gameRooms.set(
			gameKey,
			{...this.gameRooms.get(gameKey), userRightSideID: joinerId}
		);
		return gameKey.toString();
	}

	sendGameInvitation(senderId: number) {
		const gameInstance: GameData = new GameData()
		gameInstance.userLeftSideID = senderId
		gameInstance.specialAction = false
		gameInstance.spectatorsID = []
		this.pendingInvitations.set(senderId, gameInstance);
	}

	spectateGameInstance(gameKey: number, spectatorId: number): string {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey);
		if (!gameInstance)
			return ;
		const spectators: number[] = gameInstance.spectatorsID;
		spectators.push(spectatorId);
		this.gameRooms.set(
			gameKey,
			{...this.gameRooms.get(gameKey), spectatorsID: spectators}
		);
		return gameKey.toString();
	}
	/* MATCHMAKING */


	/* RANDOM ACTIONS */
	actionIncreasePedalSize(gameKey: number, gameInstance: GameData) {
		// only change pedal size if its not biggest size already
		if (gameInstance.leftPaddle.height == this.BASE_PADDLE_HEIGHT * 2)
			return ;

		const updatedPedalLeft = {...gameInstance.leftPaddle};
		const updatedPedalRight = {...gameInstance.rightPaddle};

		// change pedal height
		updatedPedalLeft.height *= 2;
		updatedPedalRight.height *= 2;
		this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey), leftPaddle: updatedPedalLeft, rightPaddle: updatedPedalRight})

		// change pedal position if it collides with wall
		if (gameInstance.leftPaddle.height == this.BASE_PADDLE_HEIGHT) {
			this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey),
				maxPaddleY: gameInstance.canvasHeight - gameInstance.grid - this.BASE_PADDLE_HEIGHT * 2
			})
		}
		else {
			this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey),
				maxPaddleY: gameInstance.canvasHeight - gameInstance.grid - this.BASE_PADDLE_HEIGHT
			})
		}
	}

	actionDecreasePedalSize(gameKey: number, gameInstance: GameData) {
		// only change pedal size if its not smallest size already
		if (gameInstance.leftPaddle.height == this.BASE_PADDLE_HEIGHT / 2)
			return ;

		const updatedPedalLeft = {...gameInstance.leftPaddle};
		const updatedPedalRight = {...gameInstance.rightPaddle};

		// change pedal height
		updatedPedalLeft.height /= 2;
		updatedPedalRight.height /= 2;
		this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey), leftPaddle: updatedPedalLeft, rightPaddle: updatedPedalRight})

		// change pedal position if it collides with wall
		if (gameInstance.leftPaddle.height == this.BASE_PADDLE_HEIGHT) {
			this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey),
				maxPaddleY: gameInstance.canvasHeight - gameInstance.grid - this.BASE_PADDLE_HEIGHT / 2
			})
		}
		else {
			this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey),
				maxPaddleY: gameInstance.canvasHeight - gameInstance.grid - this.BASE_PADDLE_HEIGHT
			})
		}
	}

	actionResetPedalSize(gameKey: number, gameInstance: GameData) {
		if (gameInstance.leftPaddle.height == this.BASE_PADDLE_HEIGHT)
			return ;

		const updatedPedalLeft = {...gameInstance.leftPaddle};
		const updatedPedalRight = {...gameInstance.rightPaddle};
		
		updatedPedalLeft.height = this.BASE_PADDLE_HEIGHT;
		updatedPedalRight.height = this.BASE_PADDLE_HEIGHT;

		this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey), leftPaddle: updatedPedalLeft, rightPaddle: updatedPedalRight})
		this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey),
			maxPaddleY: gameInstance.canvasHeight - gameInstance.grid - gameInstance.paddleHeight
		})
	}

	actionChangePaddleSize(gameKey: number, incDec: string) {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey);
		if (!gameInstance)
			return ;
		switch (incDec) {
			case 'reset':
				this.actionResetPedalSize(gameKey, gameInstance);
				break;
			case 'increase':
				this.actionIncreasePedalSize(gameKey, gameInstance);
				break;
			case 'decrease':
				this.actionDecreasePedalSize(gameKey, gameInstance);
				break;
		}
	}

	actionChangeBallSpeed(gameKey: number, ballSpeed: number) {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey);
		if (!gameInstance)
			return ;
		const updatedBall = {...gameInstance.ball};

		const {velocityX, velocityY} = this.changeBallSpeed(ballSpeed, updatedBall);
		updatedBall.velocityX = velocityX;
		updatedBall.velocityY = velocityY;

		this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey), ball: updatedBall});
	}

	actionReversePaddles(gameKey: number) {
		const gameInstance: GameData | undefined = this.gameRooms.get(gameKey);
		if (!gameInstance)
			return ;
		if (gameInstance.paddleSpeed > 0) {
			this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey),
				paddleSpeed: gameInstance.paddleSpeed *= -1
			})
		}
	}

	actionChangePaddleSpeed(gameKey: number, speed: number) {
		this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey), paddleSpeed: speed});
	}

	actionChangeBackgroundColor(gameKey: number, color: string) {
		this.gameRooms.set(gameKey, {...this.gameRooms.get(gameKey), backgroundColor: color});
	}

	randomActions(gameKey: number) {
		this.actionChangePaddleSpeed(gameKey, this.BASE_PADDLE_SPEED);
		this.actionChangeBallSpeed(gameKey, this.BASE_BALL_SPEED);
		this.actionChangePaddleSize(gameKey, 'reset');
		this.actionChangeBackgroundColor(gameKey, this.BASE_COLOR_BACKGROUND)

		switch(this.randomNumberBetween(1, 7)) {
			case 1:
				this.actionChangePaddleSize(gameKey, 'increase');
				break ;
			case 2:
				this.actionChangePaddleSize(gameKey, 'decrease');
				break ;
			case 3:
				this.actionChangeBallSpeed(gameKey, 4.5);
				break ;
			case 4:
				this.actionChangeBallSpeed(gameKey, 3);
				break ;
			case 5:
				this.actionReversePaddles(gameKey);
				this.actionChangeBackgroundColor(gameKey, 'red');
				break ;
			case 6:
				this.actionChangePaddleSpeed(gameKey, 15);
				this.actionChangeBackgroundColor(gameKey, '#FFC947');
				break ;
		}
	}

	startActionInterval(gameKey: number) {
		const timeout: NodeJS.Timeout = setTimeout(() => {
			this.randomActions(gameKey);
			clearTimeout(this.gameKeyToActionTimeout.get(gameKey));
			this.gameKeyToActionTimeout.delete(gameKey);
			this.startActionInterval(gameKey)
		}, this.BASE_ACTION_INTERVAL_MS)
		this.gameKeyToActionTimeout.set(gameKey, timeout);
	}
	/* RANDOM ACTIONS */
}
