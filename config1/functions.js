export const setClasses = function() {
  const mainClass = arguments[0]
  const classes = Array.from(arguments)
  classes.shift()
  return [mainClass, ...classes.filter(item => item !== false).map(item => `${mainClass}--${item}`)].join(' ')
}

export const setURL = function() {
  const classes = Array.from(arguments)
  return classes.includes('home') ? '/' : classes.map(item => '/' + item).join('')
}

export const getId = (size = 5) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < size; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const getNextId = list => {
  return list.length === 0 ? 1 : Number(Math.max(...list.map(item => item.id))) + 1
}

export const setUserGroup = email => {
  switch(email.split('@')[1]) {
    case 'hobbyworld.ru': return 'hobbyworld'
    case 'hobbygames.ru': return 'hobbygames'
    case 'crowdrepublic.ru': return 'crowdrepublic'
    default: return null
  }
}

export const getActualProjects = (projects, profile, stages) => projects
  .filter(item => Number(item.id) !== 0)
  .filter(item => profile === null 
    ? stages
      .filter(item => (item.id >= 6 && item.id <= 12 && item.id !== 10))
      .map(item => item.slug).includes(item.status)
    : profile.role === 'admin'
      ? item !== undefined
      : profile.role === 'creator'
        ? Number(item.creator_id) === Number(profile.id)
        : stages
          .filter(item => (item.id >= 6 && item.id <= 12 && item.id !== 10))
          .map(item => item.slug).includes(item.status)
  )

export const formatSum = sum => `₽ ${String(sum).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`

export const convertCategory = id => {
  switch(id) {
    case "BDG": return 'Настольная игра'
    case "BOK": return 'Книга'
    case "PRC": return 'Периодика'
    case "CMX": return 'Комикс'
    case "CST": return 'Другое'
    default: return `Другое`
  }
}

export const checkOptions = arr => {
  let count = 0
  
  arr.map(item => count += (String(item) !== '' && item !== null) ? 1 : 0
  )

  return count
}

export const formatBytes = (bytes, size = 'KB', decimals = 2) => {
  const sizes = [
    { value: 1, label: 'KB' },
    { value: 2, label: 'MB' },
    { value: 3, label: 'GB' }
  ]

  return `${parseFloat((bytes / Math.pow(1024, sizes.filter(item => item.label === size)[0].value)).toFixed(decimals < 0 ? 0 : decimals))} ${size}`
}

export const getLastInt = int => int.toString().split('').pop()

export const isNumeric = str => Number(str) == str ? true : false

export const isEmail = str => (str.includes('@') && str.split('@')[1].includes('.')) ? true : false

/*function compare(a, b) {
  const bandA = a.id;
  const bandB = b.id;

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}*/

export const compare = (a, b) => a.date_created > b.date_created ? 1 : -1

export const getThreadId = id => console.log(id)