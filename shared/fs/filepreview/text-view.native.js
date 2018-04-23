// @flow
import * as React from 'react'
import {globalColors, globalMargins} from '../../styles'
import {WebView} from 'react-native'

type TextViewProps = {
  url: string,
}

// We need to do the spacing in the guest content of the webView rather than
// the component's styles, to make it feel like the whole "view" is
// scrollable".  The <body> element has the actual content, while <html>
// provides the top and bottom margin that blends with the rest of the app.
const webviewJS = `
const node = document.createElement('style')
document.body.appendChild(node)
node.innerHTML = \`
html{
  background-color: ${globalColors.blue5};
  padding-top: 32; 
  padding-bottom: 32; 
  margin: 0;
}
body{
  background-color: ${globalColors.white};
  padding: ${globalMargins.medium};
  margin: 0;
  color: ${globalColors.black_60};
  font-size: 15;
  line-height: 1.6;
}
\`
`

const TextView = ({url}: TextViewProps) => <WebView source={{uri: url}} injectedJavaScript={webviewJS} />

export default TextView