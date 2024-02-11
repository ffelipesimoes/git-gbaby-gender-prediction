import React from 'react'
import { images } from '../assets';
import { useState } from 'react';
import { useEffect } from 'react';
import { ethers } from 'ethers'
import abi from '../assets/BabyPool.json'
import axios from "axios";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { useTranslation } from "react-i18next";
import { BoyGirl } from './';


const styles = {
  text: "text-[26px]",
  textboy: "text-[30px] text-[#90d9e3]",
  textgirl: "text-[30px] text-[#e390b0]",
  bgrecy: "w-full h-full object-cover ",
  bg: `bg-[#eefcf7] z-201 relative  rounded-full shadow-l mx-auto max-w-[500px] min-w-[375px] shadow-lg px-[10px] pt-[20px] pb-[10px] flex justify-center`,
  bgboy: `bg-[#d1effc] z-201 relative  rounded-full shadow-l mx-auto max-w-[500px] min-w-[375px] shadow-lg px-[10px] pt-[20px] pb-[10px] flex justify-center`,
  bggirl: `bg-[#fcf0ee] z-201 relative  rounded-full shadow-l mx-auto max-w-[500px] min-w-[375px] shadow-lg px-[10px] pt-[20px] pb-[10px] flex justify-center`,
  center: `flex justify-center justify-self-center place-content-center place-self-center`,
  imgrecy: 'w-[1520px] h-[1520px]  z-1 object-cover opacity-10 absolute  sm:-top-[400px] -top-[350px]',
  about1: `font-[Kollektif]  text-[30px] text-[#64b6a6] text-center md:text-[40px] pt-[100px] pb-[20px]`,
  green: `font-[Kollektif]  text-[#013a81]`,
  grey: `font-[Kollektif] `,
  geral: '',
  container: `flex flex-col w-[360px] md:w-[600px] z-200 relative justify-center`,
  div1: `pb-3`,
  div2: ` mx-auto  w-[360px] text-center flex flex-col space-y-2 `,
  input: `font-[Kollektif] text-[26px] mx-5 flex justify-between  h-[60px] items-center  bg-[#ffffff] rounded-full px-[30px] border-2 border-blue-100  `,
  outputbox: `font-[Kollektif] ml-[10px] text-[22px] max-w-[165px] overflow-hidden truncate  text-[#5BBAEB]`,
  inputbox: `font-[Kollektif] ml-[10px] max-w-[165px] overflow-hidden text-[22px]`,
  inputfield: `focus:outline-0 w-[165px] text-[#64B6AC] truncate   `,
  inputdesc: `text-[grey]`,
  btnconnect: `font-[Kollektif] animate-pulse text-lg rounded-full bg-[#64b6a6] hover:bg-[#5BBAEB] text-white font-bold p-4 px-[60px]  shadow-md`,
  btnmint: `animate-pulse font-[Kollektif] text-[1.7rem] bg-[#64B6AC] hover:bg-[#5BBAEB] text-white rounded-full mx-7 font-bold py-4  shadow-md`,
  btnlocked: `font-[Kollektif] text-[1.2rem] px-[10px] bg-[#c0bebd] text-white rounded-full mx-7 font-bold py-4  shadow-md`,
  asupply: ` text-[22px] text-center text-[#45c76e]`,
  polygon: `max-w-[200px] mx-auto`,
  modal: `mx-auto`,
  spinner: `mx-auto m-[20px] w-20 h-20 rounded-full animate-spin border-8 border-solid border-[#5BBAEB] border-t-transparent`,
  price: ` text-center mx-6 font-[Kollektif] text-[18px] pt-[15px] pb-[15px] text-[#7d818c]`,
}

// const chainID = 80001 // MUMBAI -> TROCAR QUANDO FOR PRA MAINNET
const chainID = 56 // BINANCE SMART CHAIN

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        56: "https://bsc-dataseed1.binance.org",
        // 80001: "https://matic-mumbai.chainstacklabs.com",
      },
    }
  }
};

