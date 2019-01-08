import * as React from 'react'
import './TransitionAvatar.less'

interface State {
  isImgExist: Boolean,
  isActive: Boolean,
  posStart: number[]
}
export interface TransitionAvatarProps {
  src: string,
  imgHeight: number, // 580
  imgWidth: number,  // 430
  posStart?: number[],
  alt?: string,
  className?: string,
  style?: React.CSSProperties,
  children?: any
}
// enum rx$
class TransitionAvatar extends React.Component<TransitionAvatarProps> {
  state: State = {
    isActive: false,
    isImgExist: true,
    posStart: [0, 0]
  }
  constructor (props: TransitionAvatarProps) {
    super(props)
    Object.assign(this.state, {
      posStart: this.props.posStart
    })
  }
  handleImgLoadError = () => {
    this.setState({isImgExist: false})
  }
  render() {
    const renderFullSize = () => {
      if (!this.state.isActive) {
        return null
      }
      return (
        <div 
          className="backgroundBoard" 
          onMouseLeave={() => {this.setState({isActive: false})}}
        >
          <img 
            className="fullSize-avatar"
            src={this.props.src}
            onError={this.handleImgLoadError}
          />
          {this.props.children}
        </div>
      )
    }
    return (
      <div 
        className="transitionAvatar" 
        style={this.props.style}
      >
        <span className="avatar" onMouseEnter={() => {this.setState({isActive: true})}}>
          <img 
            className="avatar_inner"
            src={this.props.src}
            onError={this.handleImgLoadError}
          />
        </span>
        {renderFullSize()}
      </div>
    )
  }
}

export default TransitionAvatar
