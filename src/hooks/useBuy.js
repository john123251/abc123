import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { getBep20Contract } from '../utils/contractHelpers'
import { getEthValue } from "../utils/formatBalance"


export const useBuy = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const tokenAddress = environment.presaleAddress;
    const contract = getBep20Contract(tokenAddress, web3)
    const buyTokens = useCallback(async (tokens, price) => {
        const amount = getEthValue(price, tokens)

        const tx = await contract.methods.buyTokens(account).send({ from: account, value: amount })
            .on('transactionHash', (tx) => { return tx.transactionHash });
        return tx

    }, [account, contract])

    return { buy: buyTokens }
}

export default useBuy;