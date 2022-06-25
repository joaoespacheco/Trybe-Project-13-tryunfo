import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      deckOfcards: [],
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.checkState = this.checkState.bind(this);
    this.saveCardOnDeck = this.saveCardOnDeck.bind(this);
  }

  handleChanger({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.checkState());
  }

  saveCardOnDeck() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
      hasTrunfo,
    } = this.state;
    const newCart = {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    };
    const stateReset = [
      { target: { name: 'cardName', value: '' } },
      { target: { name: 'cardDescription', value: '' } },
      { target: { name: 'cardImage', value: '' } },
      { target: { name: 'cardRare', value: 'normal' } },
      { target: { name: 'cardAttr1', value: 0 } },
      { target: { name: 'cardAttr2', value: 0 } },
      { target: { name: 'cardAttr3', value: 0 } },
      { target: { name: 'cardTrunfo', value: false } },
    ];
    this.setState((previousState) => ({
      deckOfcards: [...previousState.deckOfcards, newCart],
    }), () => stateReset.forEach((target) => this.handleChanger(target)));
    if (hasTrunfo === false) this.setState(({ hasTrunfo: cardTrunfo }));
  }

  checkState() {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const valueMax = 90;
    const valueMin = 0;
    const maxValueOfSum = 210;
    const stateElements = [
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    ];
    let results = true;
    if (stateElements.every((element) => element !== '')) {
      const attrElements = [cardAttr1, cardAttr2, cardAttr3];
      const sumOfAttributes = attrElements.reduce(((acc, crr) => acc + Number(crr)), 0);
      const valuesLimits = attrElements.every(
        (atributo) => atributo >= valueMin && atributo <= valueMax,
      );
      const valuesSum = (sumOfAttributes <= maxValueOfSum);
      results = !(valuesLimits === true && valuesSum === true);
    }
    this.setState({ isSaveButtonDisabled: results });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.handleChanger }
          onSaveButtonClick={ this.saveCardOnDeck }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}

export default App;
