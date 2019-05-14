import { DIALOG_FORM, OPEN_DIALOG_FLAG, EMPTY_FORM, BUTTON_LOADING, LOADING, INPUT_LOADING, QUERY_SORT, URL_PARAM, RESULT_DATA, CURRENT_ACT, FORM_LABEL_WIDTH, DIALOG_TITLE, CALLBACKTAG, CALLBACK } from '../store/constant'

let baseData = {
  [QUERY_SORT]: {}, // 排序对象
  [EMPTY_FORM]: {}, // 空对象默认值
  [OPEN_DIALOG_FLAG]: false, // 弹出框是否显示
  [DIALOG_FORM]: {}, // 弹出框表单对象
  [FORM_LABEL_WIDTH]: '140px', // 表单label_width宽度
  [BUTTON_LOADING]: false, // 按钮loading状态
  [LOADING]: false, // 表格读取标志
  [INPUT_LOADING]: false, // 输入框远程读取标志
  [RESULT_DATA]: {model: {}}, // 返回数据
  [CURRENT_ACT]: '', // 记录当前操作动作
  [DIALOG_TITLE]: '', // 默认弹出框标题
  [CALLBACKTAG]: '', // 请求 变化标记
  [CALLBACK]: {}, // 请求 返回数据
  [URL_PARAM]: {common: '', list: '', add: '', edit: '', del: ''} // url访问参数
}

export default baseData
