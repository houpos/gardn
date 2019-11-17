import React from 'react'
import {
  View,
  StyleSheet,
  ListView,
  Alert
} from 'react-native'
import {
  ViroARSceneNavigator
} from 'react-viro'
import GardenListView from './GardenListView'
import GardenAR from './GardenAR'
import { connect } from 'react-redux'
import { addModel, gotModelNames, deleteAll} from '../store.js'
import RemoveButton from './RemoveButton'

/*
 AS OF OCTOBER 2019, THIS IS NO LONGER NEEDED
 */
const sharedProps = {
  apiKey: 'API_KEY_HERE'
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  arView: {
    flex: 1
  },
  listView: {
    flex: 1,
    height: 72,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#000000aa'
  },
  previewScreenButtons: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class DisconnectedGardenARWrapper extends React.Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      sharedProps: sharedProps
    }
    this.onListPressed = this.onListPressed.bind(this)
    this.renderRemoveButton = this.renderRemoveButton.bind(this)
    this.clearAll = this.clearAll.bind(this)
  }
  componentDidMount() {
    this.props.getModelNames()
    // this.props.getAllModels()
  }
  onListPressed(index) {
    this.props.addModel(index)
  }
  render() {
    return (
      <View style={styles.flex}>
        <ViroARSceneNavigator
          style={styles.arView}
          {...this.state.sharedProps}
          initialScene={{ scene: GardenAR }}
        />
        <View style={styles.listView}>
          <GardenListView
            items={this.props.modelNames}
            onPress={this.onListPressed}
          />
        </View>
        {this.renderRemoveButton()}
      </View>
    )
  }
  renderRemoveButton() {
    return (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          top: '25%',
          right: 10,
          width: 80,
          height: 220
        }}
      >
        <View
          style={{
            flex: 0.45,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            right: 0,
            top: 20,
            width: 80
          }}
        >
          {/* <RemoveButton
            // onPress={this._onContextMenuRemoveButtonPressed}
            stateImageArray={[require('../res/btn_trash.png')]}
            style={styles.previewScreenButtons}
          /> */}
          <RemoveButton
            onPress={this.clearAll}
            stateImageArray={[require('../res/btn_clear_all.png')]}
            style={styles.previewScreenButtons}
          />
        </View>
      </View>
    )
  }

  // // Remove button from Context Menu pressed
  // _onContextMenuRemoveButtonPressed() {
  //   var index = this.props.currentItemSelectionIndex
  //   if (
  //     this.props.currentItemSelectionIndex != -1 &&
  //     this.props.currentItemClickState != ''
  //   ) {
  //     // if the clicked object was an object, then remove the object
  //     if (this.props.currentSelectedItemType == UIConstants.LIST_MODE_MODEL) {
  //       this.props.dispatchRemoveModelWithUUID(index)
  //     }

  //     // Reset click states of objects
  //     this.props.dispatchChangeItemClickState(-1, '', '')
  //   }
  // }

  // Clear All button was pressed
  clearAll() {
    Alert.alert(
      'Remove All Objects',
      'Are you sure you want to clear the entire scene?',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'OK', onPress: () => this.props.deleteAll() }
      ]
    )
  }
}

const mapStateToProps = state => {
  return {
    modelNames: state.modelNames,
    models: state.allModels
  }
}

const mapDispatchToProps = dispatch => ({
  getModelNames: () => dispatch(gotModelNames()),
  addModel: model => dispatch(addModel(model)),
  deleteAll: () => dispatch(deleteAll())
})

const GardenARWrapper = connect(mapStateToProps, mapDispatchToProps)(DisconnectedGardenARWrapper)
export default GardenARWrapper
