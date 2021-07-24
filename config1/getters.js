import { getNextId, setUserGroup } from "./functions"

export const getNewUser = (payload, users, docId) => ({
  id: getNextId(users),
  login: payload.login,
  email: payload.email,
  avatar: null,
  funds: 0,
  role: 'user',
  group: setUserGroup(payload.email),
  birthday: null,
  gender: null,
  registered: + new Date(),
  log: [
    {
      id: 1,
      type: 'profile',
      operation: 'created',
      date: + new Date()
    }
  ],
  delivery: {
    
  },
  social: {
    facebook: '',
    vk: '',
    instagram: ''
  },
  cart: [],
  docId
})

export const getNewProject = (payload, projects, docId) => ({
  id: getNextId(projects),
  title: payload.title,
  rewards: [],
  goals: [],
  files: [],
  links: [],
  faq: [],
  news: [],
  image: null,
  video: null,
  banner: null,
  no_funding_goal: false,
  funding_goal: 1000,
  funding_sum: 0,
  date_start: + new Date(),
  date_finish: + new Date(),
  date_second_chance: + new Date(),
  description: '',
  content: '',
  status: 'NEW',
  creator_id: payload.creatorId,
  template: 'basic',
  templateImages: {
    left: null,
    right: null
  },
  log: [
    {id: 1, type: 'created', date: + new Date()}
  ],
  comments: [],
  members: [],
  category: null,
  subscribers: [],
  docId
})

export const getNewReward = (list, title = '', image = null, price = 0, description = '', content = '', addon = false, backerLimit = 0, secondChance = false, limit = 0, digital = false, order = 0, backed = 0, buyers = 0) => ({
  id: list.length === 0 ? 1 : getNextId(list),
  title, image, price, description, content, addon, 
  backer_limit: backerLimit, 
  second_chance: secondChance, 
  limit, digital, order, backed, buyers, status: 'NEW'
})

export const getNewGoal = (list, title = '', image = null, funding_goal   = 1000, description = '') => ({
  id: list.length === 0 ? 1 : getNextId(list),
  title, image, funding_goal, description
})

export const getNewNewsPost = (list, title = '', image = null, description = '', content = '', membersOnly = false, hotNews = false, published = false) => ({
  id: list.length === 0 ? 1 : getNextId(list),
  title, image, description, content, membersOnly, hotNews, published,
  date_created: + new Date(), comments: []
})

export const getNewBlogPost = (list, title = '', image = null, description = '', content = '', hotBlog = false, published = false, comments_thread, docId) => ({
  id: list.length === 0 ? 1 : getNextId(list),
  title, image, description, content, hotBlog, published, comments_thread,
  docId, date_created: + new Date()
})

export const getNewLink = (list, title = '', url = '') => ({
  id: list.length === 0 ? 1 : getNextId(list),
  title,
  url
})

export const getNewFile = (list, title = '', file = null, meta = {}) => ({
  id: list.length === 0 ? 1 : getNextId(list),
  title, file, meta
})

export const getNewFAQ = (list, question = '', answer = '') => ({
  id: list.length === 0 ? 1 : getNextId(list),
  question,
  answer
})

export const getNewRequest = (list, type, id, docId) => ({
  id: list.length === 0 ? 1 : getNextId(list),
  type, data_id: id, 
  comment: '', 
  status: 'pending', 
  date_created: +new Date(),
  date_updated: null,
  docId
})

export const getNewProjectCart = (list, project, rewards) => ({
  id: list.length === 0 ? 1 : getNextId(list),
  project_id: project.id,
  rewards
})

/*export const getNewComment = (list, text, author_id, reply_id = null, tree_id = null) => ({
  id: list.length === 0 ? 1 : getNextId(list),
  text,
  author_id,
  reply_id,
  tree_id,
  date_created: +new Date()
})*/

export const getNewCartReward = (id, count) => ({
  id, count
})

export const getNewPage = (list, title = '', slug = '', content = '', docId) => ({
  id: list.length === 0 ? 1 : getNextId(list),
  title, content, docId
})

export const getNewCommentsThread = (list, type = '', docId) => ({
  id: list.length === 0 ? 1 : getNextId(list),
  type,
  date_created: +new Date(),
  docId
})

export const getNewComment = (list, commentsThread = '', userId = '', text = '', parentId = null, docId) => ({
  id: getNextId(list),
  date_created: +new Date(),
  commentsThread, userId, text, parentId,
  docId
})