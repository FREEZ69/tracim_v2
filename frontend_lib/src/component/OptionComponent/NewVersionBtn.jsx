import React from 'react'
import Radium from 'radium'
import { translate } from 'react-i18next'

const NewVersionBtn = props => {
  return (
    <button
      data-cy='wsContentGeneric__option__menu__addversion'
      className='wsContentGeneric__option__menu__addversion newversionbtn btn outlineTextBtn'
      onClick={props.onClickNewVersionBtn}
      disabled={props.disabled}
      style={{
        backgroundColor: '#fdfdfd',
        color: '#333',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: props.customColor,
        ':hover': {
          backgroundColor: props.customColor,
          color: '#fdfdfd'
        }
      }}
    >
      <i className='fa fa-plus-circle mr-3' />
      {props.label}
    </button>
  )
}

export default translate()(Radium(NewVersionBtn))
