import React , { Component } from 'react';
import axios from 'axios';

import history from '../history';

class Add extends Component {
    constructor(props) {
        super(props)

        this.initialState = {
            name: '',
            email: ''
        }

        this.state = this.initialState
    }
    handleChange = event => {
        const {name, value} = event.target;
        console.log('name',name,'value',value)
        this.setState({
            [name] : value
        });
    }
    submitForm = character => {
        console.log(character)
        // this.setState({characters: [...this.state.characters, character]});
        axios.post('http://localhost:5000/add',this.state)
        .then((response)=> {
            console.log(response)
            history.push('/')
        })
        .catch((err)=> {
            console.log(err)
        })
        this.setState(this.initialState);
      }
    render() {
        const {name , email} = this.state;
        return (
            <form>
                <label>Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={this.handleChange} />
                <label>Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={this.handleChange}/>
                <input 
                    type="button" 
                    value="Add New" 
                    onClick={this.submitForm} />
            </form>
        )
    }
}

export default Add;