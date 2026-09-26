---
title: 待测试
description: 当前版本已实现但仍需人工验证的变更项
---

# 待测试

- [ ] Vercel / Serverless 部署环境兼容：后端在只读文件系统下自动将默认 SQLite 数据库与日志路径映射到 `/tmp` 目录，防止启动报 `unable to open database file (14)` 退出。
- [ ] 前端 `next.config.ts` 独立部署兼容：Vercel 设置 Root Directory 为 `web` 时安全容错读取版本与更新日志。
