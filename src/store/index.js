import Vue from 'vue'
import Vuex from 'vuex'

import headImg from '../assets/head.jpg'
import headBg from '../assets/head-bg.jpg'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        headImg,
        headBg,
        menuData: {
            0: {
                name: 'Home',
                src: '/',
                icon: 'home',
                open: false,
                haveChild: false
            },
            1: {
                name: 'SavePass',
                src: '/savepass',
                icon: 'format-underlined',
                open: false,
                haveChild: false
            },
            2: {
                name: 'Other',
                icon: 'collection-text',
                open: true,
                childs: {
                    0: {
                        name: 'Sync',
                        src: '/sync'
                    },
                    1: {
                        name: 'Settings',
                        src: '/home'
                    }
                },
                haveChild: true
            }
        }
    }
})

export default store