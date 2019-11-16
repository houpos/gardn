import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk

 const arrOfModels = [
   //  {
   //    title: 'Flower Pot',
   //    source: require('../res/plant_flowerpot/flowers+pot.obj'),
   //    thumbnail: require('../res/placeholder-square.jpg'),
   //    resources: [],
   //    position: [-0.5, 0.5, -1],
   //    scale: [0.2, 0.2, 0.2],
   //    type: 'OBJ'
   //  },
   {
     title: 'Dog',
     source: require('../res/pet_dog1/Dog.obj'),
     thumbnail: require('../res/placeholder-square.jpg'),
     resources: [
       require('../res/pet_dog1/Dog.mtl'),
       require('../res/pet_dog1/Diffuse.png'),
       require('../res/pet_dog1/Specular.png')
     ],
     position: [-0.5, 0.5, -1],
     scale: [0.2, 0.2, 0.2],
     type: 'OBJ'
   },
   {
     title: 'Bush',
     source: require('../res/plant_bush1/bush.obj'),
     thumbnail: require('../res/placeholder-square.jpg'),
     resources: [
       require('../res/plant_bush1/bush.mtl'),
       require('../res/plant_bush1/bush01.png'),
       require('../res/plant_bush1/bush02.png'),
       require('../res/plant_bush1/bush03.png')
     ],
     position: [-0.5, 0.5, -1],
     scale: [0.2, 0.2, 0.2],
     type: 'OBJ'
   },
   {
     title: 'Chair',
     source: require('../res/furniture_chair1/OBJ.obj'),
     thumbnail: require('../res/placeholder-square.jpg'),
     resources: [
       require('../res/furniture_chair1/Dirt.jpg'),
       require('../res/furniture_chair1/Pillow.jpg'),
       require('../res/furniture_chair1/Wood.jpg')
     ],
     position: [-0.5, 0.5, -1],
     scale: [0.2, 0.2, 0.2],
     type: 'OBJ'
   },
   {
     title: 'Smiley',
     source: require('../res/emoji_smile/emoji_smile.vrx'),
     thumbnail: require('../res/placeholder-square.jpg'),
     resources: [
       '../res/emoji_smile/emoji_smile_diffuse.png',
       '../res/emoji_smile/emoji_smile_normal.png',
       '../res/emoji_smile/emoji_smile_specular.png'
     ],
     position: [-0.5, 0.5, -1],
     scale: [0.2, 0.2, 0.2],
     type: 'VRX'
   }
 ]

 const modelNames = ['Bush', 'Dog', 'Plant', 'Smiley']

// Add any initial state properties. Use Tom's First Law
const initialState = {
  allModels: [],
  model: {},
  modelNames: []
}

// ACTION TYPES
const INITIALIZE_MODELS = 'INITIALIZE_MODELS'
const ADD_MODEL = 'ADD_MODEL'
const GET_MODELS = 'GET_MODELS'
const GET_MODEL_NAMES = 'GET_MODEL_NAMES'

// ACTION CREATORS
export const initialize = () => ({
  type: GET_MODELS,
  allModels: []
})

const gotModels = allModels => ({
  type: GET_MODELS,
  allModels
})

export const addedModel = model => ({
  type: ADD_MODEL,
  model
})

export const gotModelNames = () => ({
  type: ADD_MODEL,
  modelNames
})


// THUNKS
export const getModels = () => {
  return dispatch => {
    try {
      // const { data } = await axios.get(`/api/cart/guest`)
      const data = [...arrOfModels]
      return dispatch(gotModels(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_MODELS:
      return {...state, allModels: action.allModels}
    case GET_MODELS:
      return {...state, allModels: action.allModels}
    case GET_MODEL_NAMES:
      return {...state, modelNames: action.modelNames}
    case ADD_MODEL:
      const newModel = {
        title: 'Smiley',
        source: require('../res/emoji_smile/emoji_smile.vrx'),
        thumbnail: require('../res/placeholder-square.jpg'),
        resources: [
          '../res/emoji_smile/emoji_smile_diffuse.png',
          '../res/emoji_smile/emoji_smile_normal.png',
          '../res/emoji_smile/emoji_smile_specular.png'
        ],
        position: [-0.5, 0.5, -1],
        scale: [0.2, 0.2, 0.2],
        type: 'VRX'
      }
      return { ...state, allModels: [...state.allModels, newModel] }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  // `withExtraArgument` gives us access to axios in our async action creators!
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  // thunkMiddleware.withExtraArgument({ axios }),
  applyMiddleware(thunkMiddleware, createLogger())
)

export default store
