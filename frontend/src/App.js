import './App.css';

import React from 'react';
import { ethers } from 'ethers';

import { OnboardingButton } from './components/Onboarding';
import { UpdateForm } from './components/UpdateForm';

//Import contract address and artifact
import ContractArtifact from './contracts/HelloWorld.json';
import contractAddress from './contracts/helloworld-address.json';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            isConnected: false,
            contract: null,
            currentMessage: '',
            messageInterval: null,
            updateTransactionHash: null,
            transactionError: null,
        }

        this.onConnected = this.onConnected.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.fetchMessage = this.fetchMessage.bind(this);
    }

    componentWillUnmount() {
        if (this.state.messageInterval) {
            clearInterval(this.state.messageInterval);
        }
    }

    async onConnected() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            contractAddress.Contract,
            ContractArtifact.abi,
            provider.getSigner()
        );

        this.setState({
            isConnected: true,
            contract,
            messageInterval: setInterval(this.fetchMessage, 30000)
        });
        this.fetchMessage();
    }

    async fetchMessage() {
        this.setState({ currentMessage: await this.state.contract.message() });
    }

    async updateMessage(newMessage) {
        console.log('Sending new message', newMessage);
        this.setState({ transactionError: null });

        try {
            const tx = await this.state.contract.update(newMessage)
            console.log('Created transaction', tx)
            this.setState({ updateTransactionHash: tx.hash });

            const receipt = await tx.wait();
            console.log('Transaction successfull', receipt);

            if (receipt.status === 0) {
                // Receipt status equals to 0 indicates an error.
                throw new Error('Transaction failed');
            }

            setTimeout(this.fetchMessage, 1000);
        } catch (error) {
            console.error(error);
            this.setState({ transactionError: error });
        } finally {
            this.setState({ updateTransactionHash: null })
        }
    }

    render() {
        const messageComponent = this.state.currentMessage
            ? <p>I'm saying 💬<br />{this.state.currentMessage}</p>
            : <p>Loading message...</p>

        return (
            <div className="App">
                <h1>My Awesome dApp</h1>
                <h2>HelloWorld dApp on Avalanche</h2>
                <OnboardingButton onConnected={this.onConnected} />
                {this.state.isConnected &&
                    <div>
                        <div>
                            {messageComponent}
                        </div>
                        <UpdateForm
                            currentMessage={this.state.currentMessage}
                            updateTransactionHash={this.state.updateTransactionHash}
                            updateMessage={this.updateMessage}
                        />
                    </div>
                }
                {this.state.transactionError &&
                    <div>
                        Transaction Error: {this.state.transactionError.code} {this.state.transactionError.message}
                    </div>
                }
            </div>
        );
    }
}

export default App;
