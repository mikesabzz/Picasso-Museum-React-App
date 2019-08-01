import React from 'react';
import Header from './component/Header'
import ArtistInput from './component/ArtistInput'
import ArtistList from './component/ArtistList'
import Footer from './component/Footer'
import axios from 'axios'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artists: [],
      inputValue: ''
    }
  }

  handleFilterChange = (event) => {
    event.preventDefault()
    this.setState({
      inputValue: event.target.value
    })
    const inputArtistList = this.state.artists.filter(artist => {
      return artist.displayname.toLowerCase().includes(this.state.inputValue.toLowerCase())
    })
    if (this.state.inputValue.length < 2) {
      return this.fetchData()
    }
    this.setState({ artists: inputArtistList })
  }
  
  fetchData = async () => {
    const apiKey = process.env.REACT_APP_TOKEN
    await axios.get(`https://api.harvardartmuseums.org/person?q=pablo picasso&apikey=${apiKey}`)
      .then(res => {
        this.setState({
          artists: res.data.records
        })
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div className="App">
        <Header title="PICASSO'S MUSEUM" />
        <ArtistInput name={this.state} onChange={this.handleFilterChange} />
        {this.state.artists.map(artist => {
          return <ArtistList name={artist.displayname} artist={artist} />
        })}
        <Footer footer />
      </div>
    )
  };
}

export default App;
