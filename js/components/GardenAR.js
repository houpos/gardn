'use strict'

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import { ViroARScene, ViroText, ViroConstants, ViroFlexView } from 'react-viro'

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 10,
    backgroundColor: '#ffffff'
  }
})

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super()
    this.state = {
      text: 'Initializing AR...'
    }
    this.onInitialized = this.onInitialized.bind(this)
  }
  onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!'
      })
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
  render() {
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
      </ViroARScene>
      // <ViroFlexView style={styles.flexView} />
    )
  }
}

module.exports = HelloWorldSceneAR
