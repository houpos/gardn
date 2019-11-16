'use strict'

import React, { Component } from 'react'
import {
  ViroARScene,
  ViroNode,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight
} from 'react-viro'
import { getModels } from '../store.js'
import { connect } from 'react-redux'

class DisconnectedGardenAR extends Component {
  constructor() {
    super()
    this.state = {
      models: []
    }
    this.renderModels = this.renderModels.bind(this)
  }
  renderModels(models) {
    return models.map((model, index) => {
      return (
        <ViroNode
          key={index}
          position={[0, 0, -1]}
          dragType='FixedToWorld'
          onDrag={() => {}}
        >
          <Viro3DObject
            source={model.source}
            resouces={[...model.resources]}
            scale={model.scale}
            type={model.type}
          />
        </ViroNode>
      )
    })
  }
  render() {
    const models = this.props.models ? this.props.models : this.state.models
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
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

const GardenAR = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedGardenAR)
export default GardenAR
