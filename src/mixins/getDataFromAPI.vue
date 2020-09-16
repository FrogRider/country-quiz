<script>
  import store from '@/store'

  let myMixin = {
    methods: {
      getRandomCountryFromRegion: function(region) {
        const coutrysList = store.getters.getCountrysByRegion(region)
        const rnd = Math.floor(Math.random() * coutrysList.length)
        return coutrysList[rnd]
      },

      // testFunc: function() {
      //   return store.getters.getUniqueRegions
      // },

      getSingleQuestion: function() {
        //list of all unique regions
        const regions = store.getters.getUniqueRegions
        
        //random region for this set of countrys
        const region = regions[Math.floor(Math.random() * regions.length)]

        let res = [];
        // res.push(getters.getRandomCountryFromRegion(region))

        while (res.length < store.getters.getVariantsAmount) {
          res.push(this.getRandomCountryFromRegion(region))
          //keep only original elements in res
          res = [...new Map(res.map(item => [item['name'], item])).values()]
        }

        return res
      }
    },
    mounted () {
      
    }
  }

  export default myMixin
</script>