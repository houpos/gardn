import React from 'react'
import {
  View,
  StyleSheet,
  ListView
} from 'react-native'
import {
  ViroARSceneNavigator
} from 'react-viro'
import GardenListView from './GardenListView'
import GardenAR from './GardenAR'
import { connect } from 'react-redux'
import { addModel, gotModelNames } from '../store.js'

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
  arInitialization: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    width: '100%',
    height: 140,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  }
  componentDidMount() {
    this.props.getModelNames()
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
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    modelNames: state.modelNames
  }
}

const mapDispatchToProps = dispatch => ({
  getModelNames: () => dispatch(gotModelNames()),
  addModel: model => dispatch(addModel(model))
})

const GardenARWrapper = connect(mapStateToProps, mapDispatchToProps)(DisconnectedGardenARWrapper)
export default GardenARWrapper
