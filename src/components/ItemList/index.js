import { List, CircularProgress, makeStyles, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import ItemsCheckList from './ItemsCheckList'
import { deleteItem, getAllItems } from '../../services'

const useStyles = makeStyles({
  loadingComponentsWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    width: '20%'
  }
})

export default function ItemList(props) {
  const classes = useStyles()
  const [items, setItems] = useState([])

  const [fetchObject, setFetchObject] = useState({
    isFetching: true,
    fetchSuccess: false,
  })
  
  const handleDelete = async (id) => {
    const res = await deleteItem({
      id
    })
    if (res.status === 200) {
      setItems(
        items.filter((item) => {
          return item.id !== id
        })
      )
    } else {
      const { status, type } = res.data
      alert(`Deletion Failed due to error ${status} ${type}. Please try again.`)
    }
  }

  //onMount fetch items
  useEffect(() => { 
    async function fetchAllItemsOnMount() {
      const res = await getAllItems()
      if (res.status === 200) {
        setFetchObject({
          isFetching: false,
          fetchSuccess: true,
        })
        setItems(res)
      } else {
        setTimeout(() => {
          setFetchObject({
            isFetching: false,
            fetchSuccess: false,
          })
        }, 3000)
        setTimeout(() => {
          setItems(ItemList.defaultProps.shoppingListItems)
          setFetchObject({
            isFetching: false,
            fetchSuccess: true,
          })
        }, 6000)
      }
    }
    fetchAllItemsOnMount()

    return function unmount() {
      setFetchObject({
        isFetching: true,
        fetchSuccess: false,
      })
    }
  }, [])

  const { isFetching, fetchSuccess } = fetchObject
  return (
    <>
      {isFetching &&
         <> 
          <div className={classes.loadingComponentsWrapper}>
            <CircularProgress color='primary' size='10' className={classes.progress}/>
          </div>
          <div className={classes.loadingComponentsWrapper}>
            <Typography variant='h5'>Loading Items...</Typography>
          </div>
        </>
      }
      {
        !isFetching && !fetchSuccess &&
        <div className={classes.loadingComponentsWrapper}>
          <Typography>
            Fetching your data failed, using the sample shopping list. Loading..
          </Typography>
        </div>
      }
      {!isFetching && fetchSuccess &&
        <List>
          <ItemsCheckList
            items={items}
            setItems={setItems}
            handleDelete={handleDelete}
          />
        </List>
      }
    </>
  )
}

ItemList.defaultProps = {
  shoppingListItems: [
    {
      id: 10,
      name: 'Cabbage',
      price: 0.9,
      quantity: 2,
    },
    {
      id: 3,
      name: 'Shabu Shabu',
      price: 6.9,
      quantity: 2,
    },
    {
      id: 4,
      name: 'Warheads',
      price: 0.2,
      quantity: 5,
    } 
  ]
}
