---
title: Allow asset owners to change owner key
description: Allowing asset owners to change the owner key improves security and allows a best-practice of rotating the keys to minimize risk of leaking keys
author: Mat Geist (@mat-if)
discussion: https://discourse.ironfish.network/t/proposal-allow-asset-owners-to-change-owner-key/43
status: Idea
category: Core
created: 2023-07-19
---

## Abstract

Add a new, optional field to the Mint Description of Transactions called, `transfer_ownership_to` which will take a public address. When this is provided, all future mints must be done by the new key, and can no longer be done by the current key.

This would require nodes to store the current asset owner as the current owner will not be provided on the Mint Description. All mint description proofs must utilize the current owner as a public input to the proof for verification.

## Motivation

Iron Fish currently lacks the ability for asset owners to manage their assets in any way, besides minting tokens. Asset owners need to be able to rotate the key used to manage the token.

## Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 and RFC 8174.

### Definitions

- Asset Creator: This is what is currently known as the asset owner. This is the public address of the key used to initially mint an asset. This MUST NOT change as it is used to derive the unique asset identifier.
- Asset Owner: The current assigned owner of an asset. The current owner MAY transfer ownership via the mint description.
- Freezing an asset: Make it impossible to mint any more value of an asset. Has no effect on the circulation or transfer of existing value of an asset.
- `transferOwnershipTo`: New, optional public address field on `MintDescription` to transfer ownership from the existing key, to the key associated with the public address provided.

Once implemented, clients MUST use the owner public address instead of the creator public address to verify mint description proofs.

Asset owners MAY provide a public address on an optional field, `transferOwnershipTo`, on the `MintDescription`. When this field is included, it signals to the network that they are transferring ownership from the existing public address to the new public address provided. Any future mints of this asset MUST have a valid proof using the private key associated with the new public address.

Clients MUST record the public address provided in `transferOwnershipTo`. The purpose of recording this public address is to allow verifying future mints of this asset, as the `MintDescription` will not contain the owner. This is done by providing the owner public address as a public input to the `MintDescription`'s proof.

## Rationale

By allowing asset owners to transfer ownership, they gain the ability to rotate their keys, which is good security hygiene. This approach serves as a relatively simple way to enable this security. It allows Iron Fish to provide this much needed utility, without a large, complex change. There are other approaches which would require larger changes, which are not ideal for the network currently in such early stages.

## Backwards Compatibility 

This change would be a breaking change since it changes the mint description of a transaction, as well as changing the logic for how a mint proof is verified. Older clients would validate mints using the asset creator, while updated clients would validate mints using the current asset owner, leading to a fork in the chain. Old clients also would not be able to deserialize the new transaction messages coming in on the peer network, causing them to ban these newer clients, forking the network.

Clients would need to maintain the ability to properly verify mints prior to the activation of this new feature, without validating any mint descriptions containing the new `transferOwnershipTo` field. This will require some logic changes to only attempt deserializing this new field after the activation, or maintaining versioned serializers.

## Security and Privacy Considerations

Since the creator's public address was already public information, as all information on a mint description is, this does not require any changes to the proofs, trusted setup, or any privacy-related features of Iron Fish.

A possible risk would be an implementation or user using the private key instead of the public address, which would effectively destroy that asset, since everyone watching the blockchain would now be able to create valid mints using this leaked key.

## Reference Implementation

A reference implementation is underway on this branch: https://github.com/iron-fish/ironfish/tree/asset-security. As of the time of this posting, it is functionally incomplete, but should be progressing quickly as the changes are fairly minor.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/).
