export default {
  "login": [
    {
      label: "用户名",
      query: "user_name",
      type: "text",
      placeholder: "用户名: 6-8位 字母数字",
    },
    {
      label: "密码",
      query: "pwd",
      type: "password",
      placeholder: "密码: 8-12位 最少包含一位(数字/大小写字母)",
    }
  ],
  "column": [
    {
      label: "分类名称",
      query: "name",
      type: "text",
      placeholder: "请填写分类名称"
    }
  ],
  "register": [
    {
      label: "用户名",
      query: "user_name",
      type: "text",
      placeholder: "用户名: 6-8位 字母数字"
    },
    {
      label: "邮箱",
      query: "email",
      type: "text",
      placeholder: "请输入邮箱地址"
    },
    {
      label: "密码",
      query: "pwd",
      type: "password",
      placeholder: "密码: 8-12位 最少包含一位(数字/大小写字母)"
    }
  ],
  "userInfo": [
    {
      label: "用户名",
      query: "user_name",
      type: "text",
      readonly: true,
      placeholder: "用户名: 6-8位 字母数字"
    },
    {
      label: "头像",
      query: "avatar",
      type: 'avatar',
    },
    {
      label: "昵称",
      query: "nikname",
      type: "text",
      placeholder: "请输入昵称"
    },
    {
      label: "邮箱",
      query: "email",
      type: "text",
      placeholder: "请输入邮箱地址"
    },
    {
      label: "签名",
      query: "signature",
      type: "text",
      placeholder: "请输入你的个性签名"
    }
  ]
}
