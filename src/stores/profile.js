import { defineStore } from 'pinia'
export const useProfileStore = defineStore('profile', {
  state: () => ({
    status: 'standing',
    token: null,
    email: null,
    id: null,
    middleName: null,
    name: null,
    phoneNumber: null,
    surName: null,
    updatedAt: null,
    username: null,
    children: null,
    avatarImage: null,
    childBirthDay: null,
    methodForm: null,
    webinars: null,
    courses: null,
    methodForm: null,
    childBirthDay: null,
  }),
  getters: {
    GET_PROFILE: (state) => {
      return state.profile
    }
  },
  actions: {
    async registerProfile (object) {
      let result = ''
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          username: object.login,
          email: object.mail,
          name: object.name,
          surName: object.surname,
          middleName: object.middleName,
          phoneNumber: object.phone,
          password: object.password
        })
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (data.jwt) {
          result = 'success'
          sessionStorage.setItem('token', data.jwt)
        } else {
          result = 'error'
        }
      })
      return result
    },
    async loginUser (object, value) {
      let result = ''
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/auth/local', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          identifier: object.login,
          password: object.password
        })
      }).then((response) => {
        return response.json()
      }).then((data) => {
        console.log(data.jwt)
        if (data.jwt) {
          localStorage.setItem('sessionType', (value === true) ? 'local' : 'session')
          eval(((value === true) ? 'local' : 'session') + `Storage.setItem('token', data.jwt )`)
          result = 'success'
        } else {
          result = 'error'
        }
      })
      return result
    },
    async fetchUserData () {
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/users/me?populate=deep', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.token)
        }
      }).then((response) => {
        return response.json()
      }).then((data) => {
        console.log(this.token)
        this.email = data.email
        this.id = data.id
        this.middleName = data.middleName
        this.name = data.name
        this.phoneNumber = data.phoneNumber
        this.provider = data.provider
        this.surName = data.surName
        this.updatedAt = data.updatedAt
        this.username = data.username
        this.children = data.children
        this.avatarImage = data.avatarImage
        this.webinars = data.webinars
        this.courses = data.courses
        this.methodForm = data.methodForm
        this.childBirthDay = data.childBirthDay
      })
    },
    async restorePassword (inputEmail) {
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: inputEmail,
        })
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (data.ok) {
          this.status = 'success'
        } else {
          this.status = 'error'
        }
      })
    },
    async putProfile (props = {
      type: '',
      value: ''
    }) {
      let result = null
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/users/' + this.id, {
        method: 'PUT',
        body: JSON.stringify({
          middleName: props.type === 'middlename' ? props.value : this.middleName,
          name: props.type === 'name' ? props.value : this.name,
          surName: props.type === 'surname' ? props.value : this.surName,
          phoneNumber: props.type === 'phone' ? props.value : this.phoneNumber,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.token)
        }
      }).then((response) => {
        this.fetchUserData()
        return response.json()
      }).then((data) => {
        result = data
      })
      return result
    },
    async resetPassword (object) {
      let result = ''
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: object.code,
          password: object.password,
          passwordConfirmation: object.passwordConfirmation
        })
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (data.jwt) {
          sessionStorage.setItem('token', data.jwt)
          this.token = data.jwt
          this.fetchUserData()
          result = 'success'
        } else {
          result = 'error'
        }
      })
      return result
    },
    async setAvatar (props) {
      let result = null
      const form = new FormData()
      form.append('files', props.form.target.files[0], ('user' + this.id))
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/upload', {
        method: 'POST',
        body: form
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data[0]) {
          result = true
          if (this.avatarImage) {
            fetch(import.meta.env.VITE_SERVER_ROUTE + '/upload/files/' + this.avatarImage.id, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': ('Bearer ' + this.token)
              }
            }).then((response) => {
              return response.json()
            })
          }
          fetch(import.meta.env.VITE_SERVER_ROUTE + '/users/' + this.id, {
            method: 'PUT',
            body: JSON.stringify({
              avatarImage: data[0]
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': ('Bearer ' + this.token)
            }
          })
          .then((response) => {
            return response.json()
          })
          .then(() => {
            this.fetchUserData()
          })
        } else {
          result = false
        }
        return data
      })
      return result
    },
    async getGoogleAuth (token) {
      console.log(token)
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/auth/google/callback?access_token=' + token, {
        method: 'GET'
      }).then((response) => {
        return response.json()
      }).then((data) => {
        console.log(data)
        if (data.jwt) {
          this.token = data.jwt
          this.fetchUserData().then(() => {
            if (this.name === null || this.middleName === null || this.surName === null || this.phoneNumber === null) {
              this.status = 'redirectToRegistration'
            } else {
              this.status = 'success'
              sessionStorage.setItem('token', data.jwt)
            }
          })
        }
      })
    },
    async getVkontakteAuth (params) {
      console.log(params)
      // await fetch(import.meta.env.VITE_SERVER_ROUTE + '/auth/vk/callback?access_token=' + params.access_token + '&user_id=' + params['raw[user_id]'], {
      // access_token=vk1.a.Jknr7wCgNa3SMFx8sGlPYOZZe7qvp469Y6IoJzDoYMEIhZjMYgZxagSHLNwjBTOtFZwyJfH05CmvF8gZ6nACbSl-zoV07-6ST46yPKnLit0P1X0teqLWp0fAHpHLW8j66GRCc3UnTwrNmFuqHM7ZG7E9XJp9VxN7Q3Dj5hawXfHJV_UywBDn2o54DuDTe2h2&raw%5Baccess_token%5D=vk1.a.Jknr7wCgNa3SMFx8sGlPYOZZe7qvp469Y6IoJzDoYMEIhZjMYgZxagSHLNwjBTOtFZwyJfH05CmvF8gZ6nACbSl-zoV07-6ST46yPKnLit0P1X0teqLWp0fAHpHLW8j66GRCc3UnTwrNmFuqHM7ZG7E9XJp9VxN7Q3Dj5hawXfHJV_UywBDn2o54DuDTe2h2&raw%5Bexpires_in%5D=86400&raw%5Buser_id%5D=189353072&raw%5Bemail%5D=icephoenixm%40gmail.com
      //   user_id=' + params['raw[user_id]'] + '&
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/auth/vkontakte/callback?access_token=' + params.access_token, {
        method: 'GET'
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (data.jwt) {
          this.token = data.jwt
          this.fetchUserData().then(() => {
            if (this.name === null || this.middleName === null || this.surName === null || this.phoneNumber === null) {
              this.status = 'redirectToRegistration'
            } else {
              this.status = 'success'
              sessionStorage.setItem('token', data.jwt)
            }
          })
        }
      })
    },
    async setAdditionalData (props) {
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/users/' + this.id, {
        method: 'PUT',
        body: JSON.stringify({
          middleName: props.middleName,
          name: props.name,
          surName: props.surName,
          phoneNumber: props.phoneNumber
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.token)
        }
      }).then((response) => {
        if (response.status === 200) {
          this.fetchUserData()
          if (this.name === null || this.middleName === null || this.surName === null) {
            this.status = 'redirectToRegistration'
          } else {
            this.status = 'success'
            sessionStorage.setItem('token', data.jwt)
          }
        }
      })
    },
    async createChild (props) {
      let result = false
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/childrens', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            name: props.name,
            age: props.age
          }
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.token)
        }
      }).then((response) => {
        return response.json()
      }).then((data) => {
        const tempChild = []
        this.children.forEach(item => tempChild.push(item.id))
        tempChild.push(data.data.id)
        this.installChild(tempChild)
      }).then(() => {
        this.fetchUserData()
        result = true
      })
      return result
    },
    async installChild (childId) {
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/users/' + this.id, {
        method: 'PUT',
        body: JSON.stringify({
          children: childId
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.token)
        }
      }).then(() => {
        this.fetchUserData()
      })
    },
    async installWebinar (webinarId) {
      let result = false
      const tempWebinars = []
      this.webinars.forEach(item => tempWebinars.push(item.id))
      tempWebinars.push(webinarId)
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/users/' + this.id, {
        method: 'PUT',
        body: JSON.stringify({
          webinars: tempWebinars
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.token)
        }
      }).then(() => {
        this.fetchUserData()
        result = true
      })
      return result
    },
    async deleteChild (id) {
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/childrens/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.token)
        }
      }).then(() => {
        this.fetchUserData()
      })
    },
    async putCalculatorData (method, value) {
      let result = null
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/users/' + this.id, {
        method: 'PUT',
        body: JSON.stringify({
          methodForm: method,
          childBirthDay: value
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.token)
        }
      }).then((response) => {
        this.fetchUserData()
        return response.json()
      }).then((data) => {
        result = data
      })
      return result
    },
    async sendPayment (price, discount) {
      let productsString = ''
      price.map((item, index) => {
        let tempCost = item.cost
        if (discount !== '') {
          tempCost = item.cost * (1 - (discount/100))
        }
        if (item.type === 'course') {
          productsString = productsString + 'products[' + index + '][price]=' + tempCost + '&products[' + index + '][quantity]=1&products[' + index + '][name]=products/' + item.id + '&'
        } else {
          productsString = productsString + 'products[' + index + '][price]=' + tempCost + '&products[' + index + '][quantity]=1&products[' + index + '][name]=webinars/' + item.id + '&'
        }
      })
      const paymentLink = 'https://dzhobava.payform.ru/?order_id=newOrder&customer_email=' + this.email + '&customer_extra=' + this.id + '&customer_phone=' + this.phoneNumber + '&' + productsString + 'do=pay'
      await fetch(paymentLink, {
        method: 'GET'
      }).then((response) => {
        if (response.url) {
          window.location.replace(response.url)
        }
      })
    },
    async getPromos (promo) {
      let result = null
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/promos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (data.data.find(item => item.attributes.promocode === promo)) {
          result = data.data.find(item => item.attributes.promocode === promo).attributes.discount
        }
      })
      return result
    }
  }
})