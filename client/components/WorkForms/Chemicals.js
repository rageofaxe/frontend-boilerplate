import React, { Component } from 'react'
import jQuery from 'jquery'
import Calendar from 'rc-calendar'
import locale from 'rc-calendar/lib/locale/ru_RU'
import 'rc-calendar/assets/index.css'
import R from 'ramda'

import { dateFormat } from '../../utils'
import Dropdown from '../UI/Dropdown'
import FormLine from '../UI/FormLine'
import Input from '../UI/Input'
import style from './style.css'
import Button from "../UI/Button/index";
import WORK_LIST from './works'

export default class Chemicals extends Component {

  state = {
    data: {chemicals: [{}]},
    type: 'chemical',
    dateStart: null,
    dateEnd: null,
    fertilizerId: null,
    fertilizerValue: '',
    tractorId: null,
    plowId: null,
    cost: null,
    comment: '',
    userId: null,
    fieldId: this.props.fieldId,
  }

  changeDateStart = date => {
    this.setState({
      openDateStart: false,
      dateStart: dateFormat(date._d),
    })
  }

  removeChemical = index => {
    console.log('<<>>', index, this.state.data.chemicals, R.remove(index, 1, this.state.data.chemicals))
    this.forceUpdate()
    this.state.data.chemicals = R.remove(index, 1, this.state.data.chemicals)
    if(!(R.isEmpty(R.last(this.state.data.chemicals)))) {
      this.state.data.chemicals.push({})
    }
    this.forceUpdate()
  }

  changeUser = item => this.setState({ userId: item.value })
  changeTractor = item => this.setState({ tractorId: item.value })
  changePlow = item => this.setState({ plowId: item.value })
  changeComment = comment => this.setState({ comment: comment.target.value })
  changeCost = cost => this.setState({ cost: cost.target.value })

  changeDateEnd = date => {
    this.setState({
      openDateEnd: false,
      dateEnd: dateFormat(date._d),
    })
  }

  onSubmit = () => {
    console.log('!!!', this.state)
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

  selectChemicals = (chemical, index) => {
    if(R.isEmpty(this.state.data.chemicals[index])) {
      this.state.data.chemicals[index] = chemical
      this.state.data.chemicals.push({})
      this.forceUpdate()
    }
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
                    value={WORK_LIST[2]}
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

                {this.state.data.chemicals.map((item, index) => <FormLine
                    key={index}
                    style={{marginBottom: 8, alignItems: 'baseline'}}
                    removable
                >
                   {index > 0 && <div style={{position: 'absolute', left: 26, marginTop: 12}}>
                      <img
                        src="/public/svg/close.svg"
                        onClick={() => this.removeChemical(index)}
                      />
                    </div>}
                    <Dropdown
                      options={this.props.data.chemicals}
                      label="Препарат"
                      onSelect={() => this.selectChemicals({chemical: 'chemical'}, index)}
                    />
                    <div style={{width: 32}}></div>
                    <Dropdown
                      options={this.props.data.rates}
                      label="Норма, кг/га"
                      style={{marginLeft: 20}}
                    />
                    <div style={{width: '20%', textAlign: 'right'}}>100 кг</div>
                </FormLine>)}

                <FormLine>
                    <Dropdown
                      options={this.props.data.tractors}
                      label="Трактор"
                      onSelect={this.changeTractor}
                    />
                    <Dropdown
                      options={this.props.data.plows}
                      label="Орудие"
                      onSelect={this.changePlow}
                    />
                </FormLine>
                <FormLine>
                    <Dropdown
                      options={this.props.data.users}
                      label="Механизатор"
                      onSelect={this.changeUser}
                    />
                </FormLine>
                <FormLine>
                    <Input
                        style={{width: 'calc(33% - 7px)'}}
                        label="Стоимость обработки, руб"
                        onChange={this.changeCost}
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
                    <div style={{width: '33%'}} className={style.workhours}>
                        5 606 кг химии<br />
                        4 трудочаса
                    </div>
                    <div style={{width: '33%'}}>
                        <Button onClick={this.onSubmit}>Добавить работу</Button>
                    </div>
                    <div style={{width: '33%'}}></div>
                </FormLine>
            </div>
        )
    }
}
