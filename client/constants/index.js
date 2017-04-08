export const MAP_VIEW_NDVI = 'MAP_VIEW_NDVI'
export const MAP_VIEW_FIELD = 'MAP_VIEW_FIELD'
export const MAP_VIEW_ALL_FIELDS = 'MAP_VIEW_ALL_FIELDS'
export const MAP_VIEW_SECTORS = 'MAP_VIEW_SECTORS'

export const FERTILIZERS_POTASSIUM = 'FERTILIZERS_POTASSIUM'
export const FERTILIZERS_NITRIC = 'FERTILIZERS_NITRIC'

export const API_VERSION = 'v1.0.0'
export const API_URL = `http://api.onesoil.by/${API_VERSION}`
export const API_GEOMETRY = `${API_URL}/fields/geometry?id=`
export const API_FIELDS = `${API_URL}/fields/get`
export const API_LAYERS = `${API_URL}/layers/fields?fieldId=`
export const API_SECTORS = `${API_URL}/fields/sectors?id=`
export const API_ALL_FIELDS = `${API_URL}/farms/geometry?id=1`

export const GET_GEOMETRY = 'GET_GEOMETRY'
export const GET_LAYERS = 'GET_LAYERS'
export const GET_SECTORS = 'GET_SECTORS'
export const GET_ALL_FIELDS = 'GET_ALL_FIELDS'

export const SELECT_FIELD = 'SELECT_FIELD'
export const UPDATE_FIELDS = 'UPDATE_FIELDS'
export const SET_NDVI = 'SET_NDVI'
export const CLICK_FERTILIZERS = 'CLICK_FERTILIZERS'
