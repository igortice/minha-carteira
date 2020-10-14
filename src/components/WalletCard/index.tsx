import { Container } from './styles';
import CountUp from 'react-countup';
import React from 'react';
import arrowDownImg from '../../assets/arrow-down.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import dollarImg from '../../assets/dollar.svg';

interface IWalletCardProps {
  title: string;
  amount: number;
  footerLabel: string;
  icon: 'dollar' | 'arrowUp' | 'arrowDown';
  color: string;
}

const WalletCard: React.FC<IWalletCardProps> = ({ title, amount, footerLabel, icon, color }) => {
  const iconSelected = () => {
    switch (icon) {
      case 'dollar':
        return dollarImg;
      case 'arrowUp':
        return arrowUpImg;
      case 'arrowDown':
        return arrowDownImg;
      default:
        return undefined;
    }
  };

  return (
    <Container color={color}>
      <span>{title}</span>
      <h1>
        <CountUp prefix={'R$ '} separator={'.'} decimal={','} decimals={2} end={amount} />
      </h1>
      <small>{footerLabel}</small>
      <img src={iconSelected()} alt={title} />
    </Container>
  );
};

export default WalletCard;
