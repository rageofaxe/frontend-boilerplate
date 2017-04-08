import React, { Component } from 'react'
import FieldsHistory from '../FieldsHistory'
import FieldsHistoryItem from '../FieldsHistory/item'
import style from './style.css';
import styleField from '../../containers/Fields/style.css';

class Report extends Component {

  render() {
    const fields = [1,2,3,4,5,6,7,8,9,10]
    return (
      <div
        className={this.props.className}
      >
        <div className={style.root}>
          <div>
            <div
              className={style.title}
            >
              Добавить работу
            </div>
            <div className={style.dataRow}>
              <div className={style.dataKey}>Название</div>
              <div className={style.dataValue}>{this.props.data.title}</div>
            </div>
            <div className={style.dataRow}>
              <div className={style.dataKey}>Культура</div>
              <div className={style.dataValue}>{this.props.data.culture}</div>
            </div>
            <div className={style.dataRow}>
              <div className={style.dataKey}>Площадь</div>
              <div className={style.dataValue}>{this.props.data.area}</div>
            </div>
          </div>

          <div className={style.footer}>
            +12°C, дождь, 767 мм
          </div>
        </div>
          <FieldsHistory currentRoute={this.props.currentRoute}>
            <div>
            {this.props.currentRoute === '/fields/work/doing'
              ? <div>История операция</div>
              : <div className={styleField.scrollBar}>
                  {fields.map((item, i) => <FieldsHistoryItem key={i} />)}
                </div>
            }
            </div>
          </FieldsHistory>
      </div>
    )
  }
}

export default Report
