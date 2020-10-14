import React, { useMemo, useState } from 'react';

import { Container } from './styles';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import _ from 'lodash';
import expenses from '../../mocks/expenses';
import gains from '../../mocks/gains';
import moment from 'moment';
import months from '../../utils/months';

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState(moment().month());
  const [yearSelected, setYearSelected] = useState(moment().year());

  const meses = useMemo(() => months.map((ele, idx) => ({ value: idx, label: ele })), []);
  const uniqueYears = useMemo(() => {
    return _.uniq([...expenses, ...gains].map((item) => moment(item.date).year())).map((ele) => ({
      value: ele,
      label: ele,
    }));
  }, []);
  return (
    <Container>
      <ContentHeader title={'Dashboard'} lineColor={'#F7931B'}>
        <SelectInput options={meses} defaultValue={monthSelected} onChange={(e) => setMonthSelected(+e.target.value)} />
        <SelectInput
          options={uniqueYears}
          defaultValue={yearSelected}
          onChange={(e) => setYearSelected(+e.target.value)}
        />
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
