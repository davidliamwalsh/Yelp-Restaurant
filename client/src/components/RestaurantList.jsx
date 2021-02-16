import React, {useEffect, useContext} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext, RestaurantsContextProvider } from '../context/RestaurantsContext'

const RestaurantList = (props) => {
  const {restaurants, setRestaurants} = useContext(RestaurantsContext)
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await RestaurantFinder.get("/")
        setRestaurants(response.data.data.restaurants)
      } catch (err) {
        console.log(err)
      }
    }
    fetchdata()
  },[])

  return (
    <div className="list-group">
      <table className="table table-hover table-dark table-borderless">
        <thead>
          <tr className="table-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.map(el => {
            return (
              <tr className="align-middle" key={el.id}>
                <td>{el.name}</td>
                <td>{el.location}</td>
                <td>{"£".repeat(el.price_range)}</td>
                <td>reviews</td>
                <td>
                  <button className="btn btn-warning">Update</button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      
    </div>
  )
}

export default RestaurantList
