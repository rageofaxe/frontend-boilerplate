import React, { Component } from 'react'
import Portal from 'react-portal'
import FertelizersMap from './FertelizersMap'
import { connect } from 'react-redux'
import jQuery from 'jquery'
import Calendar from 'rc-calendar'
import locale from 'rc-calendar/lib/locale/ru_RU'
import 'rc-calendar/assets/index.css'

import Dropdown from '../UI/Dropdown'
import FormLine from '../UI/FormLine'
import Input from '../UI/Input'
import style from './style.css'
import Button from '../UI/Button/index'
import WORK_LIST from './works'
import { dateFormat } from '../../utils'

const buttonNormal = {
    borderRadius: 2,
    backgroundColor: '#54f2c3',
    fontSize: 18,
    fontWeight: 600,
    color: '#ffffff',
    padding: 11,
    whiteSpace: 'nowrap',
    width: 'calc(100% - 60px)',
    textAlign: 'center',
    cursor: 'pointer'
}

const rates = [
  {title: 'По полю', value: 'BY_FIELDS'},
  {title: 'По участкам', value: 'BY_SECTORS'},
]

class Fertilizers extends Component {

  state = {
    isOpenMap: false,
    rate: '',
    fertilizerId: '',

    type: 'fertilizing',
    dateStart: '',
    dateEnd: '',
    plowId: null,
    userId: null,
    comment: '',
    fieldId: this.props.fieldId,
    data: {
      fertilizing: [
        {
          fertilizerId: 1,
          sectorId: 2,
          value: 34
        }
      ]
    }
  }

  changeDateStart = date => {
    this.setState({
      openDateStart: false,
      dateStart: dateFormat(date._d),
    })
  }

  changeUser = item => this.setState({ userId: item.value })
  changeTractor = item => this.setState({ tractorId: item.value })
  changePlow = item => this.setState({ plowId: item.value })
  changeComment = comment => this.setState({ comment: comment.target.value })

  changeDateEnd = date => {
    this.setState({
      openDateEnd: false,
      dateEnd: dateFormat(date._d),
    })
  }

  onSubmit = () => {
    jQuery.ajax({
      url: 'http://api.onesoil.by/v1.0.0/operations/data',
      dataType: 'json',
      contentType: "application/json",
      type: 'POST',
      data: JSON.stringify(this.state),
      success: (data) => {
        this.props.popup.handleClose()
      }
    })
  }

  handleClose = () => {
    this.state.isOpenMap = false
    this.state.data.fertilizing = this.props.geometry.mapSectors
    this.forceUpdate()
  }
  changeRate = item => this.setState({rate: item.value})
  changeFertilizer = item => this.setState({fertilizerId: item.value})

  renderMap = () => {
    return <Portal
      closeOnEsc
      closeOnOutsideClick
      onClose={this.handleClose}
      onOpen={this.handleOpen}
      isOpened={this.state.isOpenMap}
    >
      <div style={{top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', background: 'white', zIndex: 11}}>
        <FertelizersMap
          handleClose={this.handleClose}
          fertilizerId={this.state.fertilizerId}
        />
      </div>
    </Portal>
  }

  render() {
    return (
      <div>
        {this.state.isOpenMap && this.renderMap()}
        <FormLine>
            <Dropdown
              options={WORK_LIST}
              onSelect={this.props.changeForm}
              label="Тип работы"
              width="33"
              value={WORK_LIST[3]}
            />
            <Input
              label="начало"
              onClick={() => this.setState({openDateStart: true})}
              value={this.state.dateStart}
              style={{width: 'calc(100% - 20px)'}}
            >
              {this.state.openDateStart && <Calendar
                locale={locale}
                style={{position: 'absolute', zIndex: 10}}
                onSelect={this.changeDateStart}
              />}
            </Input>

            <Input
              label="конец"
              onClick={() => this.setState({openDateEnd: true})}
              value={this.state.dateEnd}
              style={{width: 'calc(100% - 20px)'}}
            >
              {this.state.openDateEnd && <Calendar
                locale={locale}
                style={{position: 'absolute', zIndex: 10}}
                onSelect={this.changeDateEnd}
              />}
            </Input>
        </FormLine>
        <FormLine style={{alignItems: 'baseline'}}>
          <Dropdown
            options={this.props.data.fertilizers}
            label="Тип удобрений"
            onSelect={this.changeFertilizer}
          />
          <Dropdown
              options={rates}
              label="Вносить норму"
              onSelect={this.changeRate}
          />
          <div
            style={buttonNormal}
            onClick={() => {
                console.log('open')
                this.setState({isOpenMap: true})
            }}
          >
            Назначить норму
          </div>
        </FormLine>
        <FormLine>
            <Dropdown
              options={this.props.data.tractors}
              label="Трактор"
              onSelect={this.changeTractor}
            />
            <Dropdown
              options={this.props.data.plows}
              onSelect={this.changePlow}
              label="Орудие"
            />
        </FormLine>
        <FormLine>
            <Dropdown
              options={this.props.data.users}
              onSelect={this.changeUser}
              label="Механизатор"
            />
        </FormLine>
        <FormLine>
            <Input
                style={{width: 'calc(100% - 20px)'}}
                label="Комментарий"
                onChange={this.changeComment}
            />
        </FormLine>
        <FormLine style={{justifyContent: 'space-between'}}>
            <div style={{width: '33%'}} className={style.workhours}>4 трудочаса</div>
            <div style={{width: '33%'}}>
                <Button onClick={this.onSubmit}>Добавить работу</Button>
            </div>
            <div style={{width: '33%'}}></div>
        </FormLine>
      </div>
    )
  }
}

function mapStateToProps({ geometry }) {
  return {
    geometry
  }
}

export default connect(mapStateToProps, null)(Fertilizers)
