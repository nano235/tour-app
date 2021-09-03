import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [tours, setTours] = useState([])

  const fetchTours = async () =>{
    const response = await fetch(url)
    const data = await response.json()

    setTours(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchTours()
  },[])

  const deleteTour = (id) => {
    const newTour = tours.filter(tour => tour.id !== id)
    setTours(newTour)
  }

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if(tours.length === 0){
    return (
      <main>
        <div className="title">
          <h2>No Tours</h2>
          <button className="btn" onClick={() => fetchTours()}>Refresh</button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} deleteTour={deleteTour} />
      <div className="title">
          <button className="btn" onClick={() => setTours([])}>Clear All</button>
        </div>
    </main>
  )
}

export default App
