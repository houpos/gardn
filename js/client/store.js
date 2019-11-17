import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk
import axios from 'axios'

 const arrOfModels = [
   {
     title: 'Flower',
     source: require('./res/flower/cartoon_flower.obj'),
     thumbnail: require('./res/flower/flower.png'),
     resources: [require('./res/flower/cartoon_flower.mtl')],
     scale: [1, 1, 1],
     type: 'OBJ'
   },
   {
     title: 'Primrose',
     source: require('./res/PrimroseP_obj/PrimroseP.obj'),
     thumbnail: require('./res/PrimroseP_obj/primrose.png'),
     resources: [
       require('./res/PrimroseP_obj/PrimroseP.mtl'),
       require('./res/PrimroseP_obj/PRIM1P.png'),
       require('./res/PrimroseP_obj/PRIM1ST.png'),
       require('./res/PrimroseP_obj/PRIM1L2.png'),
       require('./res/PrimroseP_obj/PRIM1L3.png'),
       require('./res/PrimroseP_obj/PRIMsoil.png'),
       require('./res/PrimroseP_obj/vase.png')
     ],
     scale: [0.3, 0.3, 0.3],
     type: 'OBJ'
   },
   //  {
   //    title: 'Rose',
   //    source: require('./res/rose/rose.obj'),
   //    thumbnail: require('./res/placeholder-square.jpg'),
   //    resources: [
   //      require('./res/rose/rose.mtl'),
   //      require('./res/rose/Files/rose_texture.jpg')
   //    ],
   //    scale: [0.1, 0.1, 0.1],
   //    type: 'OBJ'
   //  },
   {
     title: 'Birch Tree',
     source: require('./res/1_birchSmall/1_birchSmall_fan.obj'),
     thumbnail: require('./res/1_birchSmall/birch_tree.png'),
     resources: [
       require('./res/1_birchSmall/1_birchSmall_fan.mtl'),
       require('./res/1_birchSmall/1_birch_tree_fan.png'),
       require('./res/1_birchSmall/birch-leaf-diff.png'),
       require('./res/1_birchSmall/birkenstamm-diffuse.png')
     ],
     scale: [0.2, 0.2, 0.2],
     type: 'OBJ'
   },
   {
     title: 'Bush',
     source: require('./res/plant_bush1/bush.obj'),
     thumbnail: require('./res/plant_bush1/bush.png'),
     resources: [
       require('./res/plant_bush1/bush.mtl'),
       require('./res/plant_bush1/bush01.png'),
       require('./res/plant_bush1/bush02.png'),
       require('./res/plant_bush1/bush03.png')
     ],
     scale: [0.2, 0.2, 0.2],
     type: 'OBJ'
   }
  //  {
  //    title: 'Fence',
  //    source: require('./res/fence/Fence.obj'),
  //    thumbnail: require('./res/fence/fence.png'),
  //    resources: [require('./res/fence/Fence.mtl')],
  //    scale: [0.1, 0.1, 0.1],
  //    type: 'OBJ'
  //  }
 ]

// Add any initial state properties. Use Tom's First Law
const initialState = {
  allModels: [],
  model: {},
  modelNames: []
}

// ACTION TYPES
const ADD_MODEL = 'ADD_MODEL'
const GET_MODELS = 'GET_MODELS'
const GET_MODEL_NAMES = 'GET_MODEL_NAMES'
const DELETE_ALL_MODELS = 'DELETE_ALL_MODELS'

// ACTION CREATORS
export const getModels = () => ({
  type: GET_MODELS,
  arrOfModels
})

export const addModel = model => ({
  type: ADD_MODEL,
  model
})

export const deleteAll = () => ({
  type: DELETE_ALL_MODELS
})

export const gotModelNames = () => {
  const names = arrOfModels.map((model) => {
    return {title: model.title, thumbnail: model.thumbnail }
  })
  return {
    type: GET_MODEL_NAMES,
    modelNames: names
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MODELS:
      return {...state, allModels: action.allModels}
    case GET_MODEL_NAMES:
      return {...state, modelNames: action.modelNames}
    case ADD_MODEL:
      return { ...state, allModels: [...state.allModels, arrOfModels[action.model]] }
    case DELETE_ALL_MODELS:
      return {...state, allModels: []}
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
