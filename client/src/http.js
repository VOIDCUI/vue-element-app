import axios from 'axios'
import { Message,Loading } from 'element-ui'
import router from "./router"
let loading

function startLoading(){
    loading = Loading.service({
        lock:true,
        text:'拼命加载中...',
        background:'rgba(0,0,0,0.7)'
    })
}

function endLoading(){
    loading.close()
}
//请求拦截
axios.interceptors.request.use(config=>{
    startLoading();
    //加载动画

    if(localStorage.eleToken){
        config.headers.Authorization = localStorage.eleToken;
    }


    return config;
},error=>{return Promise.reject(error)})



//响应拦截
axios.interceptors.response.use(response=>{
    endLoading();
    return response;
},error=>{
    endLoading();
    //错误提醒
    Message.error(error.response.data);

    //获取错误状态码
    const {status} = error.response

   
    if (status == 401 ){
        Message.error('用户信息已过期，请重新登录!')
         //清除过期token
        localStorage.removeItem('eleToken');
        //跳转登陆界面
        router.push('/login');
    }
    return Promise.reject(error);

})


export default axios