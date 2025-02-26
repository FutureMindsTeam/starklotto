# Starklotto Changelog

All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](https://semver.org/) and follows the conventions of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

**Project Description**  
Starklotto is a decentralized lottery application built on the StarkNet blockchain, prioritizing transparency, fairness, and security through verifiable on-chain randomness and trustless participation.

---

## [Unreleased]

### Added
- **Smart Contract:** Implemented a `claimPrize()` function with gas optimization for users redeeming winnings (closes [Issue #12]).
- **Frontend:** Added a "Transaction History" tab to the user dashboard for better auditability.

### Changed
- **UI:** Migrated from React v18 to v19 to leverage new StarkNet API integrations.
- **Smart Contract:** Refactored `drawNumbers()` to use Cairo 1.0 for improved execution efficiency.

### Deprecated
- **API:** Marked the `/v1/draw` endpoint as deprecated (will be removed in v2.0.0).

### Removed
- **Testing:** Removed testnet deployment scripts for deprecated Goerli network.

### Fixed
- **Bug:** Resolved edge case where users could submit duplicate entries in rapid succession (fixes [Issue #34]).

### Security
- **Audit:** Conducted third-party security audit of core smart contracts (results pending).
- **Middleware:** Blocked malicious IP ranges detected in recent scans.

---

## [1.0.0] - 2025-02-15

### Added
- Initial release with core functionality:
  - Lottery participation via StarkNet account abstraction
  - On-chain random number generation (RNG) using Chainlink VRF
  - Prize distribution smart contract

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None

---

## Contribution Guidelines

- **How to contribute:** Follow the [Contributor Guidelines](https://github.com/FutureMindsTeam/starklotto/blob/main/CONTRIBUTING.md).
- **Unreleased changes:** Add entries under the `[Unreleased]` section using the `Added/Changed/Deprecated/Removed/Fixed/Security` categories.
- **Versioning:** When releasing, move unreleased changes to a new version header formatted as `[X.Y.Z] - YYYY-MM-DD`.

---

## Notes

- This file is auto-formatted using [markdownlint](https://github.com/DavidAnson/markdownlint) to maintain consistency.
- For breaking changes, always add a `Deprecated` entry first before removal in subsequent releases.