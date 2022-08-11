<template>
  <div v-if="!Number(valueDate)" class="calculator">
    <div :class="{'calculator__card': true, 'calculator__card_active': isActive_1}">
      <div class="calculator__card-title">По формуле Негеля</div>
      <div class="calculator__card-text">Укажите дату первого дня<br /> последних месяных</div>
      <n-date-picker :on-update:show="formHendler_1" v-model:value="valueDate" class="calculator__input" :first-day-of-week="0" />
    </div>
    <div :class="{'calculator__card': true, 'calculator__card_active': isActive_2}">
      <div class="calculator__card-title">По дате овуляции</div>
      <div class="calculator__card-text">Укажите дату овуляции</div>
      <n-date-picker :on-update:show="formHendler_2" v-model:value="valueDate" class="calculator__input" :first-day-of-week="0" />
    </div>
    <div :class="{'calculator__card': true, 'calculator__card_active': isActive_3}">
      <div class="calculator__card-title">При ЭКО</div>
      <div class="calculator__card-text">Укажите дату переноса<br /> эмбриона</div>
      <n-date-picker :on-update:show="formHendler_3" v-model:value="valueDate" class="calculator__input" :first-day-of-week="0" />
    </div>
  </div>
  <div v-else :class="['calculator-total', 'calculator-total_' + logoVariant]">
    <div class="calculator-total__value">
      <div class="calculator-total__value-now">
        <div class="calculator-total__value-box">
          <div class="calculator-total__value-day">{{ birthDay(valueDate) }}</div>
          <div>
            <div class="calculator-total__value-month">{{ birthDay(valueDate, 'month') }}</div>
            <div class="calculator-total__value-year">{{ birthDay(valueDate, 'year') }}</div>
        </div>
        </div>
        <div class="calculator-total__title">Предполагаемая<br /> дата зачатия</div>
      </div>
      <div class="calculator-total__value-sum">
        <div class="calculator-total__value-box">{{ totalDay(valueDate) }}</div>
        <div class="calculator-total__title">Дней до<br /> родов</div>
      </div>
      <div class="calculator-total__value-birth">
        <div class="calculator-total__value-box">
          <div class="calculator-total__value-day">{{ birthDay(valueDate) }}</div>
          <div>
            <div class="calculator-total__value-month">{{ birthDay(valueDate, 'month') }}</div>
            <div class="calculator-total__value-year">{{ birthDay(valueDate, 'year') }}</div>
          </div>
        </div>
        <div class="calculator-total__title">Предполагаемая<br /> дата родов</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import arrow from '@/assets/svg/icons/arrow.vue'
import halfCircle from '@/assets/svg/icons/halfCircle.vue'
import snake from '@/assets/svg/icons/snake.vue'
import oval from '@/assets/svg/icons/oval.vue'
import halfOval from '@/assets/svg/icons/halfOval.vue'
import plus from '@/assets/svg/icons/plus.vue'

export default {
  components: {
    plus,
    halfOval,
    oval,
    snake,
    halfCircle,
    arrow
  },
  setup () {

    const valueDate = ref([])
    const isActive_1 = ref(false)
    const isActive_2 = ref(false)
    const isActive_3 = ref(false)
    const logoVariant = ref(0)
    let methodForm = 0

    function formHendler_1 (props) {
      isActive_1.value = props
      methodForm = 1
    }
    function formHendler_2 (props) {
      isActive_2.value = props
      methodForm = 2
    }
    function formHendler_3 (props) {
      isActive_3.value = props
      methodForm = 3
    }
    function dateTransformation (value) {
      const stringDate = new Date(value)
      return stringDate.getDate() + '.' + (stringDate.getMonth() + 1) + '.' + stringDate.getFullYear()
    }
    function totalDay (value) {
    }
    function birthDay (value, type = 'day') {
      switch (methodForm) {
        case 1:
          const stringDate = new Date(value)
          stringDate.setDate(stringDate.getDate() - 7)
          stringDate.setDate(stringDate.getMonth() - 3)
          if (type === 'day') {
            return stringDate.getDate()
          } else if (type === 'month') {
            return dateConverter(stringDate.getDate())
          } else {
            return stringDate.getFullYear()
          }
          break;
        case 2:
          
          break;
        case 3:
          
          break;
      }
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
    return {
      valueDate,
      isActive_1,
      isActive_2,
      isActive_3,
      logoVariant,
      formHendler_1,
      formHendler_2,
      formHendler_3,
      dateTransformation,
      totalDay,
      birthDay
    }
  }
}
</script>

<style lang="scss" scoped>
.calculator {
  display: flex;
  justify-content: space-between;
  &__card {
    position: relative;
    border-radius: 20px;
    width: calc(33% - 20px);
    height: 140px;
    box-sizing: border-box;
    padding: 30px 0 0;
    transition: border-color .3s;
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
  background-color: #829288;
  border-radius: 20px;
  padding: 34px 240px 30px 30px;
  height: 220px;
  box-sizing: border-box;
  &_0::after { background-image: url('@/assets/svg/child/child_1.svg'); }
  &_1::after { background-image: url('@/assets/svg/child/child_1.svg'); }
  &_2::after { background-image: url('@/assets/svg/child/child_1.svg'); }
  &_3::after { background-image: url('@/assets/svg/child/child_1.svg'); }
  &_4::after { background-image: url('@/assets/svg/child/child_1.svg'); }
  &_5::after { background-image: url('@/assets/svg/child/child_1.svg'); }
  &_6::after { background-image: url('@/assets/svg/child/child_1.svg'); }
  &_7::after { background-image: url('@/assets/svg/child/child_1.svg'); }
  &_8::after { background-image: url('@/assets/svg/child/child_1.svg'); }
  &__title {
    font-family: Montserrat;
    font-size: 12px;
    line-height: 14px;
    color: #fff;
    width: 100%;
    margin: 10px 0 0;
  }
  &__value {
    display: flex;
    justify-content: space-between;
    &-box {
      color: #5D6761;
      font-weight: 600;
      font-family: Montserrat;
      display: flex;
    }
    &-now {

    }
    &-sum {
      .calculator-total__title {
        text-align: center;
      }
    }
    &-birth {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      .calculator-total__title {
        text-align: right;
      }
    }
    &-day {
      font-size: 40px;
      line-height: 40px;
      padding: 0 8px 0 0;
    }
    &-month {
      font-size: 14px;
      line-height: 18px;
    }
    &-year {
      font-size: 14px;
      line-height: 18px;
    }
  }

}


</style>