import React from 'react';
import personService from './services/persons'
import style from './App.css'

const Person = (props) => {
  return (
    <tr>
      <td>{props.person.name}</td>
      <td>{props.person.number}</td>
      <td>
        <button onClick={() => window.confirm(`Poistetaanko ${props.person.name}`) ?  personService
          .deleteNum(props.person.id)
          .then(props.ref) : console.log('ei muuteta')
          }>Poista</button>
      </td>
    </tr>
  )
}

const Persons = (props) => {
  return (
    <table>
      <tbody>
        {props.persons.map(person => <Person key={person.id} person={person} ref={props.ref}/>)}
      </tbody>
    </table>
  )
}

const Notification  = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='note'>
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
      filter: '',
      message: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })

  }

  addNumber = (event) => {
    event.preventDefault()
    const pObject = {
      name: this.state.newName,
      number: this.state.newNum,
      id: this.state.persons[this.state.persons.length - 1].id + 1
    }

    const names = this.state.persons.map(person => person.name)

    if (names.includes(this.state.newName)) {
      if (window.confirm(`${this.state.newName} on jo luettelosa, korvataanko vanha numero uudella`)){
        const found = this.state.persons.find(n => n.name === this.state.newName)
        pObject.id = found.id
        personService
          .update(found.id, pObject)
          .then(response => this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNum: ''
          }))
          .catch(error => {
            personService.create(pObject)
            .then(response => this.setState({
              persons: this.state.persons.concat(response.data),
              newName: '',
              newNum: ''
            }))
          })
      }
    } else {
      personService
        .create(pObject)
        .then(response => this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNum: '',
          message: `Lisättiin ${pObject.name}`
        })
        )
    }
  }

  deleteNum = (id) => {
    personService
      .deleteNum(id)
      .then(response => this.setState({
        persons: this.state.persons.concat(response.data)
      }))
  }

  refresh = () => {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
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
        <Notification message={this.state.message} />
        <h2>Lisää uusi /muuta olemassaolevan numeroa</h2>
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
        <Persons persons={pToShow} ref={this.refresh()} />
      </div>
    )
  }
}

export default App