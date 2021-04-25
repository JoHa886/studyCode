import './assets/css/style.css'
import _ from 'lodash'
const css1 = import('./assets/css/css1.css')
const css2 = import('./assets/css/css2.css')
function component(doc) {
  var element = doc.createElement('div')

  element.innerHTML = _.join(['Hello', 'pjh'], ' ')

  return element
}

document.body.appendChild(component())

// console.log('展示：', css1, css2)
