// @flow
import React, {Component} from 'react'
import type {Props, HeaderTextProps} from './popup-menu'
import {Box, Text} from '../common-adapters/index'
import {globalColors, globalMargins, globalStyles} from '../styles'

class PopupMenu extends Component<void, Props, void> {
  render () {
    const realCSS = `
    .menu-hover:hover { background-color: ${(this.props.style && this.props.style.hoverColor) || globalColors.blue4}; }
    .menu-hover-danger:hover { background-color: ${globalColors.red}; }

    .menu-hover .title { color: ${globalColors.black_75}; }
    .menu-hover-danger .title { color: ${globalColors.red}; }
    .menu-hover-danger:hover .title { color: ${globalColors.white}; }
    .menu-hover-danger .subtitle { color: ${globalColors.black_40}; }
    .menu-hover-danger:hover .subtitle { color: ${globalColors.white}; }
    `

    return (
      <Box style={{...stylesMenuCatcher}} onClick={e => {
        this.props.onHidden()
        e.stopPropagation()
      }}>
        <style>{realCSS}</style>
        <Box style={{...stylesMenu, ...this.props.style}}>
          {this.props.header && this.props.header.view}
          <Box style={{...globalStyles.flexBoxColumn, flexShrink: 0, paddingTop: globalMargins.tiny, paddingBottom: globalMargins.tiny}}>
            {
              this.props.items.map((i, idx) => {
                if (i === 'Divider') {
                  return <Divider key={idx} />
                }

                return (
                  <Box key={i.title} className={i.danger ? 'menu-hover-danger' : 'menu-hover'} style={stylesRow} onClick={i.onClick}>
                    <Text className='title' type='Body' style={{...stylesMenuText, ...i.style}}>{i.title}</Text>
                    {i.subTitle && <Text className='subtitle' key={i.subTitle} type='BodySmall' style={{...stylesMenuText, ...i.style}}>{i.subTitle}</Text>}
                  </Box>
                )
              })
            }
          </Box>
        </Box>
      </Box>
    )
  }
}

const Divider = () => <Box style={{height: 1, backgroundColor: globalColors.black_05, marginTop: 8, marginBottom: 8}} />

const PopupHeaderText = ({color, backgroundColor, style, children}: HeaderTextProps) => (
  <Text
    type='BodySemibold'
    style={{
      textAlign: 'center',
      paddingLeft: globalMargins.small,
      paddingRight: globalMargins.small,
      paddingTop: globalMargins.tiny,
      paddingBottom: globalMargins.tiny,
      color,
      backgroundColor,
      ...style,
    }}
  >{children}</Text>
)

const stylesRow = {
  ...globalStyles.flexBoxColumn,
  paddingTop: globalMargins.xtiny,
  paddingBottom: globalMargins.xtiny,
  paddingLeft: globalMargins.small,
  paddingRight: globalMargins.small,
}

const stylesMenuCatcher = {
  ...globalStyles.flexBoxColumn,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const stylesMenu = {
  ...globalStyles.flexBoxColumn,
  ...globalStyles.clickable,
  minWidth: 200,
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  backgroundColor: globalColors.white,
  borderRadius: 3,
  boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.2)',
  overflowX: 'hidden',
  overflowY: 'auto',
}

const stylesMenuText = {
  ...globalStyles.clickable,
  color: undefined,
}

export {PopupHeaderText}

export default PopupMenu
