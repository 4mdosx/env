import * as React from 'react'
import { PostLit } from '@src/models'

import './TypeListItem.less'
const S_ADAY = 86400

interface State {

}

export interface TypePostItemProps {
  data: PostLit,
  active: boolean
  onClick?: any
}

class TypePostItem extends React.Component<TypePostItemProps> {
  state: State = {}

  _formNow (time: string) {
    const timeMS = +new Date(time)
    const gapS = (+new Date() - timeMS) / 1000
    if (gapS < S_ADAY) {
      const gapM = gapS / 60
      return gapM > 200 ? (gapM / 60).toFixed(1) + ' H' : gapM.toFixed(0) + ' M'
    } else {
      return Math.floor(gapS / S_ADAY ) + ' Day'
    }
  }

  clickHandle = () => {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render() {
    // , id, summary, doctype
    const { title, update_at, summary } = this.props.data
    return (
      <div className={this.props.active ? 'type_post-item active' : 'type_post-item'} onClick={this.clickHandle}>
        <i className="statusBar" />
        <div className="sideBar">
          {this._formNow(update_at as string)}
        </div>
        <div className="main">
          <h1 className="title">{title}</h1>
          <p className="summary">{summary}</p>
        </div>
      </div>
    )
  }
}

export default TypePostItem