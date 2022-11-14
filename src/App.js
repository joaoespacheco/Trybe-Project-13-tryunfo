import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

const InitialState = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ...InitialState,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      deckOfcards: [],
      filterText: ['cardName', ''],
      filterDisable: false,
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
      cardName, cardDescription, cardImage, cardRare, cardAttr1,
      cardAttr2, cardAttr3, cardTrunfo, hasTrunfo,
    } = this.state;
    const newCard = {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
    };

    this.setState(
      (previousState) => ({
        deckOfcards: [...previousState.deckOfcards, newCard],
      }),
      () => this.setState(({ ...InitialState })),
    );
    if (hasTrunfo === false) this.setState({ hasTrunfo: cardTrunfo });
  }

  checkState() {
    const {
      cardName, cardDescription, cardImage, cardRare,
      cardAttr1, cardAttr2, cardAttr3,
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
    if (array[0] === 'cardTrunfo') funcao = (chave) => chave[elemento] === valor;
    const newObjetc = deckOfcards.filter((chave) => funcao(chave));
    const retorno = newObjetc.map((carta) => (
      <div key={ carta.cardName }>
        <Card { ...carta } />
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
    const { filterText, filterDisable } = this.state;

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
              disabled={ filterDisable }
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
              disabled={ filterDisable }
            >
              <option>todas</option>
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
          <label htmlFor="trunfo-input">
            Super trunfo
            <input
              data-testid="trunfo-filter"
              type="checkbox"
              onChange={
                (event) => (
                  this.setState({
                    filterText: ['cardTrunfo', event.target.checked],
                    filterDisable: event.target.checked,
                  }))
              }
            />
          </label>
          {this.cardConstructor(filterText)}
        </section>
      </div>
    );
  }
}

export default App;
