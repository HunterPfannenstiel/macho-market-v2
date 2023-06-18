import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumberish,
} from "ethers";
import { EthersContractContextV5 } from "ethereum-abi-types-generator";

export type ContractContext = EthersContractContextV5<
  MachoFaucetContract,
  MachoFaucetContractMethodNames,
  MachoFaucetContractEventsContext,
  MachoFaucetContractEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumberish | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumberish | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type MachoFaucetContractEvents = undefined;
export interface MachoFaucetContractEventsContext {}
export type MachoFaucetContractMethodNames =
  | "new"
  | "mintMachoUSD"
  | "mintMachoMagic"
  | "mintMachoCoin";
export interface MachoFaucetContract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _machoUSD Type: address, Indexed: false
   * @param _machoMagic Type: address, Indexed: false
   * @param _machoCoin Type: address, Indexed: false
   */
  "new"(
    _machoUSD: string,
    _machoMagic: string,
    _machoCoin: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  mintMachoUSD(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  mintMachoMagic(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  mintMachoCoin(
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
