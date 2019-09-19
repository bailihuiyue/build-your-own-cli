/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { getLocale } from 'umi-plugin-react/locale'
import { regex, wordsFormat } from './publicWord'
import { getToken } from '@/utils/authority'
//import PRO_URL from 'config';

const token:string | null = getToken();
const DEV_URL:string | null = 'https://xxx';
export const BaseUrl:string | null = process.env.NODE_ENV === 'development' ? DEV_URL : 'PRO_URL'

const codeMessage:any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
  return response;
};
const showErrotTip = (subCode: Number , response: Response) => {
  notification.error({
    message: wordsFormat('fe.hint.error'),
    description: subCode
      ? response.message || wordsFormat('fe.text.interFaceError')
      : `${response.error || wordsFormat('fe.hint.error')}: ${res.path ||
          wordsFormat('fe.text.interFaceError')}`
  })
}

/**
 * 数据过滤
 */
const processResult = (response: Response) => {
  const codeReg = regex.RE_RES_CODE_10000X;
  const {code, value} = response;
  switch (code) {
    case 100000:
      return value;
    case 100001:
      return [];
    default:
      if (codeReg.test(code)) {
        return value
      }
      showErrotTip(code, response)
      return false
  }
}

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  maxCache: 0, // 最大缓存个数, 超出后会自动清掉按时间最开始的一个.
  prefix: '', // prefix
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    token:token  // 统一的headers
  },
  params: {
    // 每个请求都要带上的query参数
  }
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url:string, options:any) => {
  const newOptions = {...options}
  if (
    newOptions.method === 'get' ||
    newOptions.method === 'post' ||
    newOptions.method === 'put' ||
    newOptions.method === 'delete'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        'Content-Type': 'application/json',
        ...newOptions.headers
      }
      newOptions.body = JSON.stringify(newOptions.body);
    }
  }
  return (
    {
      url: `${BaseUrl}${url}`,
      options: { ...newOptions, interceptors: true },
    }
  );
});

// response拦截器, 处理response
request.interceptors.response.use(async (response:any) => {
  const {status} = response;
  switch (status) {
    case 200:
      const data = await response.clone().json();
      return processResult(data);
    case 403:
      console.log(403);
      break;
    case 500:
      console.log(500);
      break;
    case 401:
      console.log(401);
      window.g_app._store.dispatch({
        type: 'userLogin/logout'
      })
      break;
    default:
      break;
  }

});

export default request;
