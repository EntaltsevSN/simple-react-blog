import { Logout } from "../redux/Profile/reducer";
import { setURL } from "./functions";

export const menu = {
  modules: [
    { value: 'projects', label: 'Проекты' },
    { value: 'blog', label: 'Блог' }
  ],
  profile: [
    { role: 'any', path: `${setURL('profile')}`, label: 'Профиль' },
    { role: 'any', path: `${setURL('profile', 'projects')}`, label: 'Проекты' },
    { role: 'moderator', path: `${setURL('profile', 'moderator')}`, label: 'Модератор' },
    { role: 'admin', path: `${setURL('profile', 'pager')}`, label: 'Страницы' },
    { role: 'manager', path: `${setURL('profile', 'manager')}`, label: 'Менеджер' },
    { role: 'admin', path: `${setURL('profile', 'organizer')}`, label: 'Управление' },
    { role: 'any', path: `#`, label: 'Выйти', callBack: Logout }
  ],
  support: [
    { path: `about`, label: 'О Crowd Republic' }, 
    { path: `faq`, label: 'Вопросы и ответы' },
    { path: `creator-guide`, label: 'Путеводитель куратора' }
  ],
  docs: [
    { path: `agreement`, label: 'Пользовательское соглашение' }, 
    { path: `policy`, label: 'Политика обработки персональных данных' },
    { path: `contacts`, label: 'Контакты' }
  ],
  social: [
    { path: `http://vk.com/crowdrepublic`, label: '[vk]' }, 
    { path: `https://www.facebook.com/CrowdRepublic`, label: '[facebook]' },
    { path: `https://twitter.com/RepublicCrowd`, label: '[twitter]' }
  ]
}