import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    quastionsList: [],
    questionsAmount: 5,
    variantsInOneQuestion: 4
  },
  mutations: {
    addToData (state, elem) {
      state.data.push(elem)
    },
    clearQuastionsList (state) {
      state.quastionsList = []
    },
    addToQuastionsList (state, elem) {
      state.quastionsList.push(elem)
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
                    subRegion: c.subregion,
                    flag: c.flag,
                    population: c.population
                  }
                )
              }
            })
        })
    }
  },
  getters: {
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
