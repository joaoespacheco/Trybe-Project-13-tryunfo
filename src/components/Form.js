import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="name-input">
          <p>Nome da carta:</p>
          <input data-testid="name-input" type="text" />
        </label>
        <label htmlFor="description-textarea">
          <p>Descrição da carta:</p>
          <textarea data-testid="description-input" />
        </label>
        <label htmlFor="attr1-input">
          <p>Atributo 01:</p>
          <input data-testid="attr1-input" type="number" />
        </label>
        <label htmlFor="attr2-input">
          <p>Atributo 02:</p>
          <input data-testid="attr2-input" type="number" />
        </label>
        <label htmlFor="attr3-input">
          <p>Atributo 03:</p>
          <input data-testid="attr3-input" type="number" />
        </label>
        <label htmlFor="image-input">
          <p>Imagem da carta:</p>
          <input data-testid="image-input" type="text" />
        </label>
        <label htmlFor="rare-input">
          <p>Raridade:</p>
          <select data-testid="rare-input">
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        <br />
        <label htmlFor="trunfo-input">
          <input data-testid="trunfo-input" type="checkbox" />
          <span>Super Trunfo</span>
        </label>
        <br />
        <button data-testid="save-button" type="submit">Salvar</button>
      </div>
    );
  }
}

export default Form;
