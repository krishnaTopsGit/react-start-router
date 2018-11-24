import React , { Component } from 'react';
import axios from 'axios';

import history from '../history';

import ReactPaginate from 'react-paginate';
import './style.css'

class List extends Component {
    state = {
        characters : [],
        perPage: 2,
        pegeNumber: 0,
        pageCount: 1
    }
    getData(pageNumber) {
        axios.get('http://localhost:5000?pageNumber='+pageNumber+'&perPage='+this.state.perPage)
        .then((response)=> {
            // console.log(response)
            this.setState({
                characters: response.data.data,
                pageCount: response.data.totalCount
            })
        })
    }
    async componentDidMount() {
        console.log(this.props)
        await this.getData(this.state.pegeNumber+1);
    }
    handlePageClick = (data) => {
        console.log('inside pagination',data)
        let selected = data.selected + 1;
        this.getData(selected);
    };
    
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
        this.getData(0)
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
                <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={""}
                       breakClassName={"break-me"}
                       pageCount={Math.ceil(this.state.pageCount / this.state.perPage)}
                       marginPagesDisplayed={0}
                       pageRangeDisplayed={2}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
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