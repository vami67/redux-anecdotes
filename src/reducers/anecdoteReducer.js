import anecdotesService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'UPDATE':
      const id = action.data.returnedAnecdote.id

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data.returnedAnecdote
      )

    case 'ADD':
      return [...state, action.data.anecdote]

    case 'INIT_ANECDOTES':
      return action.data

    default: // jos ei mikään ylläolevista tullaan tänne
      return state
  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const id = anecdote.id
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const returnedAnecdote = await anecdotesService.update(id, votedAnecdote)
    dispatch({
      type: 'UPDATE',
      data: {
        returnedAnecdote
      }
    })
  }
}

export const createAnecdote = (anecdoteObject) => {
  return async dispatch => {
    const anecdote = await anecdotesService.create(anecdoteObject)
    dispatch({
      type: 'ADD',
      data: {
        anecdote
      }
    })
  }


}

export default anecdoteReducer