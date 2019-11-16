'use strict'

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { ViroARScene, ViroNode, ViroText, ViroConstants, Viro3DObject, ViroAmbientLight, ViroSpotLight } from 'react-viro'
import { getModels } from '../store.js'
import { connect } from 'react-redux'

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

class DisconnectedGardenAR extends Component {
  constructor() {
    super()
    this.state = {
      text: 'Initializing AR...',
      models: []
    }
    // this.onInitialized = this.onInitialized.bind(this)
    this.renderModels = this.renderModels.bind(this)
  }
  componentDidMount() {
    // this.props.getAllModels()
  }
  // onInitialized(state, reason) {
  //   if (state === ViroConstants.TRACKING_NORMAL) {
  //     this.setState({
  //       text: 'Hello World!'
  //     })
  //   } else if (state === ViroConstants.TRACKING_NONE) {
  //     // Handle loss of tracking
  //   }
  // }
  renderModels(item) {
    console.log('RENDER MODELS', item)
    const models = item
    return (
      models.map((model, index) => {
        // const theSource = require('../res/emoji_smile/emoji_smile.vrx')
        // let test = '/'
        // test = test.concat(model.source)
      console.log('resource', model.resources)
          return (
            <Viro3DObject
              key={index}
              source={model.source}
              resouces={[...model.resources]}
              position={model.position}
              scale={model.scale}
              type={model.type}
            />
          )

        })
    )
  }
  render() {
    const models = (this.props.models) ? this.props.models : this.state.models
    return (
      <ViroARScene>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroAmbientLight color={'#aaaaaa'} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color='#ffffff'
          castsShadow={true}
        />
        {models ? this.renderModels(models) : <ViroNode />}
      </ViroARScene>
    )
  }
}

const mapStateToProps = state => {
  return {
    models: state.allModels
  }
}

const mapDispatchToProps = dispatch => ({
  getAllModels: () => dispatch(getModels())
})

const GardenAR = connect(mapStateToProps, mapDispatchToProps)(DisconnectedGardenAR)
export default GardenAR
