/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react'
import ExperienceSelectorScene from './js/components/GardenSetUp'
import Login from './js/components/Login'
import { Provider } from 'react-redux'
import store from './js/store/store.js'

const UNSET = 'UNSET'
const AR_NAVIGATOR_TYPE = 'AR'
const defaultNavigatorType = UNSET

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      navigatorType: defaultNavigatorType
    }
    this.exitViro = this.exitViro.bind(this)
  }

  render() {
    //Check if user is logged in here
    // if (this.state.navigatorType === UNSET) {
    //   return <Login />
    // } else if (this.state.navigatorType === AR_NAVIGATOR_TYPE) {
      return (
        <Provider store={store}>
          <ExperienceSelectorScene />
        </Provider>
      )
    // } else {
    //   this.exitViro()
    // }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  exitViro() {
    this.setState({
      navigatorType: UNSET
    })
  }
}

module.exports = App
