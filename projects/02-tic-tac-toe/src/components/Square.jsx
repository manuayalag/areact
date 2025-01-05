import PropTypes from 'prop-types'; // Importar PropTypes

export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`;
  
    const handleClick = () => {
      updateBoard(index);
    }
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }
// Definir los PropTypes para el componente Square
Square.propTypes = {
    children: PropTypes.node, // Cualquier nodo React, como texto o JSX
    isSelected: PropTypes.bool, // Booleano que indica si está seleccionado
    updateBoard: PropTypes.func.isRequired, // Función obligatoria
    index: PropTypes.number.isRequired // Índice numérico obligatorio
  };