<template>
  <div class="card" :class="{'wrong-answer': failed}">
    <div class="card__final" v-if="failed && variants.length === 0">
      <div class="card__final-title">
        You got <i>{{score}}</i> correct {{score === 1 ? 'answer' : 'answers'}}
        <FinalTitle :score="score"/>
      </div>
      <div class="card__final-button">
        <Btn title="Reset" @customClickedEvent="newGame()"/>
      </div>
    </div>
    <div class="card__content" v-else-if="variants.length">
      <div class="card__flag" v-if="flag">
        <img :src="flag" alt="">
      </div>

      <h2 class="card__title">{{question}}</h2>

      <div class="card__answer" 
        v-for="(variant, idx) in variants" 
        :key="idx" 
        @click="guess(idx)"
        :class="{
          'card__answer_correct': guessedAnswerIndex !== null && idx === answer.index,
          'card__answer_wrong': guessedAnswerIndex !== null && guessedAnswerIndex === idx && idx !== answer.index
          }"
      >
        <div class="card__answer-letter">{{getLetter(idx)}}</div>
        <div class="card__answer-title">{{variant.name}}</div>
      </div>

      <div class="card__next">
        <Btn 
          title="Next" 
          :class="{'disabled': guessedAnswerIndex === null}" 
          @customClickedEvent="next"
        />
      </div>
    </div>
    <div class="card__content_empty" v-else>
      <Btn title="Start" @customClickedEvent="fillVariants"/>
    </div>

  </div>
</template>

<script>
  import mixin from '@/mixins/dataManipulating'
  import Btn from '@/components/startButton.vue'
  import FinalTitle from '@/components/finalTitle.vue'
  // import store from '@/store'

  export default {
    components: {Btn, FinalTitle},
    mixins: [mixin],
    data: function () {
      return {
        question: 'Lorem?',
        answer: {elem: null, index: null},
        guessedAnswerIndex: null,
        flag: null,
        variants: [],
        score: 0,
        failed: false
      }
    },
    methods: {
      fillVariants: function () {
        this.variants = this.getSingleQuestion()
        this.generateQuestion()
      },
      getLetter (idx) {
        return String.fromCharCode(65 + idx)
      },
      generateQuestion () {
        const questionType = this.getRandomElement(['flag', 'capital'])
        const anwerElement = this.answer.elem = this.getRandomElement(this.variants) 
        this.answer.index = this.variants.indexOf(anwerElement)

        switch (questionType) {
          case 'flag':
            this.question = 'Which country does this flag belong to?'
            this.flag = anwerElement.flag
            break;
          case 'capital':
            if(!this.answer.elem.capital)
              this.question = `Which country has not it's own capital?`
            else 
              this.question = `${anwerElement.capital} is capital of...`
            this.flag = null
            break;
        
          default:
            break;
        }
      },
      guess (idx) {
        if (this.guessedAnswerIndex === null) {
          this.guessedAnswerIndex = idx
          this.failed = idx !== this.answer.index
        }
      },
      reset (score = this.score) {
        Object.keys(this.answer).map(key => this.answer[key] = null)
        this.guessedAnswerIndex = this.flag = null
        this.score = score
        this.failed = false
      },
      next () {
        if (this.failed === false) {
          this.score++
          this.reset()
          this.fillVariants()
        } else {
          this.variants = []
        }
      },
      newGame () {
        this.reset(0)
        this.fillVariants()

      }
    },
    watch: {
      variants: function () {
        if (this.variants !== []) {
          this.generateQuestion()
        }
      }
    }
  }
</script>

<style lang="scss">
  .card {
    background-color: #fff;
    border-radius: 24px;
    padding: 3rem 2rem 2rem;
    max-width: 900px;
    max-width: 400px;
    width: 100%;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 150px;
      height: 150px;
      right: 0;
      top: -100px;
      background-image: url('../assets/card-logo.svg');
      background-repeat: no-repeat;
      background-position: center;
    }

    &__title {
      margin-bottom: 12px;
      color: #2f527b;
      overflow-wrap: break-word;
    }

    &__answer {
      border: 2px solid rgba(96,102,208, .7);
      border-radius: 12px;
      display: flex;
      align-items: center;
      transition: border-color .3s, background-color .3s;
      // color: rgba(96,102,208, .7);

      &:hover {
        border-color: #f9a826;
        background-color: #f9a826;
        cursor: pointer;

        .card__answer-letter, .card__answer-title {
          color: #fff;
        }
      }

      &_correct, &_wrong {
        opacity: 1 !important;

        .card__answer-letter, .card__answer-title {
          color: #fff;
        }
      } 

      &_correct {
        border-color: #60bf88;
        background-color: #60bf88;

        &:hover {
          border-color: #60bf88;
          background-color: #60bf88;
        }
      }

      &_wrong {
        border-color: #ea8282;
        background-color: #ea8282;

        &:hover {
          border-color: #ea8282;
          background-color: #ea8282;
        }
      }

      & + & {
        margin-top: 20px;
      }
    }

    &__answer-letter {
      color: rgba(96,102,208, .7);
      height: 100%;
      padding: 5px 20px 5px 10px;
      transition: color .3s;
    }

    &__answer-title {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 5px 5px 5px 0;
      color: rgba(96,102,208, 1);
      transition: color .3s;
    }

    &__content {
      &_empty {
        height: 300px;
        display: grid;
        place-items: center;
      }
    }

    &__flag {
      display: flex;
      justify-content: center;

      img {
        width: 100px;
        // border: 2px solid rgba(96,102,208, .7);
        // border-radius: 3px;
        box-shadow: 0 2px 4px  rgba(128, 128, 128, 0.7);
      }
    }

    &__next {
      margin-top: 25px;
      display: flex;
      justify-content: flex-end;
    }

    &__final {
      min-height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
    }

    &__final-title {
      font-size: 2.5rem;
      text-align: center;
      color:  rgba(96,102,208, 1);

      i {
        color: #60bf88;
      }
    }

    &__final-title-additional {
      font-size: 1.5rem;
      color:  rgba(96,102,208, .7);
      margin-top: 10px;
      padding: 10px;
    }
  }

  .wrong-answer {
      .card {
        &__answer:not(.card__answer_wrong):not(.card__answer_correct) {
          opacity: .5;

          &:hover {
            border: 2px solid rgba(96,102,208, .7);
            background-color: #fff;
            cursor: not-allowed;

            & .card__answer-letter {
              color: rgba(96, 102, 208, 0.7);
            }

            & .card__answer-title {
              color: #6066d0;
            }
          }
        }
      }
    }
</style>