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
      filterText: ['cardName', ''],
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.checkState = this.checkState.bind(this);
    this.saveCardOnDeck = this.saveCardOnDeck.bind(this);
    this.deleteCardOnDeck = this.deleteCardOnDeck.bind(this);
    this.checkTheTrunfo = this.checkTheTrunfo.bind(this);
    this.cardConstructor = this.cardConstructor.bind(this);
  }

  handleChanger({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
      () => this.checkState(),
    );
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
      cardTrunfo,
    };
    const stateReset = [
      { target: { name: 'cardName', value: '' } },
      { target: { name: 'cardDescription', value: '' } },
      { target: { name: 'cardImage', value: '' } },
      { target: { name: 'cardRare', value: 'normal' } },
      { target: { name: 'cardAttr1', value: '0' } },
      { target: { name: 'cardAttr2', value: '0' } },
      { target: { name: 'cardAttr3', value: '0' } },
      { target: { name: 'cardTrunfo', value: false } },
    ];
    this.setState(
      (previousState) => ({
        deckOfcards: [...previousState.deckOfcards, newCart],
      }),
      () => stateReset.forEach((target) => this.handleChanger(target)),
    );
    if (hasTrunfo === false) this.setState({ hasTrunfo: cardTrunfo });
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
      const sumOfAttributes = attrElements.reduce(
        (acc, crr) => acc + Number(crr),
        0,
      );
      const valuesLimits = attrElements.every(
        (atributo) => Number(atributo) >= valueMin && Number(atributo) <= valueMax,
      );
      const valuesSum = sumOfAttributes <= maxValueOfSum;
      results = !(valuesLimits === true && valuesSum === true);
    }
    this.setState({ isSaveButtonDisabled: results });
  }

  deleteCardOnDeck({ target }) {
    const { deckOfcards } = this.state;
    const deck = deckOfcards;
    const newDeck = deck.filter(({ cardName }) => cardName !== target.id);
    this.setState({ deckOfcards: newDeck }, () => this.checkTheTrunfo());
  }

  checkTheTrunfo() {
    const { deckOfcards } = this.state;
    if (deckOfcards.length > 0) {
      const deck = deckOfcards;
      const status = deck.some(({ cardTrunfo }) => cardTrunfo === true);
      this.setState({ hasTrunfo: status });
    } else {
      this.setState({ hasTrunfo: false });
    }
  }

  cardConstructor(array) {
    const { deckOfcards } = this.state;
    const newArray = array;
    const [elemento, valor] = newArray;
    const lengthCardRaro = 4;
    let funcao = (chave) => chave[elemento].includes(valor);
    if (array[1] === 'todas') funcao = (chave) => chave[elemento].includes('');
    if (array[1] === 'raro') {
      funcao = (chave) => chave[elemento].length === lengthCardRaro;
    }
    const newObjetc = deckOfcards.filter((chave) => funcao(chave));
    const retorno = newObjetc.map((carta) => (
      <div key={ carta.cardName }>
        <Card
          cardName={ carta.cardName }
          cardDescription={ carta.cardDescription }
          cardAttr1={ carta.cardAttr1 }
          cardAttr2={ carta.cardAttr2 }
          cardAttr3={ carta.cardAttr3 }
          cardImage={ carta.cardImage }
          cardRare={ carta.cardRare }
          cardTrunfo={ carta.cardTrunfo }
        />
        <button
          data-testid="delete-button"
          id={ carta.cardName }
          onClick={ (event) => {
            this.deleteCardOnDeck(event);
          } }
          type="button"
        >
          Excluir
        </button>
      </div>
    ));
    return retorno;
  }

  render() {
    const {
      filterText,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.handleChanger }
          onSaveButtonClick={ this.saveCardOnDeck }
        />
        <Card
          { ...this.state }
        />
        <section>
          <h2>Todas as cartas</h2>
          <label htmlFor="name-filter">
            <input
              name="filterText"
              type="text"
              data-testid="name-filter"
              onChange={
                (event) => (
                  this.setState({ filterText: ['cardName', event.target.value] }))
              }
            />
          </label>
          <label htmlFor="name-filter">
            <select
              name="filterRarity"
              type="text"
              data-testid="rare-filter"
              onChange={
                (event) => (
                  this.setState({ filterText: ['cardRare', event.target.value] }))
              }
            >
              <option>todas</option>
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
          {this.cardConstructor(filterText)}
        </section>
      </div>
    );
  }
}

export default App;
