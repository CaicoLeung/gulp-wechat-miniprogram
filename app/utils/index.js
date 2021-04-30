import config from '../config/index'

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export const formatTime = (date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${[year, month, day].map(formatNumber).join('/')} ${[[hour, minute, second].map(formatNumber).join(':')]}`
}

export const WXLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        resolve(res.code)
      },
      fail(error) {
        reject(error.errMsg)
      }
    })
  })
}

export const WXGetImageInfoAsync = (src) => {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src,
      success(res) {
        resolve({
          ...res,
          showActionSheet: false,
          tag: '',
          type: 'image'
        })
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

export const WXSubscribeMessage = (tmplIds) => {
  return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds,
      success(res) {
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          resolve(true)
        } else {
          reject(new Error('error'))
        }
      },
      fail(err) {
        console.error(`订阅消息回调: ${err.errMsg}`)
        reject(new Error('error'))
      }
    })
  })
}

export const currentPageRouteParamsConcat = (targerParams) => {
  const currentPages = getCurrentPages()
  const currentPage = currentPages[currentPages.length - 1]
  const finnalyQuery = Object.assign(currentPage.options, targerParams)
  const pathParamsList = Object.keys(finnalyQuery).map((item) => {
    return `${item}=${currentPage.options[item]}`
  })
  return `${currentPage.route}?${pathParamsList.join('&')}`
}

/*
* @param length 需要生成code的长度
* @return string 生成的code
* */
export const generateRandomCode = (length): string => {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const strElelmentArr = str.split('')
  let result: string[] = []
  for (let i = 0; i < length; i++) {
    result = result.concat(strElelmentArr[parseInt((Math.random() * strElelmentArr.length).toFixed(0), 10)])
  }
  return result.join('')
}

// 计算间隔月数
export const setIntervalMonthHandler = (currentCalendarSwiperDate, create_time = { year: 2021, month: 5 }) => {
  const date: Date = new Date()
  const MonthDays = 30 * 24 * 60 * 60 * 1000
  const userCreateDate = new Date(create_time.year, create_time.month, 0)
  // 当前日历时间和最低可达时间(用户注册时间)间隔
  const intervalCreateMonth = Math.abs(Math.ceil((currentCalendarSwiperDate.valueOf() - userCreateDate.valueOf()) / MonthDays))
  // 当前日历时间和最高可达时间(当前时间)间隔
  const intervalNewMonth = Math.abs(Math.ceil((currentCalendarSwiperDate.valueOf() - date.valueOf()) / MonthDays))
  console.log(`和最低可达时间(用户注册时间)间隔: ${intervalCreateMonth}; 和最高可达时间(当前时间)间隔: ${intervalNewMonth}`)
  // 日历切换拦截
  return { intervalCreateMonth, intervalNewMonth }
}

// 获取节点的Node信息
export const getNodeOffsetInfoHandler = (className, fields) => {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .selectAll(className)
      .fields(fields)
      .exec((res) => {
        resolve(res[0])
      })
  })
}
