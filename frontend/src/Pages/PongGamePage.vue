<script setup>

	import { ref } from 'vue'

	const canvas = ref(null);
	const context = ref(null);
	const gameData = ref(null);

	const drawBackground = (width, height, color) => 
	{
		context.value.fillStyle = color;
		context.value.fillRect(0, 0, width, height);
	}

	const drawWalls = (width, height, color) => 
	{
		context.value.fillStyle = color;
		context.value.fillRect(0, 0, width, gameData.value.grid);
		context.value.fillRect(0, height - gameData.value.grid, width, height);
	}

	const drawPaddle = (x, y, width, height, color) => 
	{
		context.value.fillStyle = color;
		context.value.fillRect(x, y, width, height);
		context.value.fillRect(x, y, width, height);
	}

	const drawBall = (x, y, radius, color) => 
	{
		context.value.fillStyle = color;
		context.value.strokeStyle = color;
		context.value.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
		context.value.fill();
		context.value.beginPath();
		context.value.stroke();
	}

	const drawGame = () => 
	{
		context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
		drawBackground(canvas.value.width, canvas.value.height, gameData.value.backgroundColor);
		drawPaddle(gameData.value.leftPaddle.x, gameData.value.leftPaddle.y, gameData.value.leftPaddle.width, gameData.value.leftPaddle.height, gameData.value.leftPaddle.color);
		drawPaddle(gameData.value.rightPaddle.x, gameData.value.rightPaddle.y, gameData.value.rightPaddle.width, gameData.value.rightPaddle.height, gameData.value.rightPaddle.color);
		drawBall(gameData.value.ball.x, gameData.value.ball.y, gameData.value.ball.width / 2, gameData.value.ball.color);
		drawWalls(canvas.value.width, canvas.value.height, gameData.value.wallColor);
	}

	const initCanvas = () => 
	{
		canvas.value = document.getElementById('game');
		context.value = canvas.value.getContext('2d');
	}
	
</script>