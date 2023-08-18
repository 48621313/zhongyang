import request from '@/utils/request'
export function clickDeviceApi(data) {
    return request({
      url: '/robot/device/touch',
      method: 'post',
      data,
    })
  }
