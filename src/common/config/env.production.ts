export default {
  // 服务基本配置
  SERVICE_CONFIG: {
    // 端口
    port: 3000,
  },

  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: '123.56.104.248',
    port: 3306,
    username: 'root',
    // password: 'root1234',
    password: 'r*we9omBG34j',
    database: 'like_home',
    autoLoadEntities: true,
    logging: false,
    synchronize: true,
  },
  WX_CONFIG: {
    AppID: 'wx1fc90f0311e94bd4',
    AppSecret: 'c1b25e6b6dd108051a2bbdfa1acd12b0',
  },
};
