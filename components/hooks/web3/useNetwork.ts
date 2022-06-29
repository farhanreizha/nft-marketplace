import { CryptoHookFactory } from '@_types/hooks'
import useSWR from 'swr'

const NETWORK: { [k: string]: string } = {
  1: 'Ethereum Main Network',
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network',
  5: 'Georli Test Network',
  42: 'Kovan Test Network',
  56: 'Binance Smart Chain',
  1337: 'Ganache',
}

const targetId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as string
const targetNetwork = NETWORK[targetId]

type UseNetworkResponse = {
  isLoading: boolean
  isSupported: boolean
  targetNetwork: string
  isConnectedToNetwork: boolean
}

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>

export type UseNetworkHook = ReturnType<NetworkHookFactory>
export const hookFactory: NetworkHookFactory =
  ({ provider, isLoading }) =>
  () => {
    const { data, isValidating, ...swr } = useSWR(
      provider ? 'web3/useNetwork' : null,
      async () => {
        const changeId = (await provider!.getNetwork()).chainId

        if (!changeId) {
          throw 'Cannot retrive network. Please, refresh browser or connect to other one.'
        }

        return NETWORK[changeId]
      },
      { revalidateOnFocus: false }
    )

    const isSupported = data === targetNetwork

    return {
      ...swr,
      data,
      isValidating,
      targetNetwork,
      isSupported,
      isConnectedToNetwork: !isLoading && isSupported,
      isLoading: isLoading as boolean,
    }
  }
