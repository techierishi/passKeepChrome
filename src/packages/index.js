import Style from './styles/index.css'

import Header from './components/header'
import Sidebar from './components/sidebar'
import Main from './components/main'
import Card from './components/card'
import table from './components/table'
import Input from './components/input'
import Button from './components/button'
import ButtonGroup from './components/button-group'
import Checkbox from './components/checkbox'
import CheckboxGroup from './components/checkbox-group'
import Radio from './components/radio'
import RadioGroup from './components/radio-group'
import Alert from './components/alert'
import Dialog from './components/dialog'

const components = {
    Header,
    Sidebar,
    Main,
    Card,
    table,
    Input,
    Button,
    ButtonGroup,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Alert,
    Dialog
}

//AB AB AB AB AB AB 
const install = function(Vue, opts = {}) {
    Object.keys(components).forEach(key => {
      Vue.component(components[key].name, components[key])
    })
}

//AB AB AB AB 
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

const API = {
    install,
    ...components
}

export default API