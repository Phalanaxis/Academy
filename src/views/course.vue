<template>
  <section class="course">
    <div class="course__title">
      Название курса
    </div>
    <div class="course__theme">
      Тема 1
    </div>
    <div class="course__lector-title">
      Лектор урока
    </div>
    <div class="course__lector-block">
      <div class="course__lector-info">
        <img class="course__lector-photo" src="/src/assets/images/avatar.jpg"/>
        <div class="course__lector-name">
          Анна Андреева
        </div>
        <a class="course__lector-mail" href="mailto:@andreeva.lo">
          @andreeva.lo
        </a>
      </div>
      <ul class="course__lector-benefits">
        <li class="course__lector-benefit">
          Врач терапевт, диетолог, специалист по&nbsp;медицине и&nbsp;врач Аюверды
        </li>
        <li class="course__lector-benefit">
          Спикер многочисленных конференций
        </li>
        <li class="course__lector-benefit">
          Эксперт медийных проектов ( НТВ, АвтоРадио, Ксмополитен )
        </li>
        <li class="course__lector-benefit">
          Выпускница курсов Аюрведических колледжей, Индия (Амритапури, Васанта, СНА)
        </li>
        <li class="course__lector-benefit">
          Специалист по&nbsp;пульсовой диагностике
        </li>
        <li class="course__lector-benefit">
          Автор курса-трилогии.
        </li>
      </ul>
    </div>
    <div class="course__content">
      Таким образом, внедрение современных методик представляет собой интересный эксперимент проверки соответствующих условий активизации. Однозначно, акционеры крупнейших компаний превращены в&nbsp;посмешище, хотя само их&nbsp;существование приносит несомненную пользу обществу. Однозначно, независимые государства могут быть призваны к&nbsp;ответу. Приятно, граждане, наблюдать, как представители современных социальных резервов, вне зависимости от&nbsp;их&nbsp;уровня, должны быть обнародованы.
    </div>
    <video
      controls
      class="course__video"
      poster="/src/assets/images/Test.png"
    >
    </video>
    <div class="course__content">
      Прежде всего, перспективное планирование представляет собой интересный эксперимент проверки поставленных обществом задач. Но&nbsp;высокотехнологичная концепция общественного уклада создаёт необходимость включения в&nbsp;производственный план целого ряда внеочередных мероприятий с&nbsp;учётом комплекса кластеризации усилий. Ясность нашей позиции очевидна: высококачественный прототип будущего проекта однозначно фиксирует необходимость своевременного выполнения сверхзадачи. Кстати, сделанные на&nbsp;базе интернет-аналитики выводы представляют собой не&nbsp;что иное, как квинтэссенцию победы маркетинга над разумом и&nbsp;должны быть функционально разнесены на&nbsp;независимые элементы.
    </div>
    <audio
      class="course__audio"
      controls
      src=""
    >
    </audio>
    <File class="course__file" />
    <spiral-button />
  </section>
</template>

<script>
import File from '@/components/elements/File.vue'
import SpiralButton from '@/components/ui/SpiralButton.vue'
export default {
  setup () {
    return {}
  },
  components: {
    File,
    SpiralButton
  }
}
</script>

<style lang="scss" scoped>
.course {
  width: 100%;
  min-height: 100vh;
  padding: 60px 185px 50px 110px;
  background-color: #FBFAF9;
  &__title {
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
    color: #644C5C;
    margin-bottom: 18px;
  }
  &__theme {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #644C5C;
    margin-bottom: 47px;
  }
  &__lector {
    &-title {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: #644C5C;
      margin-bottom: 21px;
    }
    &-block {
      width: 100%;
      background: #FBFAF9;
      border: 1px solid #D8D8D8;
      border-radius: 10px;
      display: flex;
      margin-bottom: 30px;
    }
    &-info {
      padding: 30px 47px 30px 30px;
      border-right: 1px solid #D8D8D8;
    }
    &-photo {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      margin-bottom: 14px;
    }
    &-name {
      font-size: 14px;
      font-weight: 500;
      line-height: 19px;
      color: #000;
      margin-bottom: 3px;
    }
    &-mail {
      font-size: 10px;
      font-weight: 400;
      line-height: 19px;
      color: #6D6D6D;
      text-decoration: none;
    }
    &-benefits {
      padding: 30px 47px 30px 30px;
    }
    &-benefit {
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      color: #644C5C;
      &::marker {
        font-size: 10px;
      }
    }
  }
  &__content {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: #644C5C;
    margin-bottom: 48px;
  }
  &__video {
    width: 100%;
    margin-bottom: 48px;
    border-radius: 15px;
  }
  &__audio {
    display: block;
    box-sizing: content-box;
    padding: 30px 35px 35px 33px;
    width: 100%;
    background: #E0DBDE;
    border-radius: 20px;
    margin-bottom: 30px;
      &::-webkit-media-controls-enclosure {
      border-radius: 2px;
      background: #E0DBDE;
    }
  }
  &__file {
    margin-bottom: 102px;
  }
}
</style>