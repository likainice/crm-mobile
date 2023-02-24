## 用法

### Get 请求
##### 写法1
```
import http from "/@/utils/request";

// params传参
http.get('/xxx', { params: param } , options);

// url拼接传参
http.get('/xxx?message=' + msg, options);
```
##### 写法2
```
import http from "/@/utils/request";

http({
    url: /xxx, || /xxx?message=' + msg
    method: "get",
    headers: {},
});
```

### Post 请求
##### 写法1

```
import http from "/@/utils/request";
// params传参
http('/xxx', { params: param } , options);

// data传参
http('/xxx', { data: param } , options);
```

##### 写法2
```
import http from "/@/utils/request";

http({
    url: /xxx,
    method: "post",
    headers: {},
    params: param || data:param
});
```
