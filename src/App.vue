<template>
  <n-config-provider :theme-overrides="themeOverrides" :date-locale="dateRuRU" :locale="ruRU">
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>
<script>
import { ruRU,	dateRuRU } from 'naive-ui'
  export default {
    setup() {
      const themeOverrides = {
        "Input": {
          "heightMedium": "42px",
          "width": "100%",
          "paddingMedium": "0 12px 0 30px",
          "border": "none",
          "textColor": "#78353E",
          "caretColor": "#78353E",
          "placeholderColor": "#78353E",
          "borderRadius": "9em",
          "textColorDisabled": "",
        },
        "Checkbox": {
          "size": "12px",
          "border": "1px solid #78353E",
          "color": "#F4EBE4",
          "fontSize": "12px",
          "textColor": "#78353E",
          "borderChecked": "1px solid #78353E",
          "colorChecked": "#78353E",
          "borderFocus": "1px solid #78353E",
          "boxShadowFocus": "0 0 0 2px rgba(120, 53, 62, 0.3)"
        },
        "Select": {
          "peers": {
            "InternalSelection": {
              "heightMedium": "50px",
              "border": "1px solid #D8D8D8",
              "borderRadius": "10px",
              "placeholderColor": "#644C5C",
              "textColor": "#644C5C"
            }
          },
          "heightMedium": "80px",
          "placeholderColor": "#78353E",
        },
        "DatePicker": {
          "itemBorderRadius": "50%",
          "itemColorActive": "#78353E",
          "panelBorderRadius": "16px",
          "panelTextColor": "#7E818C",
          "arrowColor": "#78353E",
          "panelColor": "#FBF8F6"
        },
        "Message": {
          "iconColorSuccess": "#644C5C",
          "iconColorError": "rgb(119, 52, 61)",
          "iconColorWarning": "rgb(197, 177, 178)"
        }
      }
      return {
        ruRU,
        dateRuRU,
        themeOverrides
      }
    }
  }
</script>
<style lang="scss">
@import './assets/scss/global.scss';
@import './assets/scss/core.scss';
</style>
