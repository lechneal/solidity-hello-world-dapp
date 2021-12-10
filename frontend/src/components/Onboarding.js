import React from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'

// eslint-disable-next-line no-unused-vars
const AVALANCHE_MAINNET_PARAMS = {
  chainId: '0xA86A',
  chainName: 'Avalanche Mainnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io/']
}
const AVALANCHE_TESTNET_PARAMS = {
  chainId: '0xA869',
  chainName: 'Avalanche Testnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/']
}
const AVALANCHE_NETWORK_PARAMS = AVALANCHE_TESTNET_PARAMS

const isAvalancheChain = (chainId) => (
  chainId &&
  chainId.toLowerCase() === AVALANCHE_NETWORK_PARAMS.chainId.toLowerCase()
)

export class OnboardingButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      accounts: [],
      chainId: null,
      onboarding: new MetaMaskOnboarding()
    }

    this.connectMetaMask = this.connectMetaMask.bind(this)
    this.switchToAvalancheChain = this.switchToAvalancheChain.bind(this)
  }

  componentDidMount () {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      this.connectMetaMask()
      window.ethereum.on('accountsChanged', accounts => this.setState({ accounts }))
      window.ethereum.on('chainChanged', () => window.location.reload())
      window.ethereum.on('connect', (connectInfo) => {
        const chainId = connectInfo.chainId
        this.setState({ chainId })
        if (isAvalancheChain(chainId)) {
          this.props.onConnected()
        }
      })
    }
  }

  connectMetaMask () {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(accounts => this.setState({ accounts }))
  }

  switchToAvalancheChain () {
    window.ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [AVALANCHE_TESTNET_PARAMS]
      })
  }

  render () {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (this.state.accounts.length > 0) {
        this.state.onboarding.stopOnboarding()
      }
    }

    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      return (
        <div>
          <div>To run this dApp you need the MetaMask Wallet installed.</div>
          <button onClick={this.state.onboarding.startOnboarding}>
            Install MetaMask
          </button>
        </div>
      )
    } else if (this.state.accounts.length === 0) {
      return (
        <div>
          <div>To run this dApp you need to connect your MetaMask Wallet.</div>
          <button onClick={this.connectMetaMask}>
            Connect your Wallet
          </button>
        </div>
      )
    } else if (!isAvalancheChain(this.state.chainId)) {
      return (
        <div>
          <div>MetaMask Wallet connected!</div>
          <div>Chain: {this.state.chainId}</div>
          <div>Account: {this.state.accounts[0]}</div>
          <div>To run this dApp you need to switch to the {AVALANCHE_NETWORK_PARAMS.chainName} chain</div>
          <button onClick={this.switchToAvalancheChain}>
            Switch to the {AVALANCHE_NETWORK_PARAMS.chainName} chain
          </button>
        </div>
      )
    } else {
      return <div>
        <div>MetaMask Wallet connected!</div>
        <div>Chain: {this.state.chainId}</div>
        <div>Account: {this.state.accounts[0]}</div>
      </div>
    }
  }
}
