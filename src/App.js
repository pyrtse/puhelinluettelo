import React from 'react';

const Person = (props) => {
  return (
    <tr>
      <td>{props.person.name}</td>
      <td>{props.person.num}</td>
    </tr>
  )
}

const Persons = ({ persons }) => {
  return (
    <table>
      <tbody>
        {persons.map(person => <Person key={person.name} person={person} />)}
      </tbody>
    </table>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addNumber = (event) => {
    event.preventDefault()
    const pObject = {
      name: this.state.newName,
      num: this.state.newNum
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