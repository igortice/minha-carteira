import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import { Container } from './styles';

const List: React.FC = () => {
  return (
    <Container>
      <ContentHeader title={'List'} lineColor={'#E44C4E'}>
        <SelectInput options={[{ value: 3, label: 3 }]} />
      </ContentHeader>
    </Container>
  );
};

export default List;
