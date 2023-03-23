import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { BlockchainStore, StoreProvider } from '@/store/store'

const store = new BlockchainStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}><Component {...pageProps} /></StoreProvider>
  )
}
