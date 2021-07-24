export const url = function() { 
  return [...Array.from(arguments).filter(item => ![false, undefined].includes(item))]
    .map(item => item === 'home' ? '/' : `/${item}`)
    .join('') 
}

export const classes = function() {
  const base = arguments[0]
  return [base, ...Array.from(arguments).slice(1).filter(item => ![false, undefined].includes(item)).map(item => `${base}--${item}`)]
    .join(' ')
}