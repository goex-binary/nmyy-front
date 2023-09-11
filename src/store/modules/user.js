import { logout, getInfo, register, registerStatus } from '@/api/user'
import { authLogin } from '@/api/hjy'

import { getToken, setToken, removeToken, getRole, setRole, removeRole } from '@/utils/auth'
import { resetRouter } from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    role: getRole(),
    name: '',
    avatar: '',
    menus: [],
    node: [],
    registerStatus: '',
    companyData: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_STATUS: (state, status) => {
    state.registerStatus = status
  },
  SET_COMPANYDATA: (state, data) => {
    state.companyData = data
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_NODE: (state, node) => {
    state.node = node
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    console.log(userInfo, 'userInfo');
    const { password } = userInfo
    return new Promise((resolve, reject) => {
      authLogin(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_ROLE', data.slug)

        setToken(data.token)
        setRole(data.slug);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 企业认证状态
  registerStatus ({ commit }) {
    return new Promise((resolve, reject) => {
      registerStatus().then(response => {
        const { data } = response
        console.log(data, "data");
        commit('SET_COMPANYDATA', data)
        commit('SET_STATUS', data.state)
        resolve(data.state)
      }).catch(error => {
        removeToken();
        this.$router.push('/login')
        reject(error)
      })
    })
  },

  // user register
  register ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ email: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  removeMenu ({ commit, state }) {
    commit('SET_MENUS', [])
  },
  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        let pages = []
        if (data.map && data.map.authpath) {
          pages = data.map.authpath.map(item => {
            return item.act
          });
        }

        let node = []
        if (data.map && data.map.authpath) {
          let tempData = data.map.authpath
          tempData = tempData.filter(item => {
            return item.flag == 0
          });
          node = tempData.map(item => {
            return item.slug
          });
        }
        node = Array.from(new Set(node))


        pages = Array.from(new Set(pages))
        pages = [...pages, 'layout', 'index', 'noFound', 'crewManage', 'carbonRecord', 'divideLine', 'jurisdiction', 'knowledge', 'muneManage', 'enterpriseDemand',
          'complaintsSuggestions', 'enterpriseList', 'baseInfo', 'helpCadres', 'systemLog',
          'leaderCharge', 'countyLeaders', 'personnelScheduling', 'questionnaire', 'questionnaireLists',
          'taskManagement', 'planManagement', 'addPolicy', 'modifyPolicy', 'stationManagement', 'bigScreen',
          'workTime', 'recordManagement', 'weekStatics', 'taskAnalysis', 'dailyReport', 'addBanner', 'dailyReportDetail']
        // pages = response.data.pages // mock 记得删除
        const { name, avatar } = data

        commit('SET_COMPANYDATA', data.map.account)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_MENUS', pages)
        commit('SET_NODE', node)


        resolve(pages)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeRole();
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
