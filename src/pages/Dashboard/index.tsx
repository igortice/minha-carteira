import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <ContentHeader title={'Dashboard'} lineColor={'#F7931B'}>
        <SelectInput options={[{ value: 1, label: 1 }]} />
        <SelectInput options={[{ value: 2, label: 2 }]} />
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
