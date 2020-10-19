import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Container, Legend, LegendContainer, SideLeft, SideRight } from './styles';

import React from 'react';

const GraficoPizza: React.FC = () => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        <Legend color={'#F7931B'}>
          <div>5%</div>
          <span>entradas</span>
        </Legend>
        <Legend color={'#E44C4E'}>
          <div>95%</div>
          <span>saídas</span>
        </Legend>
      </LegendContainer>
    </SideLeft>
    <SideRight></SideRight>
  </Container>
);

export default GraficoPizza;
