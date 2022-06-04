import { createContext, FC, ReactNode, useContext, useState } from 'react'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { Contract, providers } from 'ethers'

export type Web3State = {
  ethereum?: MetaMaskInpageProvider
  provider?: providers.Web3Provider
  contract?: Contract
}

const Web3Context = createContext<Web3State>(null)

interface Props {
  children: ReactNode
}

const Web3Provider: FC<Props> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(null)

  return <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  return useContext(Web3Context)
}

export default Web3Provider
