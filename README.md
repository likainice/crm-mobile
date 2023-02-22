
### 前言 📖

qfb mobile，基于 Vue3、TypeScript、Vite2、Pinia、vantUI

### 项目相关文档 📚

- 代码规范文档：[STANDARD.md](./STANDARD.md)

### 一、在线预览 👀

- Link：https://org.iqifubao.com

### 二、Git 仓库地址 (欢迎 Star⭐)

- Git：ssh://git@47.105.116.5:22/data/qfb_mobile.git

### 三、🔨🔨🔨 项目功能

- 🚀 使用 Vue3.2 开发，单文件组件 `＜script setup＞`
- 🚀 采用 Vite2 作为项目开发、打包工具（配置了 Gzip 打包、TSX 语法、跨域代理、打包预览工具……）
- 🚀 整个项目集成了 TypeScript 
- 🚀 使用 Pinia🍍 替代 Vuex，轻量、简单、易用（集成了持久化插件）
- 🚀 使用 TypeScript 对 Axios 整个二次封装 （全局错误拦截、常用请求封装、全局请求 Loading、取消重复请求……）
- 🚀 使用 vue-router 进行路由权限拦截（403 页面）、页面按钮权限配置、路由懒加载
- 🚀 使用 keep-alive 对整个页面进行缓存，支持多级嵌套页面（缓存路由里可配置、页面切换带动画）
- 🚀 常用自定义指令开发（复制、水印、拖拽、节流、防抖、长按……）
- 🚀 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范（STANDARD.md 文件）

### 四、安装使用步骤 📔

- **安装node环境：**

  Link：https://nodejs.org
```text
检查node 在终端里面输入node -v和npm -v 
```

- **安装vue：**
```text
执行：
yarn global add @vue/cli
# 或
npm install -g @vue/cli

vue -V  查看版本是否安装成功
```

- **Clone：**

```text
git clone ssh://git@47.105.116.5:22/data/qfb_mobile.git
```

- **Install：**

```text
根目录执行
npm install（或以下方式）

# npm install 安装失败，请升级 nodejs 到 16 以上
或尝试使用以下命令：
npm install --registry=https://registry.npm.taobao.org
cnpm install

# 推荐使用pnmp（速度快、高效利用磁盘空间等...）
全局安装npm i pnpm -g
pnpm install
```

- **Run：**

```text
npm run dev
npm run serve
```

- **Build：**

```text
# 开发环境
npm run build:dev

# 测试环境
npm run build:test

# 生产环境
npm run build:pro
```

- **Lint：**

```text
# eslint 检测代码
npm run lint:eslint

# prettier 格式化代码
npm run lint:prettier

# stylelint 格式化样式
lint:stylelint
```


### 六、文件资源目录 📚

```text
qfb-mobile
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ directives          # 全局指令文件
│  ├─ hooks               # 常用 Hooks
│  ├─ layout              # 框架布局
│  ├─ routers             # 路由管理
│  ├─ store               # pinia store
│  ├─ styles              # 全局样式
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 工具库
│  ├─ views               # 项目所有页面
│  ├─ App.vue             # 入口页面
│  └─ main.ts             # 入口文件
├─ .editorconfig          # 编辑器配置（格式化）
├─ .env                   # 默认环境配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ index.html             # 入口 html
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ README.md              # README 介绍
├─ STANDARD.md            # 项目编码规范说明书
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 配置
```



