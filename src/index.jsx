import React    from 'react';
import ReactDOM from 'react-dom';
import axios    from 'axios';

const WORDS_TO_SEARCH = [
  'about',
  'above',
  'across',
  'app',
  'apple',
  'appreciate',
  'bad',
  'ball',
  'balloon',
  'bell',
  'cat'
];

class RhumbixComponent extends React.Component {

  constructor () {
    super();

    this.setState({
      imageUrl: null,
      userInput: ''
    });
  }

  getImage () {
    const imageStyle = { display: 'block' };

    if (this.state && this.state.imageUrl) {
      return (
        <img style={imageStyle} src={this.state.imageUrl} />
      );
    } else {
      return '';
    }
  }

  getPredictedList () {
    if (this.state && this.state.userInput) {
      const regex = new RegExp(`^${this.state.userInput}`, 'i');
      const listElements = [];

      const list = WORDS_TO_SEARCH.filter((value) => {
        const matches = regex.exec(value);
        return matches && matches.length;
      });

      list.forEach((element) => {
        listElements.push(<li>{element}</li>);
      });

      return (
        <ul className='predictiveList'>{listElements}</ul>
      );
    } else {
      return null;
    }
  }

  handleClick () {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${this.inputText.value}&api_key=dc6zaTOxFJmzC&limit=1`)
    .then((response) => {
      this.setState({ imageUrl: response.data.data[0].images.original.url})
    })
    .catch(function(error) {
      console.log('error', error);
    });
  }

  inputChange (event) {
    const userInput = event.target.value;

    if (userInput) {
      this.setState({ userInput });
    } else {
      this.setState({ userInput: ''});
    }
  }

  render () {
    const inputStyle = {
      display: 'inline-block',
      marginRight: '5px'
    };

    return (
      <div>
        <p style={inputStyle}>Input your search text: </p>
        <input type="text" onChange={this.inputChange.bind(this)} placeholder="computers" ref={(c) => this.inputText = c} />
        <button onClick={this.handleClick.bind(this)}>Go</button>
        {this.getImage()}
        {this.getPredictedList()}
      </div>
    );
  }
};

ReactDOM.render(<RhumbixComponent />, document.getElementById('app-container'));