
import { createAction } from 'redux-actions'
import * as types from '../constants'

export const selectField = createAction(types.SELECT_FIELD)
export const updateFields = createAction(types.UPDATE_FIELDS)
export const getGeometry = createAction(types.GET_GEOMETRY)
export const getLayers = createAction(types.GET_LAYERS)
export const getSectors = createAction(types.GET_SECTORS)
export const getAllFields = createAction(types.GET_ALL_FIELDS)
export const setNDVI = createAction(types.SET_NDVI)
export const clickFertilizers = createAction(types.CLICK_FERTILIZERS)
