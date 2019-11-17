'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  Animated,
  Easing,
  Image,
  View
} from 'react-native'

/**
 * Class encapsulating states, animations, and other details for Contextual Buttons in the app.
 * Used in the menu on the right, that gets activated when an object or a portal is tapped in the AR Scene.
 */
export default class RemoveButton extends Component {
  constructor(props) {
    super(props)
    this.scaleValue = new Animated.Value(0)

    // Bindings
    this.fadeAndScale = this.fadeAndScale.bind(this)
    this._onPress = this._onPress.bind(this)

    this.buttonScale = this.scaleValue.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [1, 1.2, 1]
    })
  }
  componentDidMount() {
    this.fadeAndScale()
  }
  render() {
    return (
      <TouchableHighlight underlayColor='#00000000' onPress={this._onPress}>
        <View>
          <Animated.Image
            source={this.props.stateImageArray[0]}
            style={[
              this.props.style,
              { opacity: this.buttonOpacity },
              {
                transform: [{ scale: this.buttonScale }]
              }
            ]}
          />
        </View>
      </TouchableHighlight>
    )
  }

  _onPress() {
    // from https://facebook.github.io/react-native/docs/performance.html#my-touchablex-view-isn-t-very-responsive
    requestAnimationFrame(() => {
      this.props.onPress()
    })
  }

  fadeAndScale() {
    this.scaleValue.setValue(0)
    Animated.timing(this.scaleValue, {
      toValue: 1,
      duration: 700,
      easing: Easing.linear,
      useNativeDriver: true
    }).start()
  }
}
