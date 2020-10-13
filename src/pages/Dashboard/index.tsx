import { Container } from './styles';
import ContentHeader from '../../components/ContentHeader';
import React from 'react';
import SelectInput from '../../components/SelectInput';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <ContentHeader title={'Dashboard'} lineColor={'#F7931B'}>
        <SelectInput options={[{ value: 1, label: 1 }]} onChange={() => {}} />
        <SelectInput options={[{ value: 2, label: 2 }]} onChange={() => {}} />
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
