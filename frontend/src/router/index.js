// This defines different routes and their associated components.

import ChatView from '@/views/ChatView/ChatView.vue'
import FriendsView from '@/views/FriendsView/FriendsView.vue'
import GameLobbyView from '@/views/GameLobbyView/GameLobbyView.vue'
import GameRoomView from '@/views/GameRoomView/GameRoomView.vue'
import LoginView from '@/views/LoginView/LoginView.vue'
import ProfileView from '@/views/ProfileView/ProfileView.vue'
import ScoreBoard from '@/views/ScoreBoardView/ScoreBoardView.vue'
import SettingsView from '@/views/SettingsView/SettingsView.vue'
import TwoFactorLoginView from '@/views/TwoFactorLoginView/TwoFactorLoginView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
{
	path: '/',
	name: 'login',
	component: LoginView,
},
{
	path: '/profile',
	name: 'profile',
	component: ProfileView,
},
{
	path: '/friends',
	name: 'friends',
	component: FriendsView
},
{
	path: '/chat',
	name: 'chat',
	component: ChatView
},
{
	path: '/scoreboard',
	name: 'scoreboard',
	component: ScoreBoard
},
{
	path: '/settings',
	name: 'settings',
	component: SettingsView
},
{
	path: '/2falogin',
	name: '2falogin',
	component: TwoFactorLoginView
},
{
	path: '/gamelobby',
	name: 'gamelobby',
	component: GameLobbyView
},
{
	path: '/gameroom',
	name: 'gameroom',
	component: GameRoomView,
}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
