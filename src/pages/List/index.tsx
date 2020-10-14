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
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [monthSelected, setMonthSelected] = useState(moment().month());
  const [yearSelected, setYearSelected] = useState(moment().year());
  const [data, setData] = useState<IData[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);

  const { type } = match.params;

  const pageData = useMemo(
    () =>
      type === 'entry-balance'
        ? { title: 'Entrada', lineColor: '#4E41F0', data: gains }
        : { title: 'Saída', lineColor: '#E44C4E', data: expenses },
    [type]
  );
  const meses = useMemo(() => months.map((ele, idx) => ({ value: idx, label: ele })), []);
  const uniqueYears = useMemo(() => {
    const { data: listaData } = pageData;
    return _.uniq(listaData.map((item) => moment(item.date).year())).map((ele) => ({ value: ele, label: ele }));
  }, [pageData]);

  useEffect(() => {
    const { data: listaData } = pageData;

    const filteredData = listaData.filter((ele) => {
      return (
        moment(ele.date).month() === monthSelected &&
        moment(ele.date).year() === yearSelected &&
        selectedFrequency.includes(ele.frequency)
      );
    });

    const response = filteredData.map((item) => {
      return {
        id: _.uniqueId(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: moment(item.date).format('DD/MM/YYYY'),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      };
    });
    setData(response);
  }, [pageData, monthSelected, yearSelected, selectedFrequency]);

  const handleFrequencyClick = (frequency: string): void => {
    const selected = selectedFrequency.findIndex((item) => item === frequency);

    if (selected >= 0) {
      const filtered = selectedFrequency.filter((item) => item !== frequency);
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency((prev) => [...prev, frequency]);
    }
  };

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <SelectInput options={meses} defaultValue={monthSelected} onChange={(e) => setMonthSelected(+e.target.value)} />
        <SelectInput
          options={uniqueYears}
          defaultValue={yearSelected}
          onChange={(e) => setYearSelected(+e.target.value)}
        />
      </ContentHeader>

      <Filters>
        <button
          type='button'
          className={`
            tag-filter tf-recorrente ${selectedFrequency.includes('recorrente') && 'tag-actived'}
          `}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button
          type='button'
          className={`
          tag-filter tf-eventual ${selectedFrequency.includes('eventual') && 'tag-actived'}
        `}
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
            subtitle={item.dateFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
