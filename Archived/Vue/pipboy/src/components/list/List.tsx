import * as React from 'react'
import * as classnames from 'classnames'
import Item from './ListItem'

import { ListProps as BasePropsType } from './PropsType'

interface State {

}

export interface ListProps extends BasePropsType {
  prefixCls?: string
  className?: string
}

class List extends React.Component<ListProps> {
  static Item = Item

  static defaultProps: Partial<ListProps> = {
    prefixCls: 'list',
  }

  state: State = {}
  render() {
    let { prefixCls, className, style, children, renderHeader, renderFooter, ...restProps } = this.props
    const wrapCls = classnames(prefixCls, className)
  
    return (
      <div className={wrapCls} style={style} {...restProps}>
        {renderHeader ? (<div className={`${prefixCls}-header`}>
          {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
        </div>) : null}
        {children ? (<div className={`${prefixCls}-body`}>{children}</div>) : null}
        {renderFooter ? (<div className={`${prefixCls}-footer`}>
          {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
        </div>) : null}
      </div>
    )
  }
}

export default List