import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';

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
const AVALANCHE_NETWORK_PARAMS = AVALANCHE_TESTNET_PARAMS;

export function OnboardingButton() {
    const [accounts, setAccounts] = React.useState([]);
    const [chainId, setChainId] = React.useState();
    const [onboarding] = React.useState(new MetaMaskOnboarding());

    React.useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if (accounts.length > 0) {
                onboarding.stopOnboarding();
            }
        }
    }, [accounts, onboarding]);

    const connectMetaMask = () => {
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(setAccounts);
    };
    const switchToAvalancheChain = () => {
        window.ethereum
            .request({
                method: 'wallet_addEthereumChain',
                params: [AVALANCHE_TESTNET_PARAMS]
            })
    };

    React.useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum.on('accountsChanged', setAccounts);
            window.ethereum.on('chainChanged', () => window.location.reload());
            window.ethereum.on('connect', (connectInfo) => { console.log(connectInfo); setChainId(connectInfo.chainId) });
            connectMetaMask();
        }
    }, [chainId]);

    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
        return (
            <div>
                <div>To run this dApp you need the MetaMask Wallet installed.</div>
                <button onClick={onboarding.startOnboarding}>
                    Install MetaMask
                </button>
            </div>
        );
    } else if (accounts.length === 0) {
        return (
            <div>
                <div>To run this dApp you need to connect your MetaMask Wallet.</div>
                <button onClick={connectMetaMask}>
                    Connect your Wallet
                </button>
            </div>
        );
    }
    else if (chainId === undefined || chainId.toLowerCase() !== AVALANCHE_NETWORK_PARAMS.chainId.toLowerCase()) {
        return (
            <div>
                <div>MetaMask Wallet connected!</div>
                <div>Chain: {chainId}</div>
                <div>Account: {accounts[0]}</div>
                <div>To run this dApp you need to switch to the {AVALANCHE_NETWORK_PARAMS.chainName} chain</div>
                <button onClick={switchToAvalancheChain}>
                    Switch to the {AVALANCHE_NETWORK_PARAMS.chainName} chain
                </button>
            </div>
        );
    } else {
        return <div>
            <div>MetaMask Wallet connected!</div>
            <div>Chain: {chainId}</div>
            <div>Account: {accounts[0]}</div>
        </div>;
    }
}