import React from 'react'
import { connect } from 'react-redux'
import range from 'lodash.range'
import { Row } from './Flex'

let id

let toggleSequencer = (playing) => {
  return (dispatch) => {
    dispatch({ type: `TOGGLE_SEQUENCER` })

    if (!playing) {
      id = setInterval(() => dispatch({ type: `UPDATE_STEP` }), 1000)
    } else clearInterval(id)
  }
}

let Sequencer = props => {
  return (
    <Row style={{
      justifyContent: `space-around`,
      alignItems: `center`,
      marginBottom: `20px`,
      padding: `0 30px 0 10px`,
    }}>
      <button
        style={{
          background: props.state.playing ? `#f4679f` : `white`,
          cursor: `pointer`,
          color: props.state.playing ? `white` : `#f4679f`,
          border: `2px solid #f4679f`,
          borderRadius: `5px`,
          width: `50px`,
        }}
        onClick={() => props.dispatch(toggleSequencer(props.state.playing))}
      >
        {props.state.playing ? `STOP`: `PLAY`}
      </button>
      {range(16).map(x =>
        <div key={x} className={`led ${props.state.step === x ? `active` : ``}`} />
      )}
    </Row>
  )
}

export default connect(state => ({ state }))(Sequencer)