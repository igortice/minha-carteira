import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main``;

export const Filters = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  margin-bottom: 20px;

  .tag-filter {
    font-size: 18px;
    font-weight: 500;

    margin: 0 10px;

    background: none;
    color: ${(props) => props.theme.colors.white};

    opacity: 0.3;

    transition: all 0.3s;
    &:hover {
      opacity: 0.7;
      transform: scale(1.3);
    }

    &::after {
      content: '';
      display: block;
      width: 55px;
      margin: 0 auto;
    }
  }

  .tf-recorrente::after {
    border-bottom: 10px solid ${(props) => props.theme.colors.success};
  }

  .tf-eventual::after {
    border-bottom: 10px solid ${(props) => props.theme.colors.warning};
  }

  .tag-actived {
    opacity: 1;
  }
`;
