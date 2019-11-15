import React from 'react'
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native'
import { ViroARSceneNavigator } from 'react-viro'

const AR_NAVIGATOR = 'AR_NAVIGATOR'
const GARDEN_SELECTOR = 'GARDEN_SELECTOR'
const defaultNavigatorType = GARDEN_SELECTOR
const gardenAR = require('./GardenAR')

/*
 AS OF OCTOBER 2019, THIS IS NO LONGER NEEDED
 */
var sharedProps = {
  apiKey: 'API_KEY_HERE'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gardenSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '95%'
  },
  item: {
    width: 50,
    height: 50,
    backgroundColor: '#B0EBBD'
  }
})

var localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#97e6a8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  }
})

export default class GardenSetUpScene extends React.Component {
  constructor() {
    super()
    this.state = {
      navigatorType: defaultNavigatorType
    }
    this.selectGardenSetUp = this.selectGardenSetUp.bind(this)
    this.navigateAR = this.navigateAR.bind(this)
  }
  selectGardenSetUp(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType,
        sharedProps: sharedProps
      })
    }
  }
  navigateAR() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: gardenAR }}
      />
    )
  }
  render() {
    if (this.state.navigatorType === GARDEN_SELECTOR) {
      return (
        <View style={localStyles.container}>
          <View style={localStyles.inner}>
            <TouchableHighlight
              style={localStyles.buttons}
              onPress={this.selectGardenSetUp(AR_NAVIGATOR)}
              underlayColor={'#B0EBBD'}
            >
              <Text style={localStyles.buttonText}>New Garden</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={localStyles.buttons}
              // onPress={this.selectGardenSetUp(AR_NAVIGATOR)}
              underlayColor={'#B0EBBD'}
            >
              <Text style={localStyles.buttonText}>Saved Garden</Text>
            </TouchableHighlight>
          </View>
        </View>
      )
    } else if (this.state.navigatorType === AR_NAVIGATOR) {
      return this.navigateAR()
    }
  }
}
