# TaskFlow - Modern Task Management Application

TaskFlow is a modern, responsive web application for efficient task management. Built with Next.js and React, it provides a clean and intuitive interface for creating, organizing, and tracking tasks.

## Features

- **User Authentication**: Secure login system with session management
- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Task Organization**: Filter tasks by status (all, pending, completed) and priority
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive interface built with Tailwind CSS and shadcn/ui components
- **Data Persistence**: Tasks are stored in localStorage for persistence between sessions
- **Priority Levels**: Assign low, medium, or high priority to tasks
- **Pagination**: Efficiently navigate through large task lists

## Technologies Used

- **Frontend**:
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Lucide React icons
  - React Hook Form with Zod validation

- **State Management**:
  - React Context API
  - Local Storage for data persistence

- **Development Tools**:
  - ESLint
  - TypeScript
  - Next.js App Router

## Getting Started

### Prerequisites

- Node.js (version 18.18.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:ImSandeepyadav/task-manager.git
   cd task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Login Credentials

For demo purposes, use the following credentials:
- Username: admin
- Password: password

## Project Structure

```
task-manager/
├── app/                  # Next.js App Router
│   ├── dashboard/        # Dashboard pages
│   ├── login/            # Authentication pages
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── auth/             # Authentication components
│   ├── common/           # Common UI components
│   ├── dashboard/        # Dashboard components
│   ├── tasks/            # Task-related components
│   └── ui/               # UI components from shadcn/ui
├── lib/                  # Utility functions and types
│   ├── context/          # React context providers
│   └── types.ts          # TypeScript type definitions
├── public/               # Static assets
└── styles/               # Additional styles
```

## Usage

1. **Login**: Use the provided credentials to log in
2. **Dashboard**: View all your tasks with filtering options
3. **Create Task**: Click the "+" button to create a new task
4. **Edit Task**: Click on a task card to view details and edit
5. **Delete Task**: Use the delete button on a task card to remove it
6. **Mark Complete**: Toggle the checkbox to mark tasks as complete

## Future Enhancements

- User registration and profile management
- Task categories and tags
- Due dates and reminders
- Team collaboration features
- Dark/light theme toggle
- Mobile application

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)