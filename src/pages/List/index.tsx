import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import { Container, Content } from './styles';

const List: React.FC = () => {
  return (
    <Container>
      <ContentHeader title={'List'} lineColor={'#E44C4E'}>
        <SelectInput options={[{ value: 3, label: 3 }]} />
      </ContentHeader>

      <Content>
        {Array(10)
          .fill(null)
          .map((_, idx) => (
            <HistoryFinanceCard
              key={idx}
              tagColor='#E44C4E'
              title='Conta de Luz'
              subtitle='11/10/2020'
              amount='R$ 130,00'
            />
          ))}
      </Content>
    </Container>
  );
};

export default List;
