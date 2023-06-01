// This sets up the routing configuration for a Vue.js application using Vue Router.
// It defines different routes and their associated components.

import ChatView from '@/Views/ChatView/ChatView.vue'
import FriendsView from '@/Views/FriendsView/FriendsView.vue'
import GameLobbyView from '@/Views/GameLobbyView/GameLobbyView.vue'
import GameRoomView from '@/Views/GameRoomView/GameRoomView.vue'
import LoginView from '@/Views/LoginView/LoginView.vue'
import ProfileView from '@/Views/ProfileView/ProfileView.vue'
import ScoreBoard from '@/Views/ScoreBoardView/ScoreBoardView.vue'
import SettingsView from '@/Views/SettingsView/SettingsView.vue'
import TwoFactorLoginView from '@/Views/TwoFactorLoginView/TwoFactorLoginView.vue'

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