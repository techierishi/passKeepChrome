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
                name: 'Cards AB AB ',
                src: '/cards',
                icon: 'widgets',
                open: false,
                haveChild: false
            },
            3: {
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
                    // 2: {
                    //     name: 'Select AB AB AB AB ',
                    //     src: '/select'
                    // },
                    3: {
                        name: 'Checkbox/Radio AB AB /AB AB ',
                        src: '/check'
                    }
                },
                haveChild: true
            },
            4: {
                name: 'Table',
                src: '/table',
                icon: 'view-list',
                open: false,
                haveChild: false
            },
            5: {
                name: 'Alert AB AB ',
                src: '/alert',
                icon: 'comment-more',
                open: false,
                haveChild: false
            },
            6: {
                name: 'Dialogs AB AB AB ',
                src: '/dialogs',
                icon: 'comment-text-alt',
                open: false,
                haveChild: false
            },
            7: {
                name: 'User Interface',
                icon: 'swap-alt',
                open: true,
                childs: {
                    0: {
                        name: 'Colors AB AB ',
                        src: '/colors'
                    },
                    2: {
                        name: 'Icons AB AB ',
                        src: '/icons'
                    },
                    3: {
                        name: 'Others AB AB ',
                        src: 'others'
                    }
                },
                haveChild: true
            },
        }
    }
})

export default store