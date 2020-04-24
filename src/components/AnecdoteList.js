import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

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

  const anecdotesToShow = () => {
    return props.anecdotes.filter(
      anecdote =>
        anecdote.content.includes(props.filter)
    )
  }


  return (
    <div>
      {
        anecdotesToShow()
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => {
                props.voteAnecdote(anecdote)
                props.setNotification(`you voted '${anecdote.content}'`, 5)
              }
              } />
          )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification

}
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList