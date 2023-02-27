import CadastroContato from './components/CadastroContato';
import Contatos from './components/Contatos';
import Rodape from './components/Rodape';
import styles from './styles/App.module.scss';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div className={styles.conteudo}>
        <CadastroContato />
        <Contatos />
      </div>
      <div>
        <Rodape />
      </div>
    </RecoilRoot>
  );
}

export default App;
