import axios from 'axios'
import { pick } from 'lodash'

const GET = 'get'
const POST = 'post'
const PUT = 'put'
const DELETE = 'delete'

async function request(method, options) {
  const { endpoint, id, data } = options
  let url = endpoint
  if (id) {
    url = url + '/' + id
  }

  try {
    const res = await axios({
      method: method,
      url: url,
      data: data,
    })
    const data = res.data
    if (data.error) {
      throw res
    }
  } catch (err) {
    handleError(err)
  }

  return data
}

export async function getItem(options) {
  const { id } = options
  return await request(GET, {
    endpoint: '/shopping-cart',
    id: id,
  })
}

export async function getAllItems() {
  return await request(GET, {
    url: '/shopping-cart',
  })
}

export async function addItem(options) {
  const data = pick(options, ['name', 'price', 'quantity'])
  return await request(POST, {
    url: '/shopping-cart',
    data: data,
  })
}

export async function updateItem(options) {
  const { id } = options
  const data = pick(options, ['name', 'price', 'quantity'])

  return await request(PUT, {
    id: id,
    url: '/shopping-cart',
    data: data,
  })
}

export async function deleteItem(options) {
  const { id } = options
  return await request(DELETE, {
    id: id,
    url: '/shopping-cart',
  })
}

export async function getTotalPrice(options) {
  return await request(GET, {
    url: '/shopping-cart/checkout'
  })
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
        throw new FetchError({ type: REQUEST_CANCELLED_ERROR, causedBy: err })
      }

      // eslint-disable-next-line no-console
      console.error('[ucs] Unexpected fetch runtime error', err)
      // So loading sign can be reset
      throw new FetchError({ type: UNEXPECTED_RUNTIME_ERROR, causedBy: err })
    }
    res = err.response
  }

  // No response, if connection is blocked by browser
  if (!res) {
    throw new FetchError({
      type: REQUEST_CONNECTION_ERROR,
      message: 'No response from the server',
      causedBy: err,
    })
  }

  // Set error type based on response status code or
  // type returned in response data
  const errorRes = res.data && (res.data.error || {})

  if (errorRes.type) {
    throw new FetchError(errorRes)
  } else {
    handleErrorByStatusCode(res.status, errorRes)
  }
}

 function handleErrorByStatusCode(status, errorRes) {
  switch (status) {
    case 500:
      // Server runtime error
      throw new FetchError({ type: INTERNAL_SERVER_ERROR, ...errorRes })

    case 502:
      // Server is down
      throw new FetchError({
        type: REQUEST_CONNECTION_ERROR,
        message: 'Bad Gateway',
        ...errorRes,
      })

    default:
      const message = `API response error type is missing, status ${status}.`
      // eslint-disable-next-line no-console
      console.error(`[ucs] ${message}, response:`, errorRes)
      throw new FetchError({
        type: UNEXPECTED_SERVER_ERROR,
        message,
        ...errorRes,
      })
  }
}