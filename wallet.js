import { CdpAgentkitWrapper } from 'cdp_langchain.utils';

function exportWalletData(cdp) {
    return cdp.export_wallet();
}

function importWalletData(walletData) {
    const values = { "cdp_wallet_data": walletData };
    return new CdpAgentkitWrapper(values);
}
