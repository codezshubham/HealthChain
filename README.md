# 🏥 HealthChain: Decentralized Healthcare Records Management

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)
![Solidity](https://img.shields.io/badge/Solidity-Smart_Contracts-lightgrey.svg)
![IPFS](https://img.shields.io/badge/IPFS-Storage-00bc8c.svg)

HealthChain is a secure, blockchain-powered Electronic Health Record (EHR) management system. It aims to put patients back in control of their medical data while ensuring that doctors, healthcare providers, and government agencies have verifiable, role-based access for treatment and anonymized analytics. 

By leveraging **Ethereum smart contracts** and **IPFS decentralized storage**, HealthChain prevents unauthorized data tampering, guarantees auditability, and enforces high privacy standards.

---

## ✨ Key Features

- 🔐 **Role-Based Access Control System**: Dedicated portals & functionality for **Patients**, **Doctors**, and **Government Bodies**.
- 🛡 **Data Ownership & Sharing**: Patients fully own their medical history and cryptographically authorize access to selected doctors.
- 📦 **Decentralized Storage (IPFS)**: Actual medical records and files are encrypted and stored off-chain on IPFS, preventing bloat on the blockchain.
- ⛓ **Immutable Audit Logs**: Record creations, updates, and access grants are mapped strictly to the blockchain (`AccessControl.sol`, `MedicalRecord.sol`).
- 📈 **Government Analytics**: Health officials have anonymized visibility into broad healthcare metrics to detect outbreaks or track health trends without compromising PII.

---

## 🛠 Tech Stack

**Client-Side:**
- Next.js (App Router)
- React 19
- Tailwind CSS v4
- Lucide Icons & Recharts (Data Visualization)

**Backend / API:**
- Node.js + Express
- MongoDB / Mongoose
- JSON Web Tokens (JWT) for conventional session auth

**Blockchain & Storage:**
- Hardhat (Ethereum development framework)
- Solidity (Smart Contracts)
- Ethers.js
- IPFS (Off-chain file storage via custom service implementation)

---

## 📂 Project Structure

```text
healthcare/
├── blockchain/        # Smart Contracts (AccessControl.sol, MedicalRecord.sol), Hardhat config & Scripts
├── client/            # Next.js Frontend Application (Pages, UI Components, Layouts)
├── server/            # Node.js/Express Backend (Controllers, Middleware, Routes, Mongoose models)
├── ipfs/              # InterPlanetary File System connection config & utilities
├── shared/            # Shared TypeScript types, constants, ABI files, and generic helpers
└── package.json       # Root dependencies and unified scripts
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- [MetaMask](https://metamask.io/) extension installed in your browser

### 1. Clone the repository

```bash
git clone https://github.com/codezshubham/HealthChain.git
cd healthcare
```

### 2. Install dependencies

Install the global module dependencies (which include both client & server tooling):

```bash
npm install
```

### 3. Environment Setup

You will need an `.env` file at the root (and potentially within specific directories depending on modular config) to support the database, server, and web3 endpoints. Create an `.env` file with the necessary variables:

```env
# Server & DB variables
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthchain
JWT_SECRET=your_jwt_secret_here

# Web3 & Storage variables
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
IPFS_GATEWAY_URL=...
```

### 4. Smart Contract Deployment (Local Testnet)

In a new terminal window, start a local Hardhat node:
```bash
npx hardhat node
```

In another terminal, deploy the smart contracts to your local network:
```bash
npx ts-node blockchain/scripts/deploy.ts
```
*(Tip: Note the contract addresses printed in the console and map them to your frontend constants mapping if necessary).*

### 5. Running the Services

To start the **Next.js frontend**:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To start the **Express backend**, you can run the server side build or start script via ts-node (e.g. `npx ts-node server/server.ts` or as configured in scripts).

---

## 🧬 System Architecture workflow

1. **Patient Workflow**: A patient logs in, views their dashboard, examines their history, and shares a cryptographic permission with selected doctors.
2. **Doctor Workflow**: The doctor accesses allowed files, submits new clinical examinations or prescriptions, and pins the resulting document to IPFS while referencing the IPFS CID seamlessly.
3. **Gov/Stats Workflow**: A specialized layer anonymizes statistics from the backend mapping (e.g., condition occurrences) and feeds this into a rich statistical dashboard.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](https://github.com/codezshubham/HealthChain/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open-source and available under the MIT License.
