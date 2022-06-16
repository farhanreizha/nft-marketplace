import { CryptoHookFactory } from '@_types/hooks'
import { useEffect } from 'react'
import useSWR from 'swr'

type UseAccountResponse = {
  connect: () => void
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>
export const hookFactory: AccountHookFactory =
  ({ provider, ethereum }) =>
  () => {
    const swrRes = useSWR(
      provider ? 'web3/useAccuont' : null,
      async () => {
        const accuonts = await provider!.listAccounts()
        const account = accuonts[0]
        if (!account) {
          throw 'Cannot retrive account! Please, connect to web3 Wallet.'
        }
        return account
      },
      { revalidateOnFocus: false }
    )

    useEffect(() => {
      ethereum?.on('accountsChanged', handleAccountsChanged)
      return () => {
        ethereum?.removeListener('accountsChange', handleAccountsChanged)
      }
    }, [ethereum])

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[]
      if (accounts.length === 0) {
        console.error('Please, connect to Web3 wallet')
      } else if (accounts[0] !== swrRes.data) {
        alert('accounts has changed')
        console.log(accounts[0])
      }
    }

    const connect = async () => {
      try {
        ethereum?.request({ method: 'eth_requestAccounts' })
      } catch (e) {
        console.error(e)
      }
    }

    return { ...swrRes, connect }
  }
