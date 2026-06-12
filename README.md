# 闫亚宾教授课题组网站

华东理工大学机械与动力工程学院闫亚宾教授课题组网站。

## EdgeOne Pages 部署

- 框架预设：静态网站 / Other
- 构建命令：留空
- 输出目录：`.`
- 根目录：仓库根目录

## 留言板后台

留言接口位于 `functions/api/message/index.js`，公开地址为 `/api/message`。

在 EdgeOne Pages 控制台创建 KV 命名空间，并绑定到本项目：

- 命名空间建议名称：`guestbook-messages`
- 绑定变量名：`guestbook_messages`

访客留言会以 `message_时间戳_随机值` 为 Key 保存。进入 EdgeOne Pages 控制台的 KV 存储记录列表即可查看留言 JSON，其中包含昵称、邮箱、留言内容和提交时间。
