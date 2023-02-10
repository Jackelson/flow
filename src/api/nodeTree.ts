import request from '@/utils/request';


const baseURl = 'http://10.101.80.10:8888/testSystem'
export function getNodeTree() {
    return request({
        url: 'http://10.101.80.21:4000/brain/show/btree',
        method: 'post',
        data: {},
    })
}
// 添加行为树列表到服务器
export function saveTree(data: any) {
    return request({
        url: baseURl + '/addBtree',
        method: 'post',
        data,
    })
}
// 获取历史节点树详情
export function getTreeDetail(data: any) {
    return request({
        url: baseURl + '/detailBtree/'+data,
        method: 'get'
    })
}
// 获取历史树列表
export function getTreeList() {
    return request({
        url: baseURl + '/getBtree',
        method: 'get'
    })
}