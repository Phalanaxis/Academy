const linkTransform = {
  methods: {
    linkTransform: (string, id) => {
      let tempString = string.toLowerCase()
      let convertedString = ''
      var converter = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya', ' ': '-', '.': ''
      }
      for (var i = 0; i < tempString.length; ++i ) {
        if (converter[tempString[i]] === undefined){
          convertedString += tempString[i];
        } else {
          convertedString += converter[tempString[i]];
        }
      }
      return convertedString + '-' + window.btoa(id)
    }
  }
}

export default linkTransform