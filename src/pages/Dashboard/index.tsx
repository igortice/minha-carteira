import { Container, Content } from './styles';
import React, { useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import GraficoPizza from '../../components/GraficoPizza';
import HistoryBox from '../../components/HistoryBox';
import MessageBox from '../../components/MessageBox';
import SelectInput from '../../components/SelectInput';
import WalletCard from '../../components/WalletCard';
import _ from 'lodash';
import expenses from '../../mocks/expenses';
import gains from '../../mocks/gains';
import happyImg from '../../assets/happy.svg';
import moment from 'moment';
import months from '../../utils/months';
import sadImg from '../../assets/sad.svg';

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

  const totalExpenses = useMemo(() => {
    return _.sumBy(expenses, (item) => {
      const month = moment(item.date).month();
      const year = moment(item.date).year();

      return (month === monthSelected && year === yearSelected && Number(item.amount)) || 0;
    });
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    return _.sumBy(gains, (item) => {
      const month = moment(item.date).month();
      const year = moment(item.date).year();

      return (month === monthSelected && year === yearSelected && Number(item.amount)) || 0;
    });
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Eita',
        description: 'Sua carteira está negativa.',
        footerText: 'Tente poupar no próximo mês.',
        icon: sadImg,
      };
    } else if (totalBalance === 0) {
      return {
        title: 'Ufa',
        description: 'Sua carteira está zerada.',
        footerText: 'Tente poupar.',
        icon: happyImg,
      };
    } else {
      return {
        title: 'Muito bem',
        description: 'Sua carteira está positiva.',
        footerText: 'Faça algum investimento.',
        icon: happyImg,
      };
    }
  }, [totalBalance]);

  const relationExpensesXGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = (totalGains / total) * 100;
    const percentExpenses = (totalExpenses / total) * 100;

    return [
      {
        name: 'Entradas',
        value: totalExpenses,
        percent: Number(percentGains.toFixed(1)) || 0,
        color: '#E44C4E',
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(1)) || 0,
        color: '#F7931B',
      },
    ];
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return months
      .map((_, month) => {
        let amountEntry = 0;
        gains.forEach((gain) => {
          const date = new Date(gain.date);
          const gainMonth = date.getMonth();
          const gainYear = date.getFullYear();

          if (gainMonth === month && gainYear === yearSelected) {
            try {
              amountEntry += Number(gain.amount);
            } catch (error) {}
          }
        });

        let amountOutput = 0;
        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const expenseMonth = date.getMonth();
          const expenseYear = date.getFullYear();

          if (expenseMonth === month && expenseYear === yearSelected) {
            try {
              amountOutput += Number(expense.amount);
            } catch (error) {}
          }
        });

        return {
          monthNumber: month,
          month: months[month].substr(0, 3),
          amountEntry,
          amountOutput,
        };
      })
      .filter((item) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return (yearSelected === currentYear && item.monthNumber <= currentMonth) || yearSelected < currentYear;
      });
  }, [yearSelected]);

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
          amount={totalBalance}
          footerLabel={'atualizado com bases na entrada e saída'}
          icon={'dollar'}
          color={'#4E41F0'}
        />
        <WalletCard
          title={'entradas'}
          amount={totalGains}
          footerLabel={'atualizado com bases na entrada e saída'}
          icon={'arrowUp'}
          color={'#F7931B'}
        />
        <WalletCard
          title={'saída'}
          amount={totalExpenses}
          footerLabel={'atualizado com bases na entrada e saída'}
          icon={'arrowDown'}
          color={'#E44C4E'}
        />
        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <GraficoPizza data={relationExpensesXGains} />

        <HistoryBox data={historyData} lineColorAmountEntry={'#f7931b'} lineColorAmountOutput={'#e44c4e'} />
      </Content>
    </Container>
  );
};

export default Dashboard;
