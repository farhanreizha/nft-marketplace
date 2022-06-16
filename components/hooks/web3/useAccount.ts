import { CryptoHookFactory } from '@_types/hooks'
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

    const connect = async () => {
      try {
        ethereum?.request({ method: 'eth_requestAccounts' })
      } catch (e) {
        console.error(e)
      }
    }

    return { ...swrRes, connect }
  }
