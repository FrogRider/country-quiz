import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    quastionsList: [],
    questionsAmount: 5,
    variantsInOneQuestion: 4,
    livesTotal: 3,
    livesRemain: 3,
    userInfo: {}
  },
  mutations: {
    addToData (state, elem) {
      state.data.push(elem)
    },
    setUserInfo(state, user) {
      state.userInfo = user;
    },
    clearQuastionsList (state) {
      state.quastionsList = []
    },
    addToQuastionsList (state, elem) {
      state.quastionsList.push(elem)
    },
    minusHP (state) {
      state.livesRemain -= 1
    },
    HPreset (state) {
      state.livesRemain = state.livesTotal
    }
  },
  actions: {
    fillData (context) {
      fetch(`https://restcountries.eu/rest/v2/all`)
        .then(response => response.json())
        .then(response => {
          response
            .filter(e => e.region !== 'Polar')
            .forEach(c => {
              if (!this.getters.getData.find(e => e.name === c.name)) {
                context.commit('addToData', 
                  {
                    name: c.name,
                    capital: c.capital,
                    region: c.region,
                    flag: c.flag
                  }
                )
              }
            })
        })
    },
    getUserInfo (context) {
      fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=e3ba186b87fb4d74ad15f015a6d80d32`)
        .then(response => response.json())
        .then(r => {
          console.log(r)
          const user = {coords: `${r.latitude} ${r.longitude}`, ip: r.ip_address}
          context.commit('setUserInfo', user)
        })
    }
  },
  getters: {
    userInfo: state => state.userInfo,
    getData: state => {
      return state.data
    },
    getDataLength: (state, getters) => {
      return getters.getData.length
    },
    getUniqueRegions: state => {
      return (
        [...new Set(
          state.data
            .map(e => e.region))]
            .filter(Boolean) //equivalent to .filter(e => e !== '')
      )
    },
    getCountrysByRegion: state => region => {
      return state.data.filter(c => c.region === region)
    }
  }
})
