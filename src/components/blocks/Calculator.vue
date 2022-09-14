<template>
  <h4 v-if="!Number(valueDate)" class="calculator__title">Рассчитать срок беременности</h4>
  <h4 v-else class="calculator__title">Предположительный срок беременности </h4>
  <div v-if="!Number(valueDate)" class="calculator">
    <div :class="{'calculator__card': true, 'calculator__card_active': activeMethod == 1}">
      <tree class="calculator__icon-tree" />
      <snake class="calculator__icon-snake" />
      <div class="calculator__card-title">По формуле Негеля</div>
      <div class="calculator__card-text">Укажите дату первого дня<br /> последних месячных</div>
      <n-date-picker :on-update:show="formHandler_1" v-model:value="valueDate" class="calculator__input" :first-day-of-week="0" />
    </div>
    <div :class="{'calculator__card': true, 'calculator__card_active': activeMethod == 2}">
      <arrow  class="calculator__icon-arrow" />
      <plus class="calculator__icon-plus" />
      <div class="calculator__card-title">По дате овуляции</div>
      <div class="calculator__card-text">Укажите дату овуляции</div>
      <n-date-picker :on-update:show="formHandler_2" v-model:value="valueDate" class="calculator__input" :first-day-of-week="0" />
    </div>
    <div :class="{'calculator__card': true, 'calculator__card_active': activeMethod == 3}">
      <oval class="calculator__icon-oval" />
      <half-circle class="calculator__icon-half-circle" />
      <div class="calculator__card-title">При ЭКО</div>
      <div class="calculator__card-text">Укажите дату переноса<br /> эмбриона</div>
      <n-date-picker :on-update:show="formHandler_3" v-model:value="valueDate" class="calculator__input" :first-day-of-week="0" />
    </div>
  </div>
  <div v-else :class="['calculator-total', 'calculator-total_' + logoVariant]">
    <div class="calculator-total__value">
      <div class="calculator-total__value-now">
        <div class="calculator-total__value-box">
          <div class="calculator-total__value-day">
            {{ conceptionDate.getDate() }}
          </div>
          <div class="calculator-total__numbers-container">
            <div class="calculator-total__value-month">
              {{ dateConverter( conceptionDate.getMonth()) }}
            </div>
            <div class="calculator-total__value-year">
              {{ conceptionDate.getFullYear() }}
            </div>
          </div>
        </div>
        <div class="calculator-total__title">Предполагаемая дата зачатия</div>
      </div>
      <div class="calculator-total__line" />
      <div class="calculator-total__value-sum">
        <div class="calculator-total__value-box">{{ daysLeft }}</div>
        <div class="calculator-total__title">Дней до родов</div>
      </div>
      <div class="calculator-total__line" />
      <div class="calculator-total__value-birth">
        <div class="calculator-total__value-box">
          <div class="calculator-total__value-day">{{ birthDate.getDate() }}</div>
          <div>
            <div class="calculator-total__value-month">{{ dateConverter( birthDate.getMonth()) }}</div>
            <div class="calculator-total__value-year">{{ birthDate.getFullYear() }}</div>
          </div>
        </div>
        <div class="calculator-total__title">Предполагаемая дата родов</div>
      </div>
    </div>
    <div class="calculator-total__button-container">
      <div @click="openTest()" class="calculator-total__risks-button">
        Калькуляторы риска осложнений
      </div>
      <div @click="switchClearModal()" class="calculator-total__cancel-button">
        Сбросить рассчет
      </div>
    </div>
  </div>
  <modal @outside="switchClearModal" v-if="isClearWindowOpened">
    <div class="calculator-total__modal">
      <h4 class="calculator-total__modal-text">
        Уверены <br>
        что хотите сбросить ?
        <div class="calculator-total__modal-buttons-box">
          <div @click="cancel()" class="calculator-total__modal-clear-button">
            Сбросить
          </div>
          <div @click="switchClearModal()" class="calculator-total__modal-cancel-button">
            Отмена
          </div>
        </div>
      </h4>
    </div>
  </modal>
</template>

