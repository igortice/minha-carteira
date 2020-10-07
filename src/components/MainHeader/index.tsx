import React, { useMemo } from 'react';
import emojis from '../../utils/emojis';
import Toggle from '../Toggle';

import { Container, Profile, Welcome, Username } from './styles';

const MainHeader: React.FC = () => {
  const emoji = useMemo(() => {
    const index = Math.floor(Math.random() * emojis.length);
    return emojis[index];
  }, []);
  return (
    <Container>
      <Toggle />

      <Profile>
        <Welcome>Ola, {emoji}</Welcome>
        <Username>Igor Rocha</Username>
      </Profile>
    </Container>
  );
};

export default MainHeader;
