import './App.css'

import React from 'react'
import { ethers } from 'ethers'

// Import App components
import { OnboardingButton } from './components/Onboarding'

// Import contract address and artifact
import ContractArtifact from './contracts/HelloWorld.json'
import contractAddress from './contracts/helloworld-address.json'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      isConnected: false,
      contract: null,
      currentMessage: '',
      messageInterval: null
    }

    this.onConnected = this.onConnected.bind(this)
    this.fetchMessage = this.fetchMessage.bind(this)
  }

  componentWillUnmount () {
    if (this.state.messageInterval) {
      clearInterval(this.state.messageInterval)
    }
  }

  async onConnected () {
    // Use the MetaMask wallet as ethers provider
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // Create a JavaScript object from the Contract ABI, to interact
    // with the HelloWorld contract.
    const contract = new ethers.Contract(
      contractAddress.Contract,
      ContractArtifact.abi,
      provider.getSigner()
    )

    this.setState({
      isConnected: true,
      contract,
      // Start fetching the contract's message every 30 seconds
      messageInterval: setInterval(this.fetchMessage, 30000)
    })

    // Fetch the current message
    await this.fetchMessage()
  }

  async fetchMessage () {
    console.log('fetching current contract message')
    this.setState({ currentMessage: await this.state.contract.message() })
  }

  render () {
    const MessageComponent = <div>
      {this.state.currentMessage
        ? <p>📯📯📯 Current message: 📯📯📯<br />&ldquo;{this.state.currentMessage}&rdquo;</p>
        : <p>Loading message...</p>
      }
    </div>

    return (
      <div className="App">
        <h1>My Awesome dApp</h1>
        <h2>HelloWorld on Avalanche</h2>

        <OnboardingButton onConnected={this.onConnected} />

        {this.state.isConnected && MessageComponent}
      </div>
    )
  }
}

export default App
