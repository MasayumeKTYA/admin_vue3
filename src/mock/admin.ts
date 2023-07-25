import Mock from "mockjs";
let data = Mock.mock({
  'list|10': [{
    'id|+1': 1,
    "account": /^1(5|3|7|8)[0-9]{9}$/,
    'username': '@cname',
    "email": "@EMAIL",
    'status|1-2': 1,
    "lastLogin": Mock.Random.date("yyyy-MM-dd"),
  }]
});

Mock.mock(/api\/admin\/power/, 'post', (option) => {
  console.log(option);
  const { page } = JSON.parse(option.body)
  return {
    code: 200,
    message: "请求成功",
    data: data.list
  };
});

Mock.setup({
  timeout: 200  // 响应延迟 500ms
});

