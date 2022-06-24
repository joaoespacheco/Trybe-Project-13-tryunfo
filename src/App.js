import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName="Nome da carta"
          cardDescription="Descrição da carta"
          cardAttr1="12"
          cardAttr2="34"
          cardAttr3="56"
          cardImage="url-to-image"
          cardRare="raro"
          cardTrunfo={ false }
          hasTrunfo={ false }
          isSaveButtonDisabled={ false }
          onInputChange={ () => { } }
          onSaveButtonClick={ () => { } }
        />
        <Card
          cardName="Nome da carta"
          cardDescription="Descrição da carta"
          cardAttr1="12"
          cardAttr2="34"
          cardAttr3="56"
          cardImage="url-to-image"
          cardRare="raro"
          cardTrunfo={ false }
        />
      </div>
    );
  }
}

export default App;
