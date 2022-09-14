<template>
  <calculator @openTest="switchModal" />
  <h4 class="index__title">Специальные предложения</h4>
  <div @click="switchModal()" class="test">
    <h2 class="test__title">Пройти тест</h2>
    <div class="test__image-container">
      <heart class="test__heart" />
      <img class="test__image" src="@/assets/images/oval-basic.png" />
      <half-circle class="test__half-circle" />
    </div>
  </div>
  <modal @outside="switchModal" v-if="isOpened">
    <div v-if="modalStatus === 'questions'" class="test-modal">
      <h4 class="test-modal__title">Вопрос {{ +currentQuestion + 1 }}</h4>
      <div class="test-modal__question">
        {{ testQuestions[currentQuestion].name }}
      </div>
      <n-checkbox-group
        class="test-modal__answers"
        v-model:value="answerValue"
        name="radiogroup"
        :max="(testQuestions[currentQuestion].isOne) ? 1 : 10"
      >
        <n-checkbox
          class="test-modal__answer"
          v-for="(item, index) in testQuestions[currentQuestion].answers"
          :key="index"
          :label="item.title"
          :value="item.title"
          
        />
      </n-checkbox-group>
      <div class="test-modal__buttons-container">
        <square-button
          class="test-modal__button"
          buttonPlaceholder="Следующий вопрос"
          @click="switchNext()"
          :disabled="(answerValue.length !== 0) ? false : true"
        />
        <square-button
          class="test-modal__button"
          buttonPlaceholder="Предыдущий вопрос"
          @click="switchPrevious()"
          :disabled="(currentQuestion !== 0) ? false : true"
        />
      </div>
    </div>
    <div v-else class="test-modal">
      <h3 class="test-modal__result-title">Степень перинатального риска:</h3>
      <h4 v-if="modalStatus === 'low'" class="test-modal__result-text">Низкая</h4>
      <h4 v-else-if="modalStatus === 'medium'" class="test-modal__result-text">Средняя</h4>
      <h4 v-else class="test-modal__result-text">Высокая</h4>
    </div>
  </modal>
</template>

