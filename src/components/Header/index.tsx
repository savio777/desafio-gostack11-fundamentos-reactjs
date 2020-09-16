import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  pageGo: '/' | '/import';
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  pageGo,
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link to={pageGo}>{pageGo === '/' ? 'Voltar' : 'Importar'}</Link>
      </nav>
    </header>
  </Container>
);

export default Header;
