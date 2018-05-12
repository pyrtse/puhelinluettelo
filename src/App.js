import React from 'react';
import axios from 'axios';

const Person = (props) => {
  return (
    <tr>
      <td>{props.person.name}</td>
      <td>{props.person.number}</td>
    </tr>
  )
}

const Persons = ({ persons }) => {
  return (
    <table>
      <tbody>
        {persons.map(person => <Person key={person.id} person={person} />)}
      </tbody>
    </table>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({persons: response.data})
      })
      axios
      .get('http://localhost:3001/persons')
      .then(response => console.log(response.data))
  }

  addNumber = (event) => {
    event.preventDefault()
    const pObject = {
      name: this.state.newName,
      number: this.state.newNum,
      id: this.state.persons.length +1
    }

    const names = this.state.persons.map(person => person.name)
    console.log(names)

    if (names.includes(this.state.newName)) {
      alert(this.state.newName + ' on jo listalla')
      this.setState({ newName: '' })
    } else {
      const persons = this.state.persons.concat(pObject)

      this.setState({
        persons: persons,
        newName: '',
        newNum: ''
      })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumChange = (event) => {
    this.setState({ newNum: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    const pToShow = this.state.persons.filter(person => person.name.includes(this.state.filter))
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <form>
          rajaa näytettäviä <input
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </form>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addNumber} >
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
            <br />
            numero: <input
              value={this.state.newNum}
              onChange={this.handleNumChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Persons persons={pToShow} />
      </div>
    )
  }
}

export default App