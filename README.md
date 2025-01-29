**frontend/README.md**
```markdown
# Frontend Application

[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-purple)](https://vitejs.dev/)

Frontend for the multi-page application with real-time dashboard and responsive design.

## Features

- Responsive navigation
- Real-time dashboard with WebSocket
- User management interface
- Contact form
- Modern UI with CSS Modules
- Vercel deployment optimized

## Tech Stack

- React 18
- React Router 6
- Axios
- WebSocket API
- CSS Modules
- Vite

## Getting Started

### Prerequisites

- Node.js 18.x
- npm 9.x

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/repo-name.git
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
VITE_API_URL=https://your-backend-app.onrender.com/api
VITE_WS_URL=wss://your-backend-app.onrender.com/api/notifications
```

### Running the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Route components
│   ├── services/      # API and WebSocket services
│   ├── App.jsx        # Main application
│   └── main.jsx       # Entry point
```

## Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `VITE_API_URL`
   - `VITE_WS_URL`
3. Deploy with default settings (Vite will be auto-detected)

## Environment Variables

| Variable         | Description                     |
|------------------|---------------------------------|
| VITE_API_URL     | Backend API base URL            |
| VITE_WS_URL      | WebSocket notifications URL     |

## Available Scripts

- `dev`: Start development server
- `build`: Create production build
- `preview`: Locally preview production build

## Styling

- CSS Modules for component-scoped styles
- Mobile-first responsive design
- CSS Variables for theme consistency
- Modern transitions and animations

## License

MIT
```