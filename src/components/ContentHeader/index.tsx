import React from 'react';

import { Container, Controllers, TitleContainer } from './styles';

const ContentHeader: React.FC = () => {
  return (
    <Container>
      <TitleContainer>
        <h1>Dashboard</h1>
      </TitleContainer>
      <Controllers>
        <button>Botão A</button>
        <button>Botão B</button>
      </Controllers>
    </Container>
  );
};

export default ContentHeader;
