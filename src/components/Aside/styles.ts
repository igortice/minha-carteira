import styled from 'styled-components';

export const Container = styled.div`
  grid-area: AS;
  background-color: ${(props) => props.theme.colors.secondary};
  border-right: 1px solid ${(props) => props.theme.colors.gray};
  padding: 0 20px;
`;

export const ContainerGrid = styled.div`
  display: grid;
  grid-template-rows: 70px auto;
  grid-template-areas:
    'HD'
    'MN';
  height: 100vh;
`;

export const Header = styled.header`
  grid-area: HD;
  align-items: center;
  display: flex;
`;

export const LogoImg = styled.img`
  height: 40px;
  width: 40;
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.colors.white};
  margin-left: 10px;
`;

export const MenuContainer = styled.nav`
  grid-area: MN;
  display: flex;
  flex-direction: column;
`;

export const MenuItemLink = styled.a`
  color: ${(props) => props.theme.colors.info};
  text-decoration: none;
  transition: opacity 0.3s;
  margin: 7px 0;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 22px;
    margin-right: 5px;
  }
`;
