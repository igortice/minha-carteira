import { Container, Content, Filters } from './styles';
import React, { useEffect, useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import _ from 'lodash';
import expenses from '../../mocks/expenses';
import formatCurrency from '../../utils/formatCurrency';
import gains from '../../mocks/gains';
import moment from 'moment';

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

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dataFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const { type } = match.params;

  const [data, setData] = useState<IData[]>([]);
  const listaData = useMemo(
    () => (type === 'entry-balance' ? gains : expenses),
    [type]
  );
  useEffect(() => {
    // moment(item.date, 'DD/MM/YYYY').toString()
    const response = listaData.map((item) => ({
      id: _.uniqueId(),
      description: item.description,
      amountFormatted: formatCurrency(Number(item.amount)),
      frequency: item.frequency,
      dataFormatted: moment(item.date).format('DD/MM/YYYY'),
      tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
    }));
    setData(response);
  }, [listaData]);

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
        {data.map((item) => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dataFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
