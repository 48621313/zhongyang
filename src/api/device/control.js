import request from '@/utils/request'
export function clickDeviceApi(data) {
  return request({
    url: '/robot/device/touch',
    method: 'post',
    data,
  })
}
// ids startStream
export function getStream(data) {
  return request({
    url: '/robot/device/getStream',
    method: 'post',
    data,
  })
}