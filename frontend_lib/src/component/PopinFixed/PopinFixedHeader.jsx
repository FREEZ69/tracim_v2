import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

class PopinFixedHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editTitle: false,
      editTitleValue: props.title
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.title !== this.props.title) this.setState({editTitleValue: this.props.title})
  }

  onChangeTitle = e => {
    const newTitle = e.target.value
    this.setState({editTitleValue: newTitle})
  }

  handleClickChangeTitleBtn = () => {
    if (this.state.editTitle) this.props.onValidateChangeTitle(this.state.editTitleValue)

    this.setState(prevState => ({editTitle: !prevState.editTitle}))
  }

  handleInputKeyPress = e => {
    switch (e.key) {
      case 'Enter': this.handleClickChangeTitleBtn(); break
      case 'Escape': this.setState({editTitle: false, editTitleValue: this.props.title}); break
    }
  }

  render () {
    const { customClass, customColor, faIcon, title, idRoleUserWorkspace, onClickCloseBtn, disableChangeTitle, t } = this.props
    const { state } = this

    return (
      <div className={classnames('wsContentGeneric__header', `${customClass}__header`)} style={{backgroundColor: customColor}}>
        <div className={classnames('wsContentGeneric__header__icon', `${customClass}__header__icon`)}>
          <i className={`fa fa-${faIcon}`} />
        </div>

        <div
          className={classnames('wsContentGeneric__header__title', `${customClass}__header__title`)}
          title={title}
        >
          {state.editTitle
            ? <input
              className='wsContentGeneric__header__title__editiontitle editiontitle'
              value={state.editTitleValue}
              onChange={this.onChangeTitle}
              onKeyDown={this.handleInputKeyPress}
            />
            : title
          }
        </div>

        {idRoleUserWorkspace >= 2 &&
          <button
            className={classnames('wsContentGeneric__header__edittitle', `${customClass}__header__changetitle iconBtn`)}
            onClick={this.handleClickChangeTitleBtn}
            disabled={disableChangeTitle}
          >
            {state.editTitle ? <i className='fa fa-check' title={t('validate the title')} /> : <i className='fa fa-pencil' title={t('edit title')} />}
          </button>
        }

        <div
          className={classnames('wsContentGeneric__header__close', `${customClass}__header__close iconBtn`)}
          onClick={onClickCloseBtn}
        >
          <i className='fa fa-times' />
        </div>
      </div>
    )
  }
}

export default translate()(PopinFixedHeader)

PopinFixedHeader.propTypes = {
  faIcon: PropTypes.string.isRequired,
  onClickCloseBtn: PropTypes.func.isRequired,
  customClass: PropTypes.string,
  customColor: PropTypes.string,
  title: PropTypes.string,
  idRoleUserWorkspace: PropTypes.number,
  onValidateChangeTitle: PropTypes.func,
  disableChangeTitle: PropTypes.bool
}

PopinFixedHeader.defaultProps = {
  customClass: '',
  customColor: '',
  title: '',
  idRoleUserWorkspace: 1,
  onChangeTitle: () => {},
  disableChangeTitle: false
}
