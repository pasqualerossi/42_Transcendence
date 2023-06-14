// State defines the initial state of the application.
// The getters section provides methods to access the state values defined in the store.
// The actions section defines asynchronous methods that can be called to perform actions like fetching the current user, updating the user's status, and setting up socket connections.
// The mutations section contains synchronous methods to update the state values in the store.
// The store is created using createStore from Vuex, with the defined state, getters, actions, and mutations.

import { createStore } from 'vuex';
import axios from 'axios';
import io from 'socket.io-client';

// STATE

const state = 
{
  currentUser: null,
  socketChat: null,
  socketGame: null,
  currentGameKey: 0,
  currentGameRole: '',
  watchingCurrentProfileID: 0,
};

// GETTERS

const getters = 
{
  getCurrentUser: (state) => state.currentUser,
  getSocketChat: (state) => state.socketChat,
  getSocketGame: (state) => state.socketGame,
  getCurrentGameKey: (state) => state.currentGameKey,
  getCurrentGameRole: (state) => state.currentGameRole,
  getWatchingCurrentProfileID: (state) => state.watchingCurrentProfileID,
};

// ACTIONS

const actions = 
{
  async fetchCurrentUser({ commit }) 
  {
	try 
	{
      const response = await axios.get(`${process.env.VUE_APP_HOST_URL}:3000/Usersmyuser`, { withCredentials: true });
      commit('setCurrentUser', response.data);
	} 
	catch (error) {}
  },

  async setUserStatus({ commit }, status) 
  {
	try 
	{
      const response = await axios.post(`${process.env.VUE_APP_HOST_URL}:3000/Usersupdate/status/${status}`, null, { withCredentials: true });
      commit('setCurrentUser', response.data);
	} 
	catch (error) {}
  },

  async setupSockets({ commit, state }) 
  {
    commit('setSocketGame', null);
    commit('setSocketChat', null);

	const game = await io(`${process.env.VUE_APP_HOST_URL}:3000/game`, 
	{
	  extraHeaders: 
	  {
        Authorization: state.currentUser.id,
      },
    });

	const chat = await io(`${process.env.VUE_APP_HOST_URL}:3000/chat`, 
	{
	  extraHeaders: 
	  {
        Authorization: state.currentUser.id,
      },
    });

    commit('setSocketGame', game);
    commit('setSocketChat', chat);
  },

  closeSockets({ getters }) 
  {
	if (getters.getSocketChat) 
	{
      getters.getSocketChat.off();
      getters.getSocketChat.disconnect();
    }
	if (getters.getSocketGame) 
	{
      getters.getSocketGame.off();
      getters.getSocketGame.disconnect();
    }
  },
};

// MUTATIONS

const mutations = 
{
  setCurrentUser(state, user) 
  {
    state.currentUser = user;
  },

  setSocketGame(state, game) 
  {
    state.socketGame = game;
  },

  setSocketChat(state, chat) 
  {
    state.socketChat = chat;
  },

  setCurrentGameKey(state, key) 
  {
    state.currentGameKey = key;
  },

  setCurrentGameRole(state, role) 
  {
    state.currentGameRole = role;
  },

  setWatchingCurrentProfileID(state, id) 
  {
    state.watchingCurrentProfileID = id;
  },
};

// STORE

const store = createStore
({
  state,
  getters,
  actions,
  mutations,
});

export default store;