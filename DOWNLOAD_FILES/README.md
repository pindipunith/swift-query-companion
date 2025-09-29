# Task Dashboard - Frontend Developer Assignment

A modern, scalable web application with authentication and task management dashboard built with React, TypeScript, and Tailwind CSS.

## Assignment by punithpindi

## 🚀 Features

### Authentication System
- **User Registration & Login** with client-side validation
- **Session Management** with persistent login state
- **Protected Routes** requiring authentication
- **Form Validation** with error handling and feedback
- **Demo Account** for quick testing (demo@example.com / demo123)

### Task Management Dashboard
- **Full CRUD Operations** - Create, Read, Update, Delete tasks
- **Task Priorities** - Low, Medium, High priority levels
- **Search & Filter** - Filter by priority, status, and search by title/description
- **Statistics Overview** - Visual cards showing task metrics
- **Responsive Design** - Works seamlessly on desktop and mobile

### Security & Best Practices
- **Client-side validation** for all forms
- **Input sanitization** and error handling
- **Structured code** for easy scaling and maintenance
- **TypeScript** for type safety and better development experience

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React hooks with localStorage persistence
- **Validation**: Custom validation with toast notifications

## 📦 Installation & Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd task-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── AuthCard.tsx     # Authentication card wrapper
│   ├── LoginForm.tsx    # Login form component
│   ├── RegisterForm.tsx # Registration form component
│   ├── Dashboard.tsx    # Main dashboard component
│   └── TaskDialog.tsx   # Task creation/editing modal
├── pages/
│   ├── Auth.tsx         # Authentication page
│   ├── Index.tsx        # Main application entry point
│   └── NotFound.tsx     # 404 error page
├── hooks/
│   ├── use-toast.ts     # Toast notification hook
│   └── use-mobile.tsx   # Mobile breakpoint detection
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # App wrapper with routing
├── main.tsx             # Application entry point
└── index.css            # Global styles and design system
```

## 🎨 Design System

The application features a modern design system with:
- **Color Palette**: Professional blue/purple gradient scheme
- **Typography**: Clean, readable font hierarchy
- **Components**: Consistent spacing, shadows, and animations
- **Responsive Design**: Mobile-first approach with breakpoints
- **Dark Mode Ready**: Complete dark theme support
- **Accessibility**: ARIA labels and keyboard navigation

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Demo Account

For quick testing, use these credentials:
- **Email**: demo@example.com
- **Password**: demo123

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service of choice:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

## 🔄 Scaling for Production

To scale this application for production, consider:

### Backend Integration
- Replace localStorage with a proper database (PostgreSQL, MongoDB)
- Implement JWT-based authentication with refresh tokens
- Add server-side validation and sanitization
- Create RESTful API endpoints for all operations

### Security Enhancements
- Password hashing with bcrypt
- Rate limiting for API endpoints
- HTTPS enforcement
- CORS configuration
- Input validation middleware

### Performance Optimizations
- Code splitting and lazy loading
- Image optimization
- Caching strategies
- CDN integration
- Database indexing

### Additional Features
- Real-time updates with WebSockets
- Email notifications
- File attachments for tasks
- Team collaboration features
- Advanced filtering and sorting
- Data export functionality

## 🧪 Testing

The current implementation focuses on core functionality. For production, add:
- Unit tests with Jest and React Testing Library
- Integration tests for API endpoints
- End-to-end tests with Cypress or Playwright
- Performance testing

## 📄 License

This project is created as part of a Frontend Developer Intern assignment.

## 👨‍💻 Developer

Created by **punithpindi** as part of the Frontend Developer Intern assignment.

---

*This application demonstrates modern React development practices, clean architecture, and scalable code structure suitable for production environments.*