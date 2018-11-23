import React , { Component } from 'react';
import axios from 'axios';

import history from '../history';

class List extends Component {
    state = {
        characters : []
    }
    componentDidMount() {
        console.log(this.props)
        axios.get('http://localhost:5000/')
        .then((response)=> {
            // console.log(response)
            this.setState({
                characters: response.data
            })
        })
    }
    editCharacter = (data) => {
        console.log(data)
        history.push({
            pathname: '/edit',
            state: data
        })
    }
    addNew = () => {
        history.push('add')
    }
    removeCharacter = (data,index) => {
        // console.log('data',data);
        // console.log('index',index)
        const { characters } = this.state;
        axios.delete('http://localhost:5000/delete',{data:data})
          .then(async (response)=> {
            this.setState({
              characters: characters.filter((character, i) => { 
                  return i !== index;
              })
            });
          })
          .catch((err)=> {
            console.log(err)
          })
      }
    render() {
        return (
            <div>
                <table>
                    <TableHeader />
                    <TableBody 
                        characterData={this.state.characters}
                        editCharacter={this.editCharacter}
                        removeCharacter={this.removeCharacter}
                    />
                </table>
                <input 
                    type="button" 
                    value="Add New" 
                    onClick={this.addNew}
                >
                </input>
            </div>
        )
    }
}

const TableHeader = () => { 
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    // console.log(props)
    const row = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>
                    <button onClick={() => props.editCharacter(row)}>Edit</button>
                    <button onClick={() => props.removeCharacter(row,index)}>Delete</button>
                </td>
            </tr>
        );
    });
    return (
        <tbody>{row}</tbody>
    );
}

export default List;