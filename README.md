# FarmAI

Smart Farmer Buddy is an AI-powered full-stack web application designed to assist Indian farmers with real-time agricultural advice. It provides personalized recommendations using AI and IoT technologies and works even in low-connectivity areas with offline support and multilingual voice commands.

## Features

- 📸 Plant Disease Diagnosis with ML
- 🌱 Crop Management & Advice
- 🌤️ Weather Forecasts
- 💰 Market Price Updates
- 👥 Farmer Community
- 📱 Mobile-First Design
- 🌍 Multilingual Support

## Tech Stack

- Frontend: React.js + TypeScript
- Styling: Tailwind CSS
- Routing: React Router
- State Management: React Context + Hooks
- Backend: Firebase (Auth, Firestore, Storage)
- ML: TensorFlow.js
- Internationalization: i18next
- Offline Support: IndexedDB

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/plantix-clone.git
cd plantix-clone
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── features/      # Feature-specific components
│   └── layout/        # Layout components
├── config/            # Configuration files
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # API and service integrations
├── styles/           # Global styles and Tailwind config
└── utils/            # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Original Plantix app by PEAT Digital GmbH
- Icons from Heroicons
- UI components from Headless UI 