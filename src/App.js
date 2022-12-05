import { useState, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import useEagerConnect from './hooks/useEagerConnect';
import { useWeb3React } from '@web3-react/core';
import useAuth from './hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import { useTotalSupply, useMaxSupply, usePrice } from './hooks/dataFetcher';
import useBuy from './hooks/useBuy';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  useEagerConnect();
  const { buy } = useBuy();


  const price = 1250;
  const { login, logout } = useAuth();
  const { account } = useWeb3React();

  const [num, setNum] = useState(0);




  const connectMetamask = () => {
    localStorage.setItem('connectorId', 'injected');
    if (account) {
      logout();
    } else {
      login('injected');
    }
  };


  const Disconnect = async () => {
    logout();
    localStorage.setItem('connectorId', '');
  };


  const Buy = useCallback(async (e) => {
    e.preventDefault();
    if (!account) {
      toast.error('Please Connect Your Wallet');
      return;
    }


    try {
      await buy(num, price)
    } catch (error) {
      console.log(error)
    }
  }, [buy])



  return (
    <>
      <ToastContainer />

      <div className="root">
        {/* <div className="lefttree">
          <img
            className="img-fluid leftimg"
            src={require("./assets/img/left.svg").default}
            alt=""
          />
        </div>
        <div className="righttree">
          <img
            className="img-fluid rightimg"
            src={require("./assets/img/right.png").default}
            alt=""
          />
        </div>
        <div className="birdsdiv">
          <img
            className="img-fluid birdimg"
            src={require("./assets/img/bird.png").default}
            alt=""
          />
        </div> */}
        <Container>
          <div className="cus-navb mt-3 d-flex justify-content-between align-items-center">
            <div className="logo">
              <img
                className="img-fluid logo-img"
                src={require("./assets/img/logo.svg").default}
                alt=""
              />
            </div>
            <div className="con-btn">
              {
                !account ?
                  <button className="cusbtn" onClick={connectMetamask}>Connect Wallet</button> :
                  <button className="cusbtn" onClick={Disconnect}>Disconnect</button>
              }
            </div>
          </div>

          <Row className="mt-5 pt-5">
            <Col
              className=" d-flex justify-content-center align-items-center "
              lg="12"
            >
              <div className="">
                <div className="text-center mt-4">
                <h1 className="title">TradeFI Presale</h1>
                </div>
                <br></br>
                <div className="text-center mt-4">
                <h1 className="subtitle">Introduce the amount of tokens you want to buy</h1>
                </div>
                <br></br>
    
                <div className="button-mint d-flex justify-content-center">
                  {/* <button className="minus mr-3" onClick={minus}>
                    -
                  </button> */}
                  <div className="display-number d-flex justify-content-center align-items-center">
                    <input type="text" value={num} onChange={(e) => setNum(e.target.value)}></input>
                  </div>
                  {/* <button className="plus ml-3" onClick={plus}>
                    <img
                      className="img-fluid opensealogo"
                      // src={require("./assets/img/plusimg.png").default}
                      alt=""
                    /> 
                    +
                  </button>  */}
                </div>
                <div className="mintnowdiv text-center mt-5">
                  <button className="cusbtn" onClick={Buy}>Buy Now</button>
                </div>
                <div className="text-center mt-4">
                  {/* <h3 className="subtitle"> {supply} / {supplyMax}</h3> */}
                </div>
                <div className="text-center mt-4">
                  <h3 className="subtitle">Payments made in ETH</h3>
                  <br></br>
                  <h3 className="subtitle">1 $TFI = 1 USD</h3>
                </div>
                <div className="text-center mt-5">
                <details class="dropdown">
    <summary role="button">
      <a class="button">More details</a>
    </summary>
    <ul>
      <li><a href="https://www.tradefiswap.com/">Website</a></li>
      <li><a href="https://tradefi.gitbook.io/tradefi-the-future-of-trading/getting-started/what-is-tradefi">Docs</a></li>
      <li><a href="https://app.tradefiswap.com/#/trade">dAPP</a></li>
      <li><a href="https://twitter.com/tradefi_swap">Twitter</a></li>
      <li><a href="https://t.me/tradefichannel">Telegram</a></li>
  </ul>
</details>
           
                  
                </div>
              </div>
            </Col>
            {/* <Col lg="1" className="mbr">
              <div className="right-img">
                <h5 className="subtitle">TradeFI</h5>
                
              </div>
            </Col> */}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
