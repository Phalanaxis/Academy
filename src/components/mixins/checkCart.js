const checkCart = {
  methods: {
    checkCart: () => {
      if (localStorage.getItem('inCart')) {
        return JSON.parse(localStorage.getItem('inCart'))
      } else {
        return []
      }
    }
  }
}
export default checkCart