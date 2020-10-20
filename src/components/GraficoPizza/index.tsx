import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Container, Legend, LegendContainer, SideLeft, SideRight } from './styles';

import React from 'react';

interface IGraficoPizzaProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const GraficoPizza: React.FC<IGraficoPizzaProps> = ({ data }) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        {data.map((ele) => (
          <Legend key={ele.name} color={ele.color}>
            <div>{ele.percent}</div>
            <span>{ele.name}</span>
          </Legend>
        ))}
      </LegendContainer>
    </SideLeft>
    <SideRight>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey={'percent'}>
            {data.map((ele) => (
              <Cell key={ele.name} fill={ele.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default GraficoPizza;
