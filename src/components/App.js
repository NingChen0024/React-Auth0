import React, { useEffect, useState } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import history from '../history'
import Navigation from './Navigation'
import Jumbotron from './Jumbotron'
import Feed from './Feed'
import Contact from './Contact'
import About from './About'
import './App.css'
import Loading from './Loading'

function App () {
  const [name, setName] = useState('Manny Henri')
  const [jumbotronTitle, setJumbotronTitle] = useState('List of courses')
  const [feeds, setFeeds] = useState([])
  const { loading } = useAuth0()

  useEffect(() => {
    console.log('Fetch')

    axios.get('http://localhost:4000/courses')
      .then(res => {
        console.log(res)
        setFeeds(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      {
        loading ? <Loading />
          : <Router history={history}>
            <div className='container'>
              <Navigation />
              <Jumbotron title={jumbotronTitle} />
              <Switch>
                <Route path='/contact' component={Contact} />
                <Route path='/about' component={About} />
                <Route
                  exact path='/' render={() => (
                    <Feed feeds={feeds} />
                  )}
                />
              </Switch>
              <div className='footer'>
                <p>&copy; {name} Inc.</p>
              </div>
            </div>
          </Router>
      }
    </div>
  )
}

export default App
