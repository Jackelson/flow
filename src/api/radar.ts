import request from '../utils/request'
// 获取雷达图  radar

const baseURl = 'http://10.101.80.10:8888/testSystem'
export function getPeopleLocation() {
    return request({
        url: baseURl + '/RadarChart',
        method: 'get'
    })
}
export function getRobotLocation() {
    return request({
        url: '/getBtree',
        method: 'get'
    })
}