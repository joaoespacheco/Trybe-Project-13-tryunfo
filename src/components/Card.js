import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
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
    } = this.props;
    return (
      <div className="card-container">
        <div className="card-container-header">
          <h2 data-testid="name-card">{ cardName }</h2>
          <h3 data-testid="rare-card">{cardRare}</h3>
        </div>
        <div className="card-container-picture">
          {
            cardTrunfo === true ? (
              <p data-testid="trunfo-card">
                Super
                {' '}
                <br />
                {' '}
                Trunfo
              </p>
            ) : (
              '')
          }
          <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        </div>
        <div className="card-container-description">
          <p data-testid="description-card">{ cardDescription }</p>
        </div>
        <div className="card-container-attributes">
          <div data-testid="attr1-card" className="card-container-attributes-item">
            <div className="attr-name">
              <h2>Atributo 01:</h2>
            </div>
            <div className="attr-value">
              <h3>{cardAttr1}</h3>
            </div>
          </div>
          <div data-testid="attr2-card" className="card-container-attributes-item">
            <div className="attr-name">
              <h2>Atributo 02:</h2>
            </div>
            <div className="attr-value">
              <h3>{cardAttr2}</h3>
            </div>
          </div>
          <div data-testid="attr3-card" className="card-container-attributes-item">
            <div className="attr-name">
              <h2>Atributo 03:</h2>
            </div>
            <div className="attr-value">
              <h3>{cardAttr3}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
