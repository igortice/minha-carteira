import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import { Container } from './styles';
import React from 'react';

interface IHistoryBoxProps {
  data: {
    month: string;
    amountEntry: number;
    amountOutput: number;
  }[];
  lineColorAmountEntry: string;
  lineColorAmountOutput: string;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({ data, lineColorAmountEntry, lineColorAmountOutput }) => (
  <Container>
    <h2>Histórico de Saldo</h2>

    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray={'3 3'} stroke={'#cecece'} />
        <XAxis dataKey={'month'} stroke={'#cecece'} />
        <Tooltip />
        <Line
          type={'monotone'}
          dataKey={'amountEntry'}
          name={'Entradas'}
          stroke={lineColorAmountEntry}
          strokeWidth={5}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
        <Line
          type={'monotone'}
          dataKey={'amountOutput'}
          name={'Saídas'}
          stroke={lineColorAmountOutput}
          strokeWidth={5}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </Container>
);

export default HistoryBox;
