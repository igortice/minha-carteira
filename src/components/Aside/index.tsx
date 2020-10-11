import React from 'react';
import {
  MdArrowDownward,
  MdArrowUpward,
  MdDashboard,
  MdExitToApp,
} from 'react-icons/md';

import srcLogoImg from '../../assets/logo.svg';
import {
  Container,
  ContainerGrid,
  Header,
  LogoImg,
  MenuContainer,
  MenuItemLink,
  Title,
} from './styles';

const Aside: React.FC = () => {
  return (
    <Container>
      <ContainerGrid>
        <Header>
          <LogoImg src={srcLogoImg} alt={'Logo Imagem'} />
          <Title>Minha Carteira</Title>
        </Header>

        <MenuContainer>
          <MenuItemLink href={'/dashboard'}>
            <MdDashboard />
            Dashboard
          </MenuItemLink>
          <MenuItemLink href={'/list/entry-balance'}>
            <MdArrowUpward />
            Entradas
          </MenuItemLink>
          <MenuItemLink href={'/list/exit-balance'}>
            <MdArrowDownward />
            Saídas
          </MenuItemLink>
          <MenuItemLink href={'/logout'}>
            <MdExitToApp />
            Logout
          </MenuItemLink>
        </MenuContainer>
      </ContainerGrid>
    </Container>
  );
};

export default Aside;
