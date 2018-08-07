import styled from 'styled-components';

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
	display: flex;
	justify-content: center;
	align-items: center;
`;