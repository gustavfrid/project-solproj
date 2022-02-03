const BASE_URL = process.env.REACT_APP_BACKEND_API_URL
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search?&countrycodes=se&addressdetails=1&format=json'

export const API_URL = (slug) => `${BASE_URL}/${slug}`
export const API_URL_NOMINATIM = (query) => `${NOMINATIM_URL}&q=${query}}`
