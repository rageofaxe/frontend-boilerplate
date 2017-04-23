import React, { Component } from 'react'
import { connect } from 'react-redux'
import FieldsHistory from '../FieldsHistory'
import FieldsHistoryItem from '../FieldsHistory/item'
import style from './style.css';
import styleField from '../../containers/Fields/style.css';

class Report extends Component {

  render() {
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
              ? <div className={styleField.scrollBar} style={{height: 'calc(100vh - 210px)'}}>
                  {this.props.worksHistory.history.map((item, i) => <FieldsHistoryItem key={i} data={item} />)}
                </div>
              : <div className={styleField.scrollBar} style={{height: 'calc(100vh - 210px)'}}>
                  {this.props.worksHistory.inProgress.map((item, i) => <FieldsHistoryItem key={i} data={item} />)}
                </div>
            }
            </div>
          </FieldsHistory>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    worksHistory: state.worksHistory
  }
}

export default connect(
  mapStateToProps,
  null
)(Report)