const web3Modal = new Web3Modal({
  // network: "mumbai",
  network: "binance", // TROCAR quando for pra mainnet
  providerOptions
});


const networks = {
  mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Mumbai",
    nativeCurrency: {
      name: "Mumbai",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"]
  },
  binance: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Smart Chain",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: ["https://bsc-dataseed1.binance.org"],
    blockExplorerUrls: ["https://bscscan.com"]
  }
}

const contractAddress = "0x4DBe5Cf47C1c7fac6cAFAEe7B6F99786A5D30F21" // ADDRESS MUMBAI -> trocar pro address da BINANCE SMART CHAIN 
const rpcurlprovider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org") // RPC URL BINANCE SMART CHAIN
// const rpcurlprovider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/pkqdvzeiqirYql1sNmUAA3IIe0AL9_0U")
const contract = new ethers.Contract(contractAddress, abi.abi, rpcurlprovider)

const Minter = () => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [chainIdHEX, setChainIdHEX] = useState("")
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
  const [buyAmount, setBuyAmount] = useState(0.04)
  const [walletconnected, setWalletconnected] = useState(false)
  const [mintingmodal, setmintingmodal] = useState(false)
  const [dataloaded, setDataloaded] = useState(true)
  const [gender, setGender] = useState("Clique no bebê para apostar")
  const [bnbprice, setbnbprice] = useState()
  const [name, setName] = useState()
  const { t } = useTranslation();

  useEffect(() => {
    // const rpcurlprovider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org")
    // const contract = new ethers.Contract(address, abi, rpcurlprovider)

    console.log("price BNB", priceBNB())
  }, [])


  async function priceBNB() {
    axios.get('https://www.binance.com/api/v3/ticker/price?symbol=BNBBRL').then(resp => {
      setbnbprice(resp.data.price)
      console.log(resp.data.price);
    });
  }

  async function gasPriceEth() {
    try {
      const { data: { result: gasPrice } } = await axios.post('https://eth-mainnet.alchemyapi.io/v2/cLBYf3MjB7MAcWCsT_6OFc19nnoTEZMx', {
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        params: [],
        id: +new Date(),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
      return gasPrice;
    } catch (err) {
      console.error("Failed to retrieve gas price", err);
    }
  }

  const changeNetwork = async (library, chainId) => {
    if (chainId !== chainID) {
      await library.provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks.binance //TROCAR PRA .binance QUANDO FOR PRA MAINNET
            // ...networks.binance 
          }
        ]
      })
    }
  }


  const connectWallet = async () => {

    const provider = await web3Modal.connect();
    let library = new ethers.providers.Web3Provider(provider);
    const accounts = await library.listAccounts();
    let network = await library.getNetwork();
    let chainId = network.chainId

    setProvider(provider);
    setLibrary(library);
    setChainId(chainId);

    console.log("provider before", provider)
    console.log("library before", library)
    if (accounts) setAccount(accounts[0]);


    await changeNetwork(library, chainId)

    library = new ethers.providers.Web3Provider(provider);
    network = await library.getNetwork();
    chainId = network.chainId
    setLibrary(library);
    setChainId(chainId);
    setWalletconnected(true)
  };

  useEffect(() => {

    if (provider?.on) {

      const handleAccountsChanged = async () => {
        let library = new ethers.providers.Web3Provider(provider);
        const accounts = await library.listAccounts();
        console.log("accounts.length", accounts.length)
        if (accounts.length === 0) {
          setWalletconnected(false)
        }
      }

      const handleChainChanged = async () => {
        let library = new ethers.providers.Web3Provider(provider);
        let network = await library.getNetwork();
        let chainId = network.chainId
        if (chainId !== chainID) {
          setWalletconnected(false)
        } else { setWalletconnected(true) }
      };

      const handleDisconnect = async () => {
        console.log("disconnect", walletconnected)
        setWalletconnected(false)
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);




  useEffect(() => {
    if (chainId !== chainID) {
      setWalletconnected(false)
    } else { setWalletconnected(true) }
  }, [chainId])

  useEffect(() => {

    const handleProviderChanged = async () => {
      let library = new ethers.providers.Web3Provider(provider);
      let network = await library.getNetwork();
      let chainId = network.chainId
      if (chainId !== chainID) {
        setWalletconnected(false)
        changeNetwork(library, chainId)
      } else { setWalletconnected(true) }
    }

    handleProviderChanged()
  }, [provider, library])

  async function buy() {

    const signer = await library.getSigner()
    const signedcontract = await contract.connect(signer)
    const gasPrice = await gasPriceEth();
    const buytx = await signedcontract.placeBet(
      gender === "APOSTO que é ELE" ? 0 : 1
      , {
        value: ethers.utils.parseEther(buyAmount),
        gasLimit: '150000',
        gasPrice: gasPrice
      });
    setmintingmodal(true)
    await buytx.wait()
    setmintingmodal(false)

  }

  const handleInputChange = async (event) => {
    setBuyAmount(event.target.value)
  }

  const handleInputChangeName = async (event) => {
    setName(event.target.value)
  }

  function renderElement(object) {
    if (gender === "APOSTO que é ELA") {
      if (object === "betContainer") {
        return styles.bggirl
      }
      if (object === "text") {
        return styles.textgirl
      }
    } else if (gender === "APOSTO que é ELE") {
      if (object === "betContainer") {
        return styles.bgboy
      }
      if (object === "text") {
        return styles.textboy
      }
    } else {
      if (object === "betContainer") {
        return styles.bg
      }
      if (object === "text") {
        return styles.text
      }
    }
  }
  return (
    <>

      <div className={styles.bgrecy}  >

        <div className={styles.about1} >
          <span className={renderElement("text")}>{gender}</span>
        </div>

        <BoyGirl
          setGender={gender => setGender(gender)}
          gender={gender}
        />

        <div className={renderElement("betContainer")}>




          <div className={styles.container}>
            <div className={styles.div1}>
              <img src={images.bolao} alt="" className={styles.polygon}></img>
            </div>
            {!mintingmodal ?
              <div className={styles.div2}>

                {dataloaded ?
                  <div className={styles.btndiv} >
                    {walletconnected ? "" :
                      <button className={styles.btnconnect} onClick={() => { connectWallet() }}>CONECTAR CARTEIRA</button>
                    }
                  </div>
                  :
                  <div className={styles.spinner}> </div>
                }

                {walletconnected ?
                  <div className={styles.input}>
                    <div className={styles.inputdesc}>
                      NOME:
                    </div>
                    <div className={styles.inputbox}>
                      <input placeholder='NOME DO BÊBE' type="text" className={styles.inputfield} onChange={handleInputChangeName}></input>
                    </div>
                  </div>
                  :
                  ""
                }

                {walletconnected ?
                  <div className={styles.input}>
                    <div className={styles.inputdesc}>
                      VALOR:
                    </div>
                    <div className={styles.outputbox}>
                      <input placeholder='EM BNB' type="number" className={styles.inputfield} onChange={handleInputChange}></input>
                    </div>
                  </div>
                  :
                  ""
                }

                {walletconnected && gender != "Clique no bebê para apostar" ?
                  <button className={styles.btnmint} onClick={() => { buy() }}>APOSTAR</button>
                  :
                  ""
                }

                {walletconnected && gender === "Clique no bebê para apostar" ?
                  <button className={styles.btnlocked} >ESCOLHA O SEXO CLICANDO NO BEBÊ ACIMA</button>
                  :
                  ""
                }
              </div>

              :

              <div className={styles.modal}>
                <div className={styles.spinner}> </div>
                <span className={styles.price}>"TRANSACAO EM PROCESSO"...</span>
              </div>
            }

            {dataloaded ?
              <div className={styles.price}>
                <span className={styles.asupply}>{buyAmount}</span> BNB = &nbsp;
                R$ <span className={styles.asupply}>{(buyAmount * parseFloat(bnbprice)).toFixed(2)}</span>
              </div>
              :
              ""
            }
          </div>
        </div>

      </div>


      {/* //--------------------------------------- */}
    </>
  )
}

export default Minter