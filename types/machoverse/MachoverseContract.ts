import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumberish,
} from "ethers";
import { EthersContractContextV5 } from "ethereum-abi-types-generator";

export type ContractContext = EthersContractContextV5<
  MachoverseContract,
  MachoverseContractMethodNames,
  MachoverseContractEventsContext,
  MachoverseContractEvents
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
export type MachoverseContractEvents = "MintClaimed";
export interface MachoverseContractEventsContext {
  MintClaimed(...parameters: any): EventFilter;
}
export type MachoverseContractMethodNames =
  | "new"
  | "info"
  | "mintTime"
  | "val"
  | "mintTokens"
  | "viewBalance"
  | "deleteAccountNonces";
export interface MintClaimedEventEmittedResponse {
  account: string;
  nonce: BigNumberish;
}
export interface InfoResponse {
  minter: string;
  0: string;
  validTill: BigNumberish;
  1: BigNumberish;
  nonce: BigNumberish;
  2: BigNumberish;
  length: 3;
}
export interface MachoverseContract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _verificationAddress Type: address, Indexed: false
   */
  "new"(
    _verificationAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  info(overrides?: ContractCallOverrides): Promise<InfoResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  mintTime(overrides?: ContractCallOverrides): Promise<BigNumberish>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  val(overrides?: ContractCallOverrides): Promise<BigNumberish>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param message Type: bytes, Indexed: false
   * @param signature Type: bytes, Indexed: false
   */
  mintTokens(
    message: Arrayish,
    signature: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  viewBalance(
    account: string,
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumberish>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param numNonces Type: uint256, Indexed: false
   */
  deleteAccountNonces(
    account: string,
    numNonces: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
