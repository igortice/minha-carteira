import { Container, Content } from './styles';
import React, { useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletCard from '../../components/WalletCard';
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
      <Content>
        <WalletCard
          title={'saldo'}
          amount={150.0}
          footerLabel={'atualizado com bases na entrada e saída'}
          icon={'dollar'}
          color={'#4E41F0'}
        />
        <WalletCard
          title={'entradas'}
          amount={5000.0}
          footerLabel={'atualizado com bases na entrada e saída'}
          icon={'arrowUp'}
          color={'#F7931B'}
        />
        <WalletCard
          title={'saída'}
          amount={4850.0}
          footerLabel={'atualizado com bases na entrada e saída'}
          icon={'arrowDown'}
          color={'#E44C4E'}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
