
A full-stack Web3 application for validating student and civil applications using AI-powered document analysis integrated with the Aptos blockchain.

## 🚀 Features

### Frontend
- **User Dashboard**: Track applications, view certificates, and monitor status
- **Validator Dashboard**: DAO voting, validation review, and registration
- **Document Validator**: Upload, AI analysis, and blockchain submission
- **Appeal System**: Submit appeals for rejected applications with evidence
- **Staking Dashboard**: Stake APT tokens, earn rewards, and view performance
- **AI Models Page**: Live LLM demo with GPT-4o Mini integration
- **Wallet Integration**: Support for Petra, Martian, and Fewcha wallets

### Backend
- AI microservices (Python FastAPI)
- Document storage with IPFS/Arweave simulation
- Validation pipeline with aggregated AI model results
- Health checks and error handling

### Blockchain (Aptos Move)
- Smart contracts for validator registration and staking
- NFT certificate minting for approved applications
- Consensus mechanisms with stake-weighted voting
- Event emission for transparency

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite
- Tailwind CSS
- Radix UI components
- TanStack Query

### Backend
- Python FastAPI
- AI Models:
  - Microsoft's LayoutLMv3 (document structure analysis)
  - Facebook's DINOv2 (forgery detection)
  - Sentence Transformers (NLP eligibility)
  - Tesseract OCR (text extraction)

### Blockchain
- Aptos Move smart contracts
- Aptos SDK
- IPFS/Arweave for decentralized storage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Aptos CLI
- Docker (for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/educhain-validator-suite.git
   cd educhain-validator-suite
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Update the .env file with your configuration
   ```

### Running Locally

1. Start the frontend:
   ```bash
   npm run dev
   ```

2. Start the backend:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

3. Access the application at `http://localhost:3000`

## 📚 Documentation

- [Backend Architecture](./docs/backend-architecture.md)
- [Smart Contract Documentation](./contracts/README.md)
- [Certificate Setup](./CERTIFICATE_SETUP.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All the amazing open-source projects that made this possible
- The Aptos community for their support
- Our contributors and testers"