<script>
import { ref, onMounted } from 'vue'
import tree from '@/assets/svg/icons/tree.vue'
import snake from '@/assets/svg/icons/snake.vue'
import arrow from '@/assets/svg/icons/arrow.vue'
import plus from '@/assets/svg/icons/plus.vue'
import halfCircle from '@/assets/svg/icons/halfCircle.vue'
import oval from '@/assets/svg/icons/oval.vue'
import { useProfileStore } from '@/stores/profile'
import Modal from '@/components/elements/Modal.vue'
export default {
  emits: ["openTest"],
  components: {
    tree,
    snake,
    arrow,
    plus,
    oval,
    halfCircle,
    Modal
  },
  setup (props, { emit }) {
    const valueDate = ref([])
    
    const profile = useProfileStore()

    const conceptionDate = ref('')
    const daysLeft = ref('')
    const birthDate = ref('')

    const activeMethod = ref(0)
    const logoVariant = ref(0)

    const isClearWindowOpened = ref(false)

    function formHandler_1 (props) {
      if ( valueDate.value > new Date().getTime()) {
        valueDate.value = new Date().getTime()
      }
      if ( valueDate.value > 0) {
        activeMethod.value = (props) ? 1 : 0
        let currentDate = new Date(valueDate.value)
        conceptionDate.value = new Date(valueDate.value)
        currentDate.setDate(currentDate.getDate() + 7)
        currentDate.setMonth(currentDate.getMonth() + 9)
        birthDate.value = currentDate
        calculateDaysLeft()
        profile.putCalculatorData(1, valueDate.value)
      }
    }
    function formHandler_2 (props) {
      if ( valueDate.value > new Date().getTime()) {
        valueDate.value = new Date().getTime()
      }
      activeMethod.value = (props) ? 2 : 0
      if ( valueDate.value > 0 ) {
        let currentDate = new Date(valueDate.value)
        conceptionDate.value = new Date(valueDate.value)
        currentDate.setDate(currentDate.getDate() + 266)
        birthDate.value = currentDate
        calculateDaysLeft()
        profile.putCalculatorData(2, valueDate.value)
      }
    }
    function formHandler_3 (props) {
      if ( valueDate.value > new Date().getTime()) {
        valueDate.value = new Date().getTime()
      }
      activeMethod.value = (props) ? 3 : 0
      if ( valueDate.value > 0 ) {
        let currentDate = new Date(valueDate.value)
        conceptionDate.value = new Date(valueDate.value)
        currentDate.setDate(currentDate.getDate() + 280)
        birthDate.value = currentDate
        calculateDaysLeft()
        profile.putCalculatorData(3, valueDate.value)
      }
    }
    function dateTransformation (value) {
      const stringDate = new Date(value)
      return stringDate.getDate() + '.' + (stringDate.getMonth() + 1) + '.' + stringDate.getFullYear()
    }
    function calculateDaysLeft () {
        let currentTime = new Date()
        daysLeft.value = Math.floor(birthDate.value.getTime() / (1000*60*60*24)) - Math.floor(currentTime.getTime() / (1000*60*60*24))
        logoVariant.value = Math.ceil((280 - daysLeft.value) / 30)
        console.log(logoVariant.value)
    }
    function cancel() {
      valueDate.value = []
      profile.putCalculatorData(null, null)
      switchClearModal()
    }
    function dateConverter (value) {
      switch (value) {
        case 0:
          return 'января'
        case 1:
          return 'февраля'
        case 2:
          return 'марта'
        case 3:
          return 'апреля'
        case 4:
          return 'мая'
        case 5:
          return 'июня'
        case 6:
          return 'илюя'
        case 7:
          return 'августа'
        case 8:
          return 'сентября'
        case 9:
          return 'октября'
        case 10:
          return 'ноября'
        case 11:
          return 'декабря'
      }
    }
    function switchClearModal () {
      isClearWindowOpened.value = !isClearWindowOpened.value
    }
    function openTest() {
      emit('openTest')
    }
    onMounted(() => {
      if (profile.childBirthDay !== null) {
        valueDate.value = profile.childBirthDay
        switch (profile.methodForm) {
          case 1:
            formHandler_1(true)
            break
          case 2:
            formHandler_2(true)
            break
          case 3:
            formHandler_3(true)
            break
        }
      }
    })

    return {
      valueDate,
      activeMethod,
      logoVariant,
      formHandler_1,
      formHandler_2,
      formHandler_3,
      dateTransformation,
      dateConverter,
      birthDate,
      conceptionDate,
      daysLeft,
      cancel,
      profile,
      isClearWindowOpened,
      switchClearModal,
      openTest
    }
  }
}
</script>

