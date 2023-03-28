import Test from './components/Test/index'
import Test2 from './components/Test2/index'
import Test3 from './components/Test3/index'
import Icon from './components/Icon/index'
import Loading from './components/Loading/index'
import Flybox from './components/Flybox/index'
import Container from './components/Container/index'
import Logo from './components/Logo/index'
import CountTo from './components/CountTo/index'
import BaseScrollList from './components/BaseScrollList/index'

export default function (Vue) {
  Vue.use(Test)
  Vue.use(Test2)
  Vue.use(Test3)
  Vue.use(Icon)
  Vue.use(Loading)
  Vue.use(Flybox)
  Vue.use(Container)
  Vue.use(Logo)
  Vue.use(CountTo)
  Vue.use(BaseScrollList)
}
