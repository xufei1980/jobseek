/**
 * Created by think on 2018/2/10.
 */
export function getRedirectPath({type,avatar}) {
    //根据用户信息返回跳转页面地址
    //user.type '/boss' '/genius'
    //user.avatar '/bossinfo' '/geniusinfo'
    let url=(type==='boss')?'/boss':'/genius';
    if(!avatar){
        url+='info';
    }
    return url
}
export function getChatId(userId,targetId) {
    return [userId,targetId].sort().join('_')
}