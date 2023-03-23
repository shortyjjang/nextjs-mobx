import { useStore } from "@/store/store";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";

const Home: FC = () => {
  return (
    <main>
      <Form />
      <Transaction />
      <Blocks />
    </main>
  )
}

const Form:FC = () => {
  const store = useStore();
  const [message, setMessage] = useState<string>('')
  return <form onSubmit={e => {
    e.preventDefault()
    store.addTransaction(message)
    setMessage('')
  }}>
    <input type="text" onChange={e => setMessage(e.target.value)} />
    <button type="submit" disabled={!message}>Add</button>
  </form>
}

const Transaction:FC = observer(() => {
  const store = useStore()

  return store.transactions.length > 0 ? (
    <div>
      <h2>등록 중 인 블록체인</h2>
      <ul>
        {store.transactions.map((transaction, index) => (
          <li key={index}>{transaction}</li>
        ))}
      </ul>
    </div>
  ): null
})

const Blocks:FC = observer(() => {
  const store = useStore()
  return store.blocks.length > 0 ? (
    <div>
      <h2>등록된 블록체인(총 {store.numberBlocks}개)</h2>
      <ul>
        {[...store.blocks].reverse().map(block => (
          <li key={block.hash}>
            <h3>{block.hash}</h3>
            <pre>{JSON.stringify(block.transactions, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  ):
  null
})

export default Home;
