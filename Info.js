import React from "react";
import { Link } from 'react-router-dom';
import './Info.css';

export default class Info extends React.Component {
  render() {
    return (
      <div id="info">
        <h1>Aplicação em React!</h1>
        <p>De maneira a aplicar os conhecimentos adquiridos em React JS foi construída esta pequena aplicação, conhecida pelos programadores como a muito duplicada ToDo List, ou em português simples uma Lista de Tarefas.</p>
        <p>Apesar de ainda se tratar de um trabalho em andamento, já foram empregues bastantes conceitos na sua realização. Entre outras funções, esta aplicação permite:</p>
        <ol>
          <li>Adicionar e Apagar tarefas;</li>
          <li>Editar tarefas;</li>
          <li>Mudar o estado de cada tarefa para Completo;</li>
          <li>Filtrar as tarefas de acordo com o seu estado;</li>
          <li>Guardar todas as tarefas num REST API;</li>
          <li>Facilidade de navegação por várias páginas usando React-Router.</li>
        </ol>
        <p>Todas estas funções também foram devidamente validadas e estilizadas em HTML e CSS.</p>
        <p>
          Para mais informação ver o código <a href="https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf">aqui</a>.
        </p>
        <Link to='/'>Voltar</Link>
      </div>
    );
  }
}
