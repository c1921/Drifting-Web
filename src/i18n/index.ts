import { createI18n } from 'vue-i18n';

// 定义消息
const messages = {
  en: {
    welcome: 'Welcome to My Vue App',
    generateCharacter: 'Generate Character',
    characterInfo: 'Character Information',
    name: 'Name',
    gender: 'Gender',
    age: 'Age',
    strength: 'Strength',
    agility: 'Agility',
    charisma: 'Charisma',
    intelligence: 'Intelligence',
    currentTime: 'Current Time',
    pause: 'Pause',
    resume: 'Resume',
  },
  zh: {
    welcome: '欢迎来到我的Vue应用',
    generateCharacter: '生成角色',
    characterInfo: '角色信息',
    name: '名字',
    gender: '性别',
    age: '年龄',
    strength: '力量',
    agility: '敏捷',
    charisma: '魅力',
    intelligence: '智力',
    currentTime: '当前时间',
    pause: '暂停',
    resume: '继续',
  },
};

// 创建i18n实例
const i18n = createI18n({
  locale: 'en', // 默认语言
  messages,
});

export default i18n;
