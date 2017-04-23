
import { createAction } from 'redux-actions'
import * as types from '../constants'

export const selectField = createAction(types.SELECT_FIELD)
export const updateFields = createAction(types.UPDATE_FIELDS)
export const getGeometry = createAction(types.GET_GEOMETRY)
export const getLayers = createAction(types.GET_LAYERS)
export const getSectors = createAction(types.GET_SECTORS)

export const setSector = createAction(types.SET_SECTOR)

export const getAllFields = createAction(types.GET_ALL_FIELDS)
export const setNDVI = createAction(types.SET_NDVI)
export const clickFertilizers = createAction(types.CLICK_FERTILIZERS)

export const callLayers = createAction(types.CALL_LAYERS)
export const callGeometry = createAction(types.CALL_GEOMETRY)

export const worksHistory = createAction(types.WORKS_HISTORY)
export const worksInProgress = createAction(types.WORKS_IN_PROGRESS)

export const doublePopup = createAction(types.DOUBLE_POPUP)
