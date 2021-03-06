import styled from 'styled-components';

export const BoardGrid = styled.div`
  height: ${props => props.size || '100%'};
  width: ${props => props.size || '100%'};
  border-right: 1px solid;
  border-bottom: 1px solid;
  box-sizing: border-box;
  ${props => props.gridPosition || '' }
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(11, 1fr);
`;

export const ColumnLabels = styled.div`
	grid-row: 1 / span 1;
	grid-column: 2 / span 10;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
`;

export const RowLabels = styled.div`
	grid-row: 2 / span 10;
   grid-column: 1 / span 1;
   display: grid;
   grid-template-rows: repeat(10, 1fr);
`;

export const Square = styled.div`
	border-top: 1px solid;
  border-left: 1px solid;
  background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Button = styled.button`
  height: 30px;
  width: 90px;
  background-color: gainsboro;
  font-size: 1em;
  font-family: Times New Roman;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.5);
  margin: 5px;
  
  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }

  &:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.5) inset;
    filter: brightness(0.8);
  }

  &:disabled {
    box-shadow: 0 1px 2px rgba(0,0,0,0.5) inset;
  }
`;