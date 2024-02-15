module.exports = {
  mysql: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    debug: process.env.DEBUG === "true",
  },
  tokenVercelBlob: process.env.TOKEN_VERCEL_BLOB,
  diretoryImagensActivity: '/www/imagens/activity/',
  urlBaseDiretoryImagensActivity: 'www.orlaclub.com/imagens/activity/',
  tableActivities: "Activities",
  tableUsers: "Users",
  tableAuth: "Auth",
  tablePictures: "Pictures",
  secret: process.env.SECRET,
};
