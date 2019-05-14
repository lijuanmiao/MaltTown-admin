import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import MockData from './data'

const SuccessCode = 200
const SetResTime = 300
const SuccessRes = { 'resCode': '0000' }

export default {
  bootstrap: () => {
    let mock = new MockAdapter(axios)

    // 登录mock
    mock.onGet('/userInfo').reply(SuccessCode, MockData.UserData.opLoginUser)

    // 角色管理功能mock
    mock.onGet('role/list').reply(req => {
      let iPage = req.params.page
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.RoleData.getList(iPage)])
        }, SetResTime)
      })
    })
    mock.onGet(/manage\/role\/[-+]?[0-9]+/).reply(req => {
      let nSel = /[-+]?[0-9]+/
      let nSelRes = req.url.match(nSel)
      let detailId = nSelRes[0]
      if (!detailId) {
        detailId = -1
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.RoleData.getInfo(detailId)])
        }, SetResTime)
      })
    })

    // 操作员管理功能mock
    mock.onGet('/manage/user/list').reply(req => {
      let iPage = req.params.page
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.UserData.getList(iPage)])
        }, SetResTime)
      })
    })
    mock.onGet(/manage\/user\/[-+]?[0-9]+/).reply(req => {
      let nSel = /[-+]?[0-9]+/
      let nSelRes = req.url.match(nSel)
      let detailId = nSelRes[0]
      if (!detailId) {
        detailId = -1
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.UserData.getInfo(detailId)])
        }, SetResTime)
      })
    })

    // 店铺List
    mock.onGet('branch/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.BranchData.getList()])
        }, SetResTime)
      })
    })
    // 部门树
    mock.onGet('deptTree/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Dept.getList()])
        }, SetResTime)
      })
    })
    // 部门list
    mock.onGet('dept/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Dept.getDeptList()])
        }, SetResTime)
      })
    })
    // 员工List
    mock.onGet('personnel/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.PersonnelData.getList()])
        }, SetResTime)
      })
    })
    // 员工职位类型List
    mock.onGet('position/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Position.getList()])
        }, SetResTime)
      })
    })
    // 员工申请List
    mock.onGet('apply/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Apply.getList()])
        }, SetResTime)
      })
    })
    // 我的申请List
    mock.onGet('myApply/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.MyApply.getList()])
        }, SetResTime)
      })
    })
    // 审批申请List
    mock.onGet('approval/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Approval.getList()])
        }, SetResTime)
      })
    })
    // 员工考勤List
    mock.onGet('attendance/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Attendance.getList()])
        }, SetResTime)
      })
    })
    // 会员List
    mock.onGet('member/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Member.getList()])
        }, SetResTime)
      })
    })
    // 会员动态List
    mock.onGet('memberDyna/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.MemberDyna.getList()])
        }, SetResTime)
      })
    })
    // 会员请假List
    mock.onGet('memberLeave/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.MemberLeave.getList()])
        }, SetResTime)
      })
    })
    // 器材List
    mock.onGet('apparatus/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Apparatus.getList()])
        }, SetResTime)
      })
    })
    // 器材类型List
    mock.onGet('apparatusType/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.ApparatusType.getList()])
        }, SetResTime)
      })
    })
    // 课程List
    mock.onGet('course/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Course.getList()])
        }, SetResTime)
      })
    })
    // 预约课程List
    mock.onGet('courseOrdered/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.CourseOrdered.getList()])
        }, SetResTime)
      })
    })
    // 教练预约List
    mock.onGet('coachOrdered/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.CoachOrdered.getList()])
        }, SetResTime)
      })
    })
    // 教练信息List
    mock.onGet('coach/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Coach.getList()])
        }, SetResTime)
      })
    })
    // 会籍-客户资料List
    mock.onGet('customer/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Customer.getList()])
        }, SetResTime)
      })
    })
    // 会籍-客户资料库List
    mock.onGet('customerLib/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.CustomerLib.getList()])
        }, SetResTime)
      })
    })
    // 会籍-任务List
    mock.onGet('memberShipTask/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.MemberShipTask.getList()])
        }, SetResTime)
      })
    })
    // 订单List
    mock.onGet('order/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.Order.getList()])
        }, SetResTime)
      })
    })
    // 卡种List
    mock.onGet('cardType/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.CardType.getList()])
        }, SetResTime)
      })
    })
    // 绩效 List
    mock.onGet('achCheck/list').reply(req => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([SuccessCode, MockData.AchCheck.getList()])
        }, SetResTime)
      })
    })
    // 任意地址 mock
    mock.onAny().reply(req => {
      let method = req.method
      // 处理删除事件
      if (method === 'delete') {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([SuccessCode, SuccessRes])
          }, SetResTime)
        })
      }
      // 处理保存事件
      if (method === 'post') {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([SuccessCode, SuccessRes])
          }, SetResTime)
        })
      }
    })
  }
}
