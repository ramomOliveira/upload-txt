import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset de estilos */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Remova os estilos de lista e botões padrão */
  ul,
  ol {
    list-style: none;
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
  }

  /* Adicione seu reset de estilos aqui conforme necessário */
`;

export default GlobalStyles;
