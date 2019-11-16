import React from 'react'
import { Button, Input } from 'react-native-elements'
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
// import { Formik } from 'formik'
import GardenSetUpScene from './GardenSetUp'

const LOGIN = 'LOGIN'
const EXPERIENCE_SELECTOR = 'EXPERIENCE_SELECTOR'
const defaultNavigatorType = LOGIN

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 25
  }
})

class LoginScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      navigatorType: defaultNavigatorType
    }
    this.gardenSetUpButtonOnPress = this.gardenSetUpButtonOnPress.bind(this)
  }
  gardenSetUpButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      })
    }
  }
  render() {
    if (this.state.navigatorType === LOGIN) {
      return (
        <View style={styles.container}>
          <Input placeholder='email@youremail.com' />
          <Input placeholder='password' type='password' />
          <Button
            title='Submit'
            // onPress={() => {
            //   this.props.navigation.navigate('GardenSetUp')
            // }}
          />
          <Button
            title='Continue'
            onPress={this.gardenSetUpButtonOnPress(EXPERIENCE_SELECTOR)}
          />
        </View>
      )
    } else if (this.state.navigatorType === EXPERIENCE_SELECTOR) {
      return <GardenSetUpScene />
    }
  }
}

export default LoginScreen

//         {/* <Formik
//           initialValues={{ email: '', password: '' }}
//           onSubmit={values => console.log(values)}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values }) => (
//             <View style={styles.container}>
//               <Text>Email</Text>
//               <TextInput
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 value={values.email}
//               />
//               <Text>Password</Text>
//               <TextInput
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 value={values.password}
//               />
//               <Button onPress={handleSubmit} title='Submit' />
//             </View>
//           )}
//         </Formik> */}
