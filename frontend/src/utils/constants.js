const BASE_URL = process.env.REACT_APP_BACKEND_API_URL
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search?&countrycodes=se&addressdetails=1&format=json'
// const ENTSOE_URL =
//   'https://transparency.entsoe.eu/api?securityToken=MYTOKEN&documentType=A65&processType=A16&outBiddingZone_Domain=10YCZ-CEPS-----N&periodStart=201512312300&periodEnd=201612312300'

export const API_URL = (slug) => `${BASE_URL}/${slug}`
export const API_URL_NOMINATIM = (query) => `${NOMINATIM_URL}&q=${query}}`
