import * as React from 'react'

export interface HelloCompsProps {
  left?: Array<{ text: React.ReactNode; onPress?: () => void; type?: any; style?: any; className?: string}>
  right?: Array<{ text: React.ReactNode; onPress?: () => void; type?: any; style?: any; className?: string}>
  style?: any
  /* web only */
  prefixCls?: string
}

class HelloComps extends React.Component<HelloCompsProps, any> {
  static defaultProps = {
    prefixCls: 'some-str',
    autoClose: false,
    disabled: false,
    left: [],
    right: [],
  }
  openedLeft: boolean
  openedRight: boolean
  left: any
  right: any

  constructor(props: HelloCompsProps) {
    super(props)
    this.state = {
      swiping: false
    }
    this.openedLeft = false
    this.openedRight = false
  }

  render () {
    return (
      <div className="ACompsName">
        HelloReact, with ant design code style
      </div>
    )
  }
}

export default HelloComps