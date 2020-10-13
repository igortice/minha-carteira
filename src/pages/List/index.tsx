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
import months from '../../utils/months';

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
  const [monthSelected, setMonthSelected] = useState<string>(
    moment().month().toString()
  );
  const [yearSelected, setYearSelected] = useState<string>(
    moment().year().toString()
  );
  const [data, setData] = useState<IData[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<string[]>([]);

  const { type } = match.params;

  const listaData = useMemo(
    () => (type === 'entry-balance' ? gains : expenses),
    [type]
  );
  const meses = useMemo(
    () => months.map((ele, idx) => ({ value: idx, label: ele })),
    []
  );
  const uniqueYears = useMemo(() => {
    return _.uniq(
      listaData.map((item) => moment(item.date).year())
    ).map((ele) => ({ value: ele, label: ele }));
  }, [listaData]);
  const balanceParams = useMemo(() => {
    return type === 'entry-balance'
      ? { title: 'Entrada', lineColor: '#F7931B' }
      : { title: 'Saída', lineColor: '#E44C4E' };
  }, [type]);

  useEffect(() => {
    const filteredData = listaData.filter((ele) => {
      return (
        moment(ele.date).month().toString() === monthSelected &&
        moment(ele.date).year().toString() === yearSelected
      );
    });

    const response = filteredData.map((item) => {
      return {
        id: _.uniqueId(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dataFormatted: moment(item.date).format('DD/MM/YYYY'),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      };
    });
    setData(response);
  }, [listaData, monthSelected, yearSelected]);

  const handleFrequencyClick = (frequency: string): void => {
    const selected = selectedFrequency.findIndex((item) => item === frequency);

    if(selected >= 0) {
      console.log('já selecionado');
    } else {
      console.log('now');
      setSelectedFrequency([frequency])
    }
  };

  return (
    <Container>
      <ContentHeader
        title={balanceParams.title}
        lineColor={balanceParams.lineColor}
      >
        <SelectInput
          options={meses}
          defaultValue={monthSelected}
          onChange={(e) => setMonthSelected(e.target.value)}
        />
        <SelectInput
          options={uniqueYears}
          defaultValue={yearSelected}
          onChange={(e) => setYearSelected(e.target.value)}
        />
      </ContentHeader>

      <Filters>
        <button
          type='button'
          className='tag-filter tf-recorrente'
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button
          type='button'
          className='tag-filter tf-eventual'
          onClick={() => handleFrequencyClick('eventual')}
        >
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
