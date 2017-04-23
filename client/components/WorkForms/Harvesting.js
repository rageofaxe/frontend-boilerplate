import React, { Component } from 'react'
import jQuery from 'jquery'
import Calendar from 'rc-calendar'
import locale from 'rc-calendar/lib/locale/ru_RU'
import 'rc-calendar/assets/index.css'

import Dropdown from '../UI/Dropdown'
import FormLine from '../UI/FormLine'
import Input from '../UI/Input'
import style from './style.css'
import Button from "../UI/Button/index";
import WORK_LIST from './works'
import { dateFormat } from '../../utils'

export default class Harvesting extends Component {

  state = {
    openDateStart: false,
    type: 'harvesting',
    dateStart: '',
    dateEnd: '',
    plowId: null,
    userId: null,
    comment: '',
    fieldId: this.props.fieldId,
  }

  changeDateStart = date => {
    this.setState({
      openDateStart: false,
      dateStart: dateFormat(date._d),
    })
  }

  changeUser = item => this.setState({ userId: item.value })
  changeTractor = item => this.setState({ tractorId: item.value })
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

  render() {
    return (
      <div>
        <FormLine>
          <Dropdown
            options={WORK_LIST}
            onSelect={this.props.changeForm}
            label="Тип работы"
            width="33"
            value={WORK_LIST[4]}
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
        <FormLine>
          <Dropdown
            options={this.props.data.tractors}
            onSelect={this.changeTractor}
            label="Комбайн"
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