<script>
import { ref } from 'vue'
import heart from '@/assets/svg/icons/heart.vue'
import halfCircle from '@/assets/svg/icons/halfCircle.vue'
import Modal from '@/components/elements/Modal.vue'
import SquareButton from '@/components/ui/SquareButton.vue'
import Calculator from '@/components/blocks/Calculator.vue'
export default {
  components: {
    heart,
    halfCircle,
    Modal,
    SquareButton,
    Calculator
  },
  setup () {
    const testQuestions = [
      {
        sum: 'A',
        name: 'Каков возраст матери?',
        isOne: true,
        answers: [
          {
            title: '18 лет и менее',
            score: 2,
          },
          {
            title: '40 лет и более',
            score: 4,
          },
          {
            title: 'Другое',
            score: 0
          }
        ]
      },
      {
        sum: 'A',
        name: 'Каков возраст отца?',
        isOne: true,
        answers: [
          {
            title: 'более 40 лет',
            score: 2,
          },
          {
            title: 'Другое',
            score: 0,
          }
        ]
      },
      {
        sum: 'A',
        name: 'Есть ли профессиональные вредности?',
        isOne: true,
        answers: [
          {
            title: 'у матери',
            score: 3,
          },
          {
            title: 'у отца',
            score: 3,
          },
          {
            title: 'у обоих',
            score: 6,
          },
          {
            title: 'Нет',
            score: 0,
          }
        ]
      },
      {
        sum: 'A',
        name: 'Есть ли вредные привычки у матери?',
        isOne: true,
        answers: [
          {
            title: 'курение одной пачки сигарет в день',
            score: 2
          },
          {
            title: 'злоупотребление алкоголем',
            score: 4
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'A',
        name: 'Есть ли вредные привычки у отца?',
        isOne: true,
        answers: [
          {
            title: 'злоупотребление алкоголем',
            score: 4
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'A',
        name: 'Семейное положение матери?',
        isOne: true,
        answers: [
          {
            title: 'Одинокая',
            score: 1
          },
          {
            title: 'Другое',
            score: 0
          }
        ]
      },
      {
        sum: 'A',
        name: 'Есть ли эмоциональные нагрузки у матери?',
        isOne: true,
        answers: [
          {
            title: 'Есть',
            score: 1
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'A',
        name: 'Какой рост матери?',
        isOne: true,
        answers: [
          {
            title: '158 сантиметров и менее',
            score: 2
          },
          {
            title: 'Другое',
            score: 0
          }
        ]
      },
      {
        sum: 'A',
        name: 'Какая масса тела матери?',
        isOne: true,
        answers: [
          {
            title: 'на 25% выше нормы',
            score: 2
          },
          {
            title: 'Все в порядке',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Укажите паритет(количество предыдущих родов)?',
        isOne: true,
        answers: [
          {
            title: '4-7',
            score: 1
          },
          {
            title: '8 и более',
            score: 2
          },
          {
            title: 'Другое',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Количество абортов перед первыми предстоящими родами?',
        isOne: true,
        answers: [
          {
            title: '1',
            score: 2
          },
          {
            title: '2',
            score: 3
          },
          {
            title: '3 и более',
            score: 4
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Аборты перед повторными родами или после последних родов?',
        isOne: true,
        answers: [

          {
            title: '3 и более',
            score: 2
          },
          {
            title: 'Другое',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Имелись ли Внутриматочные вмешательства?',
        isOne: true,
        answers: [
          {
            title: 'Да',
            score: 2
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Имелись ли преждевременные роды?',
        isOne: true,
        answers: [
          {
            title: '1',
            score: 2
          },
          {
            title: '2 и более',
            score: 3
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Имелись ли случаи мертворождения, невынашивания, неразвившейся беременности?',
        isOne: true,
        answers: [
          {
            title: '1',
            score: 3
          },
          {
            title: '2 и более',
            score: 8
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Имелись ли случаи cмерти в неонатальном периоде?',
        isOne: true,
        answers: [
          {
            title: '1',
            score: 2
          },
          {
            title: '2 и более',
            score: 7
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Имелись ли аномалии развития у детей, рожденных ранее?',
        isOne: true,
        answers: [
          {
            title: 'Да',
            score: 3
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Имелись ли неврологические нарушения у детей, рожденных ранее?',
        isOne: true,
        answers: [
          {
            title: 'Да',
            score: 2
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Имелись ли случаи массы доношенных детей до 2500 г и более 4000 г?',
        isOne: true,
        answers: [
          {
            title: 'Да',
            score: 2
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Имелось бесплодие?',
        isOne: true,
        answers: [
          {
            title: '2-4 года',
            score: 2
          },
          {
            title: '5 лет и более',
            score: 4
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Рубец на матке после операции?',
        isOne: true,
        answers: [
          {
            title: 'Да',
            score: 4
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Опухоли матки и/или яичников?',
        isOne: true,
        answers: [
          {
            title: 'Да',
            score: 4
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Истмико-цервикальная недостаточность, доброкачественные заболевания, деформация, перенесенная деструкция шейки матки?',
        isOne: true,
        answers: [
          {
            title: 'Да',
            score: 2
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Пороки развития матки?',
        isOne: true,
        answers: [
          {
            title: 'Да',
            score: 3
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Хронические воспалительные процессы матки и придатков, осложнения после абортов и родов, внутриматочная спираль?',
        isOne: true,
        answers: [
          {
            title: 'Да',
            score: 3
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Внематочная беременность?',
        isOne: true,
        answers: [
          {
            title: 'Да',
            score: 3
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'Б',
        name: 'Вспомогательные репродуктивные технологии:',
        isOne: true,
        answers: [
          {
            title: 'ЭКО',
            score: 1
          },
          {
            title: 'ICSI',
            score: 2
          }
        ]
      },
      {
        sum: 'В',
        name: 'Сердечно-сосудистые:',
        isOne: false,
        answers: [
          {
            title: 'пороки сердца без нарушения кровообращения',
            score: 3
          },
          {
            title: 'Пороки сердца с нарушением кровообращения',
            score: 10
          },
          {
            title: '- хроническая артериальная гипертензия I ст',
            score: 2
          },
          {
            title: '- хроническая артериальная гипертензия II ст',
            score: 8
          },
          {
            title: '- хроническая артериальная гипертензия III ст',
            score: 12
          },
          {
            title: '- варикозная болезнь',
            score: 2
          },
          {
            title: '- гипотензивный синдром',
            score: 2
          },
          {
            title: 'Заболевания почек',
            score: 4
          },
        ]
      },
      {
        sum: 'В',
        name: 'Эндокринопатии:',
        isOne: false,
        answers: [
          {
            title: '- сахарный диабет',
            score: 10
          },
          {
            title: '- заболевания щитовидной железы',
            score: 7
          },
          {
            title: '- ожирение',
            score: 2
          },
          {
            title: 'Коагулопатии',
            score: 2
          },
          {
            title: 'Заболевания почек',
            score: 4
          },
          {
            title: 'Нет',
            score: 0
          }
        ]
      },
      {
        sum: 'В',
        name: 'Анемия?',
        isOne: true,
        answers: [
          {
            title: 'Анемия: гемоглобин 90 г/л',
            score: 4
          },
          {
            title: 'Анемия: гемоглобин 100 г/л',
            score: 2
          },
          {
            title: 'Анемия: гемоглобин 110 г/л',
            score: 1
          },
          {
            title: 'Нет',
            score: 0
          },
        ]
      },
      {
        sum: 'В',
        name: 'Имеются ли:',
        isOne: false,
        answers: [
          {
            title: 'Коагулопатии',
            score: 2
          },
          {
            title: 'Миопия и другие заболевания глаз',
            score: 2
          },
          {
            title: 'Хронические специфические инфекции (туберкулез, бруцеллез, токсоплазмоз и др.)',
            score: 3
          },
          {
            title: 'Нет',
            score: 0
          },
        ]
      },
      {
        sum: 'В',
        name: 'Имеется ли положительный волчаночный антикоагулянт?',
        isOne: true,
        answers: [
          {
            title: 'Да',
            score: 4
          },
          {
            title: 'Нет',
            score: 0
          },
        ]
      },
      {
        sum: 'В',
        name: 'Имеется ли АТ к фосфолипидам?',
        isOne: true,
        answers: [
          {
            title: 'IgG от 9,99 и выше',
            score: 2
          },
          {
            title: 'IgM от 9,99 и выше',
            score: 3
          },
          {
            title: 'Нет',
            score: 0
          },
        ]
      },
      {
        sum: 'Г',
        name: 'Осложнения беременности',
        isOne: false,
        answers: [
          {
            title: 'Выраженный ранний токсикоз',
            score: 2
          },
          {
            title: 'Рецидивирующая угроза прерывания',
            score: 2
          },
          {
            title: 'Гестоз легкой степени',
            score: 3
          },
          {
            title: 'Гестоз средней степени',
            score: 5
          },
          {
            title: 'Гестоз тяжелой степени',
            score: 10
          },
          {
            title: 'Преэклампсия',
            score: 11
          },
          {
            title: 'Эклампсия',
            score: 12
          },
          {
            title: 'Обострение заболеваний почек пр беременности',
            score: 4
          },
          {
            title: 'Острые инфекции во время беременности, в том числе ОРВИ',
            score: 4
          },
          {
            title: 'Резус сенсибилизация',
            score: 5
          },
          {
            title: 'АВО сенсибилизация',
            score: 10
          },
          {
            title: 'Многоводие',
            score: 3
          },
          {
            title: 'Маловодие',
            score: 4
          },
          {
            title: 'Тазовое предлежание плода, крупный плод, узкий таз',
            score: 3
          },
          {
            title: 'Многоплодие',
            score: 3
          },
          {
            title: 'Перенашивание беременности',
            score: 3
          },
          {
            title: 'Неправильные положения плода (поперечное, косое)',
            score: 3
          },
          {
            title: 'Биологическая незрелость родовых путей в 40 недель беременности',
            score: 4
          },
          {
            title: 'Другое',
            score: 0
          },
        ]
      },
      {
        sum: 'Г',
        name: 'Скрининг:',
        isOne: false,
        answers: [
          {
            title: 'B-ХГЧ: повышение уровня',
            score: 3
          },
          {
            title: '-ХГЧ: снижение уровня',
            score: 4
          },
          {
            title: 'АФП: повышение уровня',
            score: 6
          },
          {
            title: 'АФП: снижение уровня',
            score: 8
          },
          {
            title: 'РАРР-А: повышение уровня',
            score: 2
          },
          {
            title: 'РАРР-А: снижение уровня',
            score: 3
          },
          {
            title: 'Другое',
            score: 0
          }
        ]
      },
      {
        sum: 'Д',
        name: 'Оценка состояния плода',
        isOne: false,
        answers: [
          {
            title: 'Гипотрофия плода 1 ст.',
            score: 10
          },
          {
            title: 'Гипотрофия плода 2 ст.',
            score: 15
          },
          {
            title: 'Гипотрофия плода 3 ст.',
            score: 20
          },
          {
            title: 'Хроническая плацентарная недостаточность',
            score: 4
          },
          {
            title: 'Другое',
            score: 0
          }
        ]
      },
      {
        sum: 'Д',
        name: 'Оценка КТГ по шкале W.M. Fisher (баллы)',
        isOne: true,
        answers: [
          {
            title: 'больше 7',
            score: 8
          },
          {
            title: '6',
            score: 12
          },
          {
            title: '5',
            score: 16
          },
          {
            title: '4',
            score: 20
          },
          {
            title: 'Другое',
            score: 0
          }
        ]
      },
    ]

    const answerValue = ref([])
    const currentQuestion = ref(0)
    const curentBlock = ref(0)
    const modalStatus = ref('questions')
    const score = ref({
      'A': null,
      'Б': null,
      'В': null,
      'Г': null,
      'Д': null,
      'Е': null
    })

    const answersHistory = ref([])

    const isOpened = ref(false)
    function switchModal () {
      isOpened.value = !isOpened.value
    }
    function switchNext () {
      if (answerValue.value.length > 0 && testQuestions.length - 1 !== currentQuestion.value) {
        answersHistory.value[currentQuestion.value] = 0
        answerValue.value.forEach(choiceItem => {
          let tempScore = testQuestions[currentQuestion.value].answers.find(item => item.title === choiceItem).score
          score.value[testQuestions[currentQuestion.value].sum] = +score.value[testQuestions[currentQuestion.value].sum] + tempScore
          answersHistory.value[currentQuestion.value] = +answersHistory.value[currentQuestion.value] + tempScore
        })
        answerValue.value = []
        currentQuestion.value = +currentQuestion.value + 1
      } 
      else if (testQuestions.length - 1 === currentQuestion.value) {
        let finalScore = 0
        for(let item in score.value) {
          finalScore = finalScore + score.value[item]
        }
        if(finalScore <= 15) {
          modalStatus.value = 'low'
        } else if ( finalScore > 15 && finalScore <= 24 ) {
          modalStatus.value = 'medium'
        } else if (finalScore > 24) {
          modalStatus.value = 'hight'
        }
      }
    }
    function switchPrevious () {
      currentQuestion.value = +currentQuestion.value - 1
      score.value[testQuestions[currentQuestion.value].sum] = +score.value[testQuestions[currentQuestion.value].sum] - answersHistory.value[answersHistory.value.length - 1]
      answerValue.value = []
      answersHistory.value.pop()
    }
    return {
      testQuestions,
      currentQuestion,
      curentBlock,
      modalStatus,
      isOpened,
      switchModal,
      answerValue,
      switchNext,
      switchPrevious
    }
  }
}
</script>


<style lang="scss" scoped>
  .test {
    cursor: pointer;
    position: relative;
    background-color: #E6E9E7;
    height: 200px;
    border-radius: 20px;
    padding: 0 70px 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: transform .3s;
    @media screen and (max-width: 680px) {
      height: 300px;
      padding: 0;
      flex-direction: column;
      margin: 0 0 100px 0;
    }
    &:hover {
      transform: scale(1.01);
      .test__image-container {
        transform: scale(1.05);
        @media screen and (max-width: 680px) {
          transform: scale(1);
        }
      }
      @media screen and (max-width: 680px) {
        transform: scale(1);
      }
      .test__heart {
        animation: shake 1s linear infinite;
        @media screen and (max-width: 680px) {
          animation: none;
        }
      }
      .test__half-circle {
        animation: rotate 1s linear infinite;
        @media screen and (max-width: 680px) {
          animation: none;
        }
      }
    }
    &__title {
      font-size: 40rem;
      line-height: 60rem;
      color: #5D6761;
      @media screen and (max-width: 1280px) {
        font-size: 24px;
        line-height: 36px;
      }
    }
    &__image-container {
      position: relative;
      transform-origin: center;
      transition: transform .3s;
      @media screen and (max-width: 1280px) {
        position: absolute;
        right: -10px;
        top: 0;
      }
      @media screen and (max-width: 680px) {
        position: relative;
        margin: 60px 0 0 0;

      }
    }
    &__heart {
      position: absolute;
      z-index: 3;
      top: -15px;
      left: -50px;
      fill: #829288;
    }
    &__image {
      position: relative;
      z-index: 2;
      width: 350px;
      height: 200px;
      object-fit: contain;
      @media screen and (max-width: 680px) {
        width: 100%;
      }
    }
    &__half-circle {
      position: absolute;
      bottom: 25px;
      right: 0;
      fill: #C89C7A;
    }
  }
  @keyframes shake {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(10deg);
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(-80deg);
    }
  }
  .test-modal {
    position: relative;
    width: 850rem;
    height: 500rem;
    @media screen and (max-width: 1280px) {
      width: 520px;
      height: 400px;
    }
    @media screen and (max-width: 680px) {
      width: calc(100vw - 30px);
      height: auto;
    }
    &__title {
      font-size: 20rem;
      line-height: 30rem;
      color: #644C5C;
      margin: 0;
    }
    &__question {
      margin: 15px 0 0 0;
      font-size: 20px;
      line-height: 30px;
      font-weight: 500;
      color: #644C5C;
    }
    &__answers {
      display: flex;
      flex-direction: column;
      margin: 50px 0;
      padding: 0 0 0 3px;
      max-height: 60%;
      overflow: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      @media screen and (max-width: 1280px) {
        max-height: 50%;
      }
      @media screen and (max-width: 680px) {
        height: 40%;
        max-height: 200px;
        margin: 20px 0 50px 0;
      }
    }
    &__answer {
      margin: 0 0 20px 0;
      &:last-child {
        margin: 0;
      }
    }
    &__buttons-container {
      position: absolute;
      bottom: 0;
      @media screen and (max-width: 680px) {
        position: relative;
      }
    }
    &__button {
      &:nth-child(1) {
        margin: 0 30px 0 0;
      }
      @media screen and (max-width: 680px) {
        width: 100%;
        &:last-child {
          margin: 10px 0 0 0;
        }
      }
    }
    &__result-title {
      padding: 20% 0 0 0;
      margin: 0 0 30rem 0;
      text-align: center;
      font-size: 24rem;
      color: #644C5C;
    }
    &__result-text {
      text-align: center;
      font-size: 18rem;
      color: #644C5C;
    }
  }
  .index__title {
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    color: #644C5C;
  }
</style>