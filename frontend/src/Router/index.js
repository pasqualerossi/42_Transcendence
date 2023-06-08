// This sets up the routing configuration for a Vue.js application using Vue Router.
// It defines different routes and their associated components.

import ChatPage from '@/Pages/ChatPage.vue'
import FriendsPage from '@/Pages/FriendsPage.vue'
import GameLobbyPage from '@/Pages/GameLobbyPage.vue'
import GameRoomPage from '@/Pages/GameRoomPage.vue'
import LoginPage from '@/Pages/LoginPage.vue'
import ProfilePage from '@/Pages/ProfilePage.vue'
import ScoreBoard from '@/Pages/ScoreBoardPage.vue'
import SettingsPage from '@/Pages/SettingsPage.vue'
import TwoFactorLoginPage from '@/Pages/TwoFactorLoginPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
{
	path: '/',
	name: 'login',
	component: LoginPage,
},
{
	path: '/profile',
	name: 'profile',
	component: ProfilePage,
},
{
	path: '/friends',
	name: 'friends',
	component: FriendsPage
},
{
	path: '/chat',
	name: 'chat',
	component: ChatPage
},
{
	path: '/scoreboard',
	name: 'scoreboard',
	component: ScoreBoard
},
{
	path: '/settings',
	name: 'settings',
	component: SettingsPage
},
{
	path: '/2falogin',
	name: '2falogin',
	component: TwoFactorLoginPage
},
{
	path: '/gamelobby',
	name: 'gamelobby',
	component: GameLobbyPage
},
{
	path: '/gameroom',
	name: 'gameroom',
	component: GameRoomPage,
}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router