import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const CHANGE_PAGE_SIZE = 'CHANGE_PAGE_SIZE'
//消课详情按钮保存数据
const SAVE_CALL_DATA = 'SAVE_CALL_DATA'

const state = {
  column: {
    width: 200,
    fixed: 'right'
  },
  pagination: {
    pageSizes: [10, 20, 30, 40],
    layout: 'total, sizes, prev, pager, next, jumper',
    pageSize: 30
  },
  //返回按钮 用到的数据
  //哪个地方的返回按钮
  searchData:null,
  searchUrl:null,
  searchPageNumber:null,
  searchTab:null
}

const store = new Vuex.Store({
  state,
  mutations: {
    [CHANGE_PAGE_SIZE]: (state, pageSize) => {
      state.pagination.pageSize = pageSize
    },
    [SAVE_CALL_DATA]:(state, dataData)=>{
      state.searchData=dataData.data;
      state.searchUrl=dataData.url;
      state.searchPageNumber=dataData.pageNumber;
      state.searchTab=dataData.tab;
    }
  },
  actions: {
    changePageSize: ({commit}, pageSize) => {
      commit(CHANGE_PAGE_SIZE, pageSize)
    },
    saveCallData:({commit}, dataData)=>{
      commit(SAVE_CALL_DATA,dataData)
    }
  }
})

export default store
