import React, {Component} from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seeIndexes: [],
        values: {},
        index: ''
    };


    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({values: values.data});
    }

    async fetchIndexes() {
        const seeIndexes = await axios.get('/api/values/all');
        this.setState({seeIndexes: seeIndexes.data});
    }

    handleSubmit = async event => {
        event.preventDefault();

        await axios.post('/api/values', {index: this.state.index});

        this.setState({index: ''});
    };

    renderSeenIndexes() {
        return this.state.seeIndexes.map(({number}) => number).join(', ');
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
               <div key={key}>
                    For index {key} I calculeted {this.state.values[key]}
               </div>
            );
        }
        return entries;
    }

    render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
                <label>Enter your index</label>
            <input
                value = {this.state.index}
                onChange={event => this.setState({index: event.target.value})}
        />
            <button>Submit</button>
            </form>

            <h3>Indexes I have seen:</h3>
            {this.renderSeenIndexes()}

            <h3>Calucleted values:</h3>
            {this.renderValues()}
            </div>
        );
    }
}

export default Fib;