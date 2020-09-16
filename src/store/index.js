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
    async addToData (state, elem) {
      state.data.push(elem)
    },
    clearQuastionsList (state) {
      state.quastionsList = []
    }
  },
  actions: {
    fillData (context) {
      fetch(`https://restcountries.eu/rest/v2/all`)
        .then(response => {
          return response.json();
        })
        .then(response => {
          response.map(c => {
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
    },
    getVariantsAmount: state => state.variantsInOneQuestion
    
    // getRandomCountryFromRegion: (state, getters) => region => {
    //   const coutrysList = getters.getCountrysByRegion(region)
    //   const rnd = Math.floor(Math.random() * coutrysList.length)
    //   return coutrysList[rnd]
    // },
    // getSingleQuestion: (state, getters) => {
    //   //list of all unique regions
    //   const regions = getters.getUniqueRegions
      
    //   //random region for this set of countrys
    //   const region = regions[Math.floor(Math.random() * regions.length)]

    //   let res = [];
    //   // res.push(getters.getRandomCountryFromRegion(region))

    //   while (res.length < state.variantsInOneQuestion) {
    //     res.push(getters.getRandomCountryFromRegion(region))
    //     //keep only original elements in res
    //     res = [...new Map(res.map(item => [item['name'], item])).values()]
    //   }

    //   return res
    // }
  }
})