<style lang="scss" scoped>
.calculator {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &__title {
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    color: #644C5C;
  }
  &__icon{ 
    &-tree {
      position: absolute;
      width: 60px;
      top: -25px;
      left: -20px;
    }
    &-snake {
      position: absolute;
      width: 80px;
      bottom: -40px;
      right: -20px;
      fill: #DEC4AF;
    }
    &-arrow {
      position: absolute;
      top: -44px;
      left: 30px;
    }
    &-plus {
      position: absolute;
      bottom: -20px;
      right: -20px;
    }
    &-oval {
      position: absolute;
      width: 70px;
      height: 40px;
      top: -15px;
      right: 40px;
      fill: #E6E9E7;
    }
    &-half-circle {
      position: absolute;
      width: 90px;
      height: 90px;
      bottom: -15px;
      left: -5px;
      fill: #A7B3AC;
    }
  }
  &__card {
    position: relative;
    border-radius: 20px;
    width: calc(33% - 20px);
    height: 140px;
    box-sizing: border-box;
    padding: 30px 0 0;
    transition: border-color .3s;
    @media screen and (max-width: 1280px) {
      width: calc(50% - 10px);
      &:nth-child(3) {
        margin: 35px 0 0 0;
      }
    }
    @media screen and (max-width: 680px) {
      width: 100%;
      &:nth-child(2) {
        margin: 30px 0;
      }
      &:nth-child(3) {
        margin: 0 0 0 0;
      }
    }
    &:deep(.n-date-picker.calculator__input .n-input){
      height: 100% !important;
      cursor: pointer;
    }
    &:deep(.n-date-picker.calculator__input){
      height: 100% !important;
    }
    &:nth-child(1) {
      background-color: #C89C7A;
      border: 2px solid transparent;
      &.calculator__card_active {
        border-color: #403730;
      }
      .calculator__card-text { color: #403730;}
    }
    &:nth-child(2) {
      background-color: #78353E;
      border: 2px solid transparent;
      &.calculator__card_active {
        border-color: #3C1318;
      }
      .calculator__card-text { color: #3C1318;}
    }
    &:nth-child(3) {
      background-color: #829288;
      border: 2px solid transparent;
      &.calculator__card_active {
        border-color: #38443D;
      }
      .calculator__card-text { color: #38443D;}
    }
    &-title {
      text-align: center;
      color: #fff;
      font-family: Montserrat;
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
    }
    &-text {
      font-family: Montserrat;
      font-size: 10px;
      line-height: 15px;
      letter-spacing: 0.02em;
      text-align: center;
      margin: 10px 0 0;
    }
  }
  &__input {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
  }
}
.calculator-total {
  position: relative;
  background-color: #829288;
  border-radius: 20px;
  padding: 34px 240px 30px 30px;
  height: 220px;
  box-sizing: border-box;
  @media screen and (max-width: 1280px) {
    height: 363px;
    padding: 34px 0 30px 30px;
  }
  @media screen and (max-width: 680px) {
    height: 550px;
    padding: 180px 20px 25px 20px;
  }
  &::after {
    position: absolute;
    content: '';
    width: 140px;
    height: 180px;
    top: 30px;
    right: 30px;
    background-repeat: no-repeat;
    background-size: contain;
    @media screen and (max-width: 1280px) {
      top: 80px;
      right: 80px;
      width: 160px;
      height: 210px;
    }
    @media screen and (max-width: 680px) {
      width: 120px;
      height: 120px;
      top: 25px;
      left: calc(50% - 60px);
    }
  }
  &_0::after { background-image: url('@/assets/svg/child/child_1.svg'); }
  &_1::after { background-image: url('@/assets/svg/child/child_1.svg'); }
  &_2::after { background-image: url('@/assets/svg/child/child_2.svg'); }
  &_3::after { background-image: url('@/assets/svg/child/child_3.svg'); }
  &_4::after { background-image: url('@/assets/svg/child/child_4.svg'); }
  &_5::after { background-image: url('@/assets/svg/child/child_5.svg'); }
  &_6::after { background-image: url('@/assets/svg/child/child_6.svg'); }
  &_7::after { background-image: url('@/assets/svg/child/child_7.svg'); }
  &_8::after { background-image: url('@/assets/svg/child/child_8.svg'); }
  &_9::after { background-image: url('@/assets/svg/child/child_9.svg'); }
  &__title {
    font-family: Montserrat;
    font-size: 12px;
    line-height: 14px;
    color: #fff;
    width: 100%;
    margin: 10px 0 0;
    max-width: 108px;
    @media screen and (max-width: 1280px) {
      max-width: none;
    }
  }
  &__value {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1280px) {
      flex-direction: column;
    }
    &-box {
      color: #5D6761;
      font-weight: 600;
      font-size: 40px;
      line-height: 40px;
      font-family: Montserrat;
      display: flex;
      // justify-content: flex-end;
      transition: color .2s;
      &:hover {
        cursor: default;
        color: #FFF;
      }
      @media screen and (max-width: 1280px) {
        justify-content: flex-start;
      }
    }
    &-now {
      width: 20%;
      position: relative;
      @media screen and (max-width: 1280px) {
        width: 100%;
      }
    }
    &-sum {
      @media screen and (max-width: 1280px) {
        margin: 15px 0;
      }
      .calculator-total__title {
        width: 100%;
        text-align: center;
        max-width: 60px;
        @media screen and (max-width: 1280px) {
          text-align: start;
          max-width: none;
        }
      }
      .calculator-total__value-box {
        text-align: center;
        font-family: Montserrat;
        font-size: 40px;
        font-weight: 600;
        line-height: 40px;
      }
    }
    &-birth {
      width: 20%;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      flex-direction: column;
      @media screen and (max-width: 1280px) {
        align-items: flex-start;
        width: 100%;
      }
      .calculator-total__title {
        text-align: right;
        @media screen and (max-width: 1280px) {
          text-align: start;
        }
      }
    }
    &-day {
      font-size: 40px;
      line-height: 40px;
      padding: 0 8px 0 0;
      transition: color .2s;
    }
    &-month {
      font-size: 14px;
      line-height: 18px;
      transition: color .2s;
    }
    &-year {
      font-size: 14px;
      line-height: 18px;
      transition: color .2s;
    }
  }
  &__value-sum {
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1280px) {
      margin: 20px 0;
      align-items: flex-start;
    }
  }
  &__line {
    content: '';
    background-color: #60796A;
    width: 130px;
    height: 1px;
    margin: 20px 0 0 0;
    // &:last-child {
    //   margin: 20px 20px 0 0;
    // }
    // &:nth-child(1) {
    //   margin: 20px 0 0 0;
    // }
    @media screen and (max-width: 1280px) {
      display: none;
    }
  }
  &__button-container {
    margin: 40px 0 0 0;
    display: flex;
    align-items: center;
    @media screen and (max-width: 1280px) {
      margin: 30px 0 0 0;
    }
    @media screen and (max-width: 680px) {
      flex-direction: column;
      padding: 0 20px;
    }
  }
  &__risks-button {
    padding: 12px 25px;
    color: #60796A;
    font-weight: 500;
    background-color: #FBFAF9;
    border-radius: 10px;
    width: 300px;
    cursor: pointer;
    transition: transform .2s;
    @media screen and(max-width: 680px) {
      font-size: 12px;
      padding: 12px 10px;
      width: 240px;
    }
    &:hover {
      @media screen and (min-width: 1281px) {
        transform-origin: center;
        transform: scale(1.05);
      }
    }
  }
  &__cancel-button {
    position: relative;
    color: #60796A;
    font-weight: 500;
    margin: 0 0 0 25px;
    cursor: pointer;
    @media screen and (max-width: 680px) {
      margin: 15px 0 0 0;
    }
    &::before {
      position: absolute;
      top: 11px;
      left: -10px;
      transform: rotate(45deg);
      content: '';
      width: 8px;
      height: 1px;
      background-color: #60796A;
    }
    &::after {
      position: absolute;
      top: 11px;
      left: -10px;
      transform: rotate(-45deg);
      content: '';
      width: 8px;
      height: 1px;
      background-color: #60796A;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  &__modal {
    display: flex;
    flex-direction: column;
  }
  &__modal-text {
    text-align: center;
    font-size: 16px;
    line-height: 24px;
    color: #644C5C;
  }
  &__modal-buttons-box {
    display: flex;
    margin: 25px 0 0 0;
  }
  &__modal-clear-button {
    width: 110px;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    padding: 12px 20px;
    color: #FFF;
    background-color: #644C5C;
    cursor: pointer;
    border-radius: 10px;
    margin: 0 20px 0 0;
    transition: background-color .2s;
    &:hover {
      background-color: rgba(125, 105, 118, 1);
    }
  }
  &__modal-cancel-button {
    width: 110px;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    padding: 12px 20px;
    color: #644C5C;
    background-color: #E0DBDE;
    cursor: pointer;
    border-radius: 10px;
    transition: background-color .2s;
    &:hover {
      background-color: #cac6ca;
    }
  }
}
</style>