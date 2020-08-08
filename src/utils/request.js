// 配置axios拦截器
import axios from 'axios';

// 1. 创建实例
const service = axios.create({
  // src下面.env..三个文件配置环境变量 process.env.NODE_ENV读取环境 process.env.REACT_APP_API读取变量替换baseURL
  baseURL: process.env.REACT_APP_API,
  // baseURL: '/devApi',
  timeout: 5000,
});

// 2. 请求拦截
// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 3. 响应拦截
// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service;