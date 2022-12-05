import { useEffect, useState } from 'react'
import { getBep20Contract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import useRefresh from './useRefresh'
import environment from '../utils/Environment';



const useTotalSupply = () => {
    const [supply, setSupply] = useState(0)

    const web3 = useWeb3()
    const { fastRefresh } = useRefresh()
    const tokenAddress = environment.presaleAddress;
    const contract = getBep20Contract(tokenAddress, web3)
    useEffect(async () => {
        try {
            const res = await contract.methods.totalSupply().call()
            setSupply(res)
        } catch (error) {
            console.log('error in total supply::::', error)
        }

    }, [contract, fastRefresh])

    return supply
}



export default useTotalSupply

export { useTotalSupply };