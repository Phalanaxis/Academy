const saveToCart = {
  methods: {
    saveToCart: (inCart) => {
      const parsed = JSON.stringify(inCart)
      localStorage.setItem('inCart', parsed )
    }
  }
}
export default saveToCart