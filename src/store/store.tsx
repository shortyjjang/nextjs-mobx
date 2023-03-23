import { SHA256 } from "crypto-js";
import { makeAutoObservable } from "mobx";
import { createContext, useContext, FC, useEffect } from "react";

interface IBlock {
    hash: string;
    transactions: Array<string>
}
class BlockchainStore {
    blocks: Array<IBlock> = []
    transactions: Array<string> = []

    constructor() {
        makeAutoObservable(this)
    }
    get numberBlocks() {
        return this.blocks.length
    }
    addTransaction(message: string) {
        this.transactions.push(message)
    }
    writeBlock() {
        if(this.transactions.length === 0)  return;

        const transactions = this.transactions
        this.transactions = []

        const prevBlock = this.blocks[this.blocks.length - 1] ?? {hash:''}
        const hash = SHA256(
            `${prevBlock.hash}${JSON.stringify(transactions)}`
        ).toString()

        this.blocks.push({
            hash,
            transactions,
        })
    }
}

 const StoreContext = createContext<BlockchainStore>(new BlockchainStore())

 const StoreProvider: FC<{store: BlockchainStore, children: React.ReactNode}> =({store, children}) => {
    useEffect(() => {
        const interval = setInterval(() => {
            store.writeBlock()
        }, 5000)
        return () => clearInterval(interval)
    },[store])
    return(
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
 }

 const useStore = () => {
    return useContext(StoreContext)
 }

export {BlockchainStore, StoreProvider, useStore}