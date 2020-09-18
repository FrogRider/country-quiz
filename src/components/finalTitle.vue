<template>
  <div>
    <p v-if="score >= 10" class="card__final-title-additional">{{this.getFinalMassage('good')}}</p>
    <p v-else-if="score >= 5" class="card__final-title-additional">{{getFinalMassage('avarage')}}</p>
    <p v-if="score <= 1" class="card__final-title-additional">{{getFinalMassage('bad')}}</p>
  </div>
</template>

<script>
import mixin from '@/mixins/dataManipulating'
  export default {
    mixins: [mixin],
    props: ['score'],
    methods: {
      getFinalMassage (type) {
        const masages = {
          'good': [
            'Wow! Great result',"Magnificent achievement"
          ],
          'avarage': [
            'Congrats!', 'Nice result', 'Nice try, but this could be done better'
          ],
          'bad': [
            'Well... You can do better', 
            'Try once more. You can do better', 
            'I\'m going to pretend I didn\'t see that...',
            'Is this some kind of joke, or...? Try once more, anyway',
            'It\'s just a game =)'
          ]
        }

        return this.getRandomElement(masages[type])
      }
    }
  }
</script>