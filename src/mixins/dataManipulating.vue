<script>
  import store from '@/store'

  let myMixin = {
    methods: {
      getRandomCountryFromRegion: function(region) {
        const coutrysList = store.getters.getCountrysByRegion(region)
        return this.getRandomElement(coutrysList)
      },

      getOnlyUniqueItems: function(array, key) {
        let keys = []
        let res = []
        
        array.map(el => {
          if(keys.indexOf(el[key]) === -1) {
            keys.push(el[key])
            res.push(el)
          } 
        })
        // [...new Map(res.map(item => [item['name'], item])).values()]
        return res
      },

      getSingleQuestion: function() {
        //list of all unique regions
        const regions = store.getters.getUniqueRegions
        
        //random region for this set of countrys
        const region = this.getRandomElement(regions)

        let res = [];

        let addCountry = () => {
          res.push(this.getRandomCountryFromRegion(region))
          res = this.getOnlyUniqueItems(res, 'name')
          if (res.length < store.state.variantsInOneQuestion) addCountry()
        }
        // console.time('FirstWay');
        addCountry()
        // console.timeEnd('FirstWay');
        return res
      },
      setQuestionsSet: function() {
        store.commit('clearQuastionsList')
        if (store.state.data.length > 0) {
          for (let i = 0; i < store.state.questionsAmount; i++) {
            store.commit('addToQuastionsList', this.getSingleQuestion())
          }
        }
        console.log(store.state.quastionsList)
      },
      getRandomIndex: function (arrayLength) {
        return Math.floor(Math.random() * arrayLength);
      },
      getRandomElement: function (array) {
        return array[this.getRandomIndex(array.length)]
      }
    },
    mounted () {
      
    }
  }

  export default myMixin
</script>