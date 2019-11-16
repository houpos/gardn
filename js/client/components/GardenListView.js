/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict'

// import *  as UIConstants from '../redux/UIConstants';
// import * as LoadingConstants from '../redux/LoadingStateConstants';
// import { connect } from 'react-redux'
import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  View,
  ListView,
  Image,
  YellowBox
} from 'react-native'
// import renderIf from '../helpers/renderIf';
import ListViewItem from './GardenListViewItem'
import { connect } from 'react-redux'
import { gotModelNames } from '../store.js'

/**
 * ListView wrapper that encapsulates behavior for the Listview seen at the bottom of the screen
 * in the app.
 */
// eslint-disable-next-line react/no-deprecated
class DisconnectedGardenListView extends Component {
  constructor(props) {
    super(props)
    console.log('PROPS', this.props)
    this._renderListItem = this._renderListItem.bind(this)
    this._onAnimationDone = this._onAnimationDone.bind(this)
    this._onListItemPressed = this._onListItemPressed.bind(this)
    var ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        })
    this.state = {
      rowChanged: 0,
      selectedItem: -1,
      animationDone: false,
      dataRows: this.props.items,
      dataSource: ds.cloneWithRows(this.props.items)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('WILL RECEIVE PROPS', nextProps)
    var newRows = nextProps.items.slice(0);
    newRows[this.state.rowChanged] = {
        ...nextProps.items[this.state.rowChanged],
    };

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newRows),
      dataRows: newRows
    });
  }

  // Called when animation on the listViewItem is done
  _onAnimationDone() {
    this.setState({
      animationDone: true
    })
  }

  _onListItemPressed(rowId) {
    let selectedItem =  this.state.selectedItem;

    return () => {
      this.setState({
        rowChanged: parseInt(rowId, 10),
        selectedItem: selectedItem
      })
      this.props.onPress(rowId)
    }
  }

  render() {
    console.log('DATA SOURCE', this.state.dataSource)
    if (this.state.dataSource === undefined) {
      return <View />
    }
    return (
      <ListView
        horizontal={true}
        contentContainerStyle={styles.listViewContainer}
        dataSource={this.state.dataSource}
        renderRow={this._renderListItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        pageSize={5}
        directionalLockEnabled={true}
        removeClippedSubviews={false}
      />
    )
  }

  _renderListItem(data, sectionid, rowId) {
    console.log('WHAT IS DATA', data)
    return (
      <View style={{ marginLeft: 10 }}>
        <ListViewItem
          onPress={this._onListItemPressed(rowId)}
          key={data.title}
          thumbnail={data.thumbnail}
          style={styles.photo}
          animationDoneCallBack={this._onAnimationDone}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  listViewContainer: {
    height: 72
  },
  photo: {
    height: 53,
    width: 56.8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 10
  },
  photoSelection: {
    position: 'absolute',
    height: 53,
    width: 56.8,
    marginTop: 10
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  }
})

const mapStateToProps = state => {
  return {
    models: state.modelNames
  }
}

const mapDispatchToProps = dispatch => ({
  gotModelNames: () => dispatch(gotModelNames())
})

const GardenListView = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedGardenListView)
export default GardenListView
