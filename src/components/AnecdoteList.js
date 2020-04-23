import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>
          vote
        </button>
      </div>
    </div>
  )
}


const AnecdoteList = (props) => {


  const anecdotes = useSelector(
    state => {
      return state.anecdotes.filter(
        anecdote =>
          anecdote.content.includes(state.filter)
      )
    })
  const dispatch = useDispatch()

  return (
    <div>
      {
        anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => {
                dispatch(voteAnecdote(anecdote))
                dispatch(setNotification(`you voted '${anecdote.content}'`,5))
              }
              } />
          )
      }
    </div>
  )
}

export default AnecdoteList