import React from 'react';
import PropTypes from 'prop-types';

const MAX_ATTRIBUTES_POINTS = 210;

class Form extends React.Component {
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
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <div className="form-container">
        <label htmlFor="name-input" className="form-container-name">
          <p>Nome da carta:</p>
          <input
            name="cardName"
            data-testid="name-input"
            type="text"
            onChange={ onInputChange }
            value={ cardName }
          />
        </label>
        <label htmlFor="description-textarea">
          <p>Descrição da carta:</p>
          <textarea
            name="cardDescription"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <div className="form-container-attributes">
          <label htmlFor="attr1-input">
            <p>Atributo 01:</p>
            <input
              name="cardAttr1"
              data-testid="attr1-input"
              type="number"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr2-input">
            <p>Atributo 02:</p>
            <input
              name="cardAttr2"
              data-testid="attr2-input"
              type="number"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr3-input">
            <p>Atributo 03:</p>
            <input
              name="cardAttr3"
              data-testid="attr3-input"
              type="number"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>
        </div>
        <p>
          Pontos de atributo restantes:
          {' '}
          {
            MAX_ATTRIBUTES_POINTS - (
              Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3)
            )
          }
        </p>
        <label htmlFor="image-input" className="form-container-image">
          <p>Imagem da carta:</p>
          <input
            name="cardImage"
            data-testid="image-input"
            type="text"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="rare-input" className="form-container-rarity">
          <p>Raridade:</p>
          <select
            name="cardRare"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        {hasTrunfo === false ? (
          <label htmlFor="trunfo-input" className="form-container-trunfo">
            <input
              name="cardTrunfo"
              data-testid="trunfo-input"
              type="checkbox"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />
            <p>Super Trunfo</p>
          </label>
        ) : (
          <p>
            Você já tem um
            {' '}
            <span>Super Trunfo</span>
            {' '}
            em seu baralho
          </p>
        )}
        <button
          data-testid="save-button"
          type="submit"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
