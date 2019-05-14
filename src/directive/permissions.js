import opInfo from '../common/opInfo'

function checkMenuCode (val) {
  let userBasic = opInfo.getOpInfo().userBasic
  let menuCode = {}
  if (userBasic) {
    menuCode = { ...userBasic.menuCodes }
  }
  return menuCode[val]
}

export default {
  install (Vue) {
    Vue.directive('permissions', {
      bind: (el, binding) => {
        if (!checkMenuCode(binding.value)) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}
