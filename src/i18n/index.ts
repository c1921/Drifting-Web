import { createI18n } from 'vue-i18n';

const messages = {
  en: {
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
    travel: 'Travel',
    team: 'Team',
    travelContent: 'Travel content goes here...',
    teamContent: 'Team content goes here...'
  },
  zh: {
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
    travel: '旅行',
    team: '团队',
    travelContent: '旅行内容在此...',
    teamContent: '团队内容在此...'
  }
};

const i18n = createI18n({
  locale: 'en',
  messages
});

export default i18n;
