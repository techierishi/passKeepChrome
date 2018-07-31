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
                name: 'Home AB AB ',
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
                name: 'Forms AB AB AB AB ',
                icon: 'collection-text',
                open: true,
                childs: {
                    0: {
                        name: 'Input AB AB AB ',
                        src: '/input'
                    },
                    1: {
                        name: 'Buttons AB AB ',
                        src: '/buttons'
                    },
                    3: {
                        name: 'Checkbox/Radio AB AB /AB AB ',
                        src: '/check'
                    }
                },
                haveChild: true
            }
        }
    }
})

export default store