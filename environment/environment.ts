export const environment = {
    typeormConfig: {
      type: 'mysql',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: 'root',
      database: 'app_pokedex',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    },
    url:{
      img: "https://drive.google.com/uc?id="
    },
    criptography: {
      passwordCryptoJS: 'sistemas',
    },
    translatorConfig: {
      global: true,
      defaultLang: 'es',
      translationSource: 'shared/i18n',
    },
    jwtConfig: {
      secret: 'sistemas',
      signOptions: { expiresIn: '3600s' },
    },
  };
  