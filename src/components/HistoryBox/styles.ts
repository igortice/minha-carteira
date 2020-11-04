import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 340px;

  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};

  margin: 10px 0;
  padding: 30px 20px;

  border-radius: 7px;
`;
