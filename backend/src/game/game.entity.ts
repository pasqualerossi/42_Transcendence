export class GameData {
	id: number

	specialAction: boolean

	userLeftSideID: number
	userRightSideID: number
	spectatorsID: number[]

	canvasHeight: number
	canvasWidth: number
	grid: number

	paddleHeight: number
	maxPaddleY: number
	
	paddleSpeed: number 
	ballSpeed: number
	
	wallColor: string
	backgroundColor: string
	
	gameLoopIntervalID: NodeJS.Timer
	
	leftPaddle: {
		x: number
		y: number
		width: number
		height: number
		velocity: number
		color: string
	}
	
	rightPaddle: {
		x: number
		y: number
		width: number
		height: number
		velocity: number
		color: string
	}
	
	ball: {
		x: number
		y: number
		width: number
		height: number
		resetting: boolean
		velocityY: number
		velocityX: number
		color: string
	}
	
	score: {
		limit: number
		left: number
		right: number
	}
}