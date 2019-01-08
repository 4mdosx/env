import * as React from 'react'

export interface ListProps {
  renderHeader?: Function | JSX.Element
  renderFooter?: Function | JSX.Element
  children?: JSX.Element | JSX.Element[]
  style?: React.CSSProperties | {} | Array<{}>
}

export interface ListItemProps {
  align?: 'top' | 'middle' | 'bottom'
  disabled?: boolean
  multipleLine?: boolean
  children?: React.ReactNode
  thumb?: React.ReactNode | null
  extra?: React.ReactNode
  arrow?: 'horizontal' | 'down' | 'up' | 'empty' | ''
  wrap?: boolean
  onClick?: (e?: any) => void
  style?: React.CSSProperties | {} | Array<{}>
  activeStyle?: React.CSSProperties
  error?: boolean
  platform?: 'android' | 'ios'
}

export interface BriefProps {
  children?: React.ReactNode
  wrap?: boolean
  style?: React.CSSProperties | {} | Array<{}>
}
