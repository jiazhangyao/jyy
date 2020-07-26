import React from 'react';
import Headers from './components/headers';
import Lists from './components/lists';
import { arrListTop, arrListBottom } from './datas/const'
import './App.css';

function App() {
  return (
    <div className="App">
      <Headers />

      <Lists arr={arrListTop} />
      <article style={{width: '100%', height: 20, background: '#eee', clear: 'both'}}></article>
      <Lists arr={arrListBottom} />
      <section style={{clear: 'both', textAlign: 'center', background: '#eee', padding: 30}}>
        <h2>抵押说明</h2>
        <p>矿池抵押地址：FFwk2Zk2EU4vBhwZZc4Xxzv1f7nTBJt41M</p>
        <p>抵押标准：1K算力抵押300BFC (以24h平均算力为参考标准)</p>
      </section>



    </div>
  );
}

export default App;
