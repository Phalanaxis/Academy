import { defineStore } from 'pinia'
export const useProfileStore = defineStore('profile', {
  state: () => ({
    children: [],
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
    avatarImage: null
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
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.token)
        }
      }).then((response) => {
        return response.json()
      }).then((data) => {
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
          phoneNumber: props.type === 'phone' ? props.value : this.phoneNumber
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
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/auth/google/callback?access_token=' + token, {
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
    async getVkontakteAuth (params) {
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/auth/vk/callback' + params, {
        method: 'GET'
      }).then((response) => {
        return response.json()
      }).then((data) => {
        // if (data.jwt) {
        //   this.token = data.jwt
        //   this.fetchUserData().then(() => {
        //     if (this.name === null || this.middleName === null || this.surName === null || this.phoneNumber === null) {
        //       this.status = 'redirectToRegistration'
        //     } else {
        //       this.status = 'success'
        //       sessionStorage.setItem('token', data.jwt)
        //     }
        //   })
        // }
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
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/childrens', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            name: props.name,
            age: 1,
            users_permissions_user: String(this.id)
          }
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.token)
        }
      }).then((response) => {
        this.fetchUserData()
        return response.json()
      }).then((data) => {
        console.log(data)
      })
    }
  }
})