//  Created by react-native-create-bridge

import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'

const CameraManager = requireNativeComponent('CameraManager', CameraViewer)

export default class CameraViewer extends Component {
  render () {
    return <CameraManager {...this.props} />
  }
}

// MyButtonView.propTypes = {
//   exampleProp: React.PropTypes.string
// }
