import React, { useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import { Container, Content, Filters } from './styles';

const MONTHS = [
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'SETEMBRO' },
];

const YEARS = [
  { value: 2018, label: 2018 },
  { value: 2019, label: 2019 },
  { value: 2020, label: 2020 },
];

interface IRouteParams {
  match: { params: { type: string } };
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const { type } = match.params;

  const balanceParams = useMemo(() => {
    return type === 'entry-balance'
      ? { title: 'Entrada', lineColor: '#F7931B' }
      : { title: 'Saída', lineColor: '#E44C4E' };
  }, [type]);

  return (
    <Container>
      <ContentHeader
        title={balanceParams.title}
        lineColor={balanceParams.lineColor}
      >
        <SelectInput options={MONTHS} />
        <SelectInput options={YEARS} />
      </ContentHeader>

      <Filters>
        <button type='button' className='tag-filter tf-recorrente'>
          Recorrentes
        </button>
        <button type='button' className='tag-filter tf-eventual'>
          Eventuais
        </button>
      </Filters>

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
