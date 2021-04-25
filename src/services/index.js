import axios from 'axios'
import { pick } from 'lodash'
import { 
  GET,
  POST,
  PUT,
  DELETE,
  INTERNAL_SERVER_ERROR,
  REQUEST_CANCELLED_ERROR,
  REQUEST_CONNECTION_ERROR,
  UNEXPECTED_RUNTIME_ERROR,
  UNEXPECTED_SERVER_ERROR,
} from './constants'

async function request(method, options) {
  const { endpoint, id, data } = options
  let url = endpoint
  if (id) {
    url = url + '/' + id
  }
  
  let resData
  try {
    const res = await axios({
      method: method,
      url: url,
      data: data,
    })
    resData = res.data
    if (resData.error) {
      throw res
    }
  } catch (err) {
    handleError(err)
  }

  return resData
}

function fetchErrorObject(err) {
  return { 
    data: { 
      type: err.type || 'NOT FOUND',
      status: err.status || '404',
      err: err,
    }
  }
}

export async function getItem(options) {
  const { id } = options
  try {
    const response = await request(GET, {
      endpoint: '/shopping-cart',
      id: id,
    })
    return response
  } catch (err) {
    console.log(err)
    return fetchErrorObject(err)
  }
}

export async function getAllItems() {
  try {
    const response = await request(GET, {
      endpoint: '/shopping-cart',
    })
    return response
  } catch (err) {
    console.log(err)
    return fetchErrorObject(err)
  }
}

export async function addItem(options) {
  const data = pick(options, ['name', 'price', 'quantity'])
  try {
    const response = await request(POST, {
      endpoint: '/shopping-cart',
      data: data,
    })
    return response
  } catch (err) {
    console.log(err)
    return fetchErrorObject(err)
  }
}

export async function updateItem(options) {

  const { id } = options
  const data = pick(options, ['name', 'price', 'quantity'])
  try {
    const response = await request(PUT, {
      id: id,
      endpoint: '/shopping-cart',
      data: data,
    })
    return response
  } catch (err) {
    console.log(err)
    return fetchErrorObject(err)
  }
}

export async function  deleteItem(options) {
  const { id } = options
  try {
    const response = await request(DELETE, {
      id: id,
      endpoint: '/shopping-cart',
    })
    return response
  } catch (err) {
    console.log(err)
    return fetchErrorObject(err)
  }
}

export async function getTotalPrice(options) {
  try {
    const response = await request(GET, {
      endpoint: '/shopping-cart/checkout',
    })
    return response
  } catch (err) {
    console.log(err)
    return fetchErrorObject(err)
  }
}

function handleError(obj) {
  let res, err

  if (obj.data) {
    res = obj
  } else {
    err = obj
    // Runtime error, when there is not request config returned by axios
    if (!err.config) {
      // XHR request cancelled
      if (axios.isCancel(err)) {
        throw new Error({ type: REQUEST_CANCELLED_ERROR, causedBy: err })
      }

      // eslint-disable-next-line no-console
      console.error('Unexpected fetch runtime error', err)
      // So loading sign can be reset
      throw new Error({ type: UNEXPECTED_RUNTIME_ERROR, causedBy: err })
    }
    res = err.response
  }

  // No response, if connection is blocked by browser
  if (!res) {
    throw new Error({
      type: REQUEST_CONNECTION_ERROR,
      message: 'No response from the server',
      causedBy: err,
    })
  }

  // Set error type based on response status code or
  // type returned in response data
  const errorRes = res.data && (res.data.error || {})

  if (errorRes.type) {
    throw new Error(errorRes)
  } else {
    handleErrorByStatusCode(res.status, errorRes)
  }
}

 function handleErrorByStatusCode(status, errorRes) {
  switch (status) {
    case 500:
      // Server runtime error
      throw new Error({ type: INTERNAL_SERVER_ERROR, ...errorRes })

    case 502:
      // Server is down
      throw new Error({
        type: REQUEST_CONNECTION_ERROR,
        message: 'Bad Gateway',
        ...errorRes,
      })

    default:
      const message = `API response error type is missing, status ${status}.`
      // eslint-disable-next-line no-console
      console.error(`${message}, response:`, errorRes)
      throw new Error({
        type: UNEXPECTED_SERVER_ERROR,
        message,
        ...errorRes,
      })
  }
}