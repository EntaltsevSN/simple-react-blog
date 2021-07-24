const SEARCH = 'SEARCH'

export const setSearch = query => ({
  type: SEARCH, payload: query
})

export const search = (state = '', { type, payload }) => {
  switch(type) {
    case SEARCH:
      return payload
    default: 
      return state
  }
}