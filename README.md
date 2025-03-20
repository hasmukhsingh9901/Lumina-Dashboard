# Dashboard Application

A fully functional, dynamic dashboard application built with  React, and Tailwind CSS. This project includes authentication, API data fetching, and a responsive user interface.

## 📋 Features

- **User Authentication**
  - Login/Logout functionality
  - JWT token-based authentication
  - Form validation (email format, password length)
  - Protected routes

- **Dashboard**
  - Responsive layout
  - Data visualization with tables
  - API data fetching
  - Search and filter functionality
  - Pagination

- **UI Components**
  - Reusable React components
  - Tailwind CSS for styling
  - Mobile-friendly design
  - Loading states and error handling

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/username/abc.git
cd project-name
```

2. Install dependencies
```bash
npm install

```

3. Run the development server
```bash
npm run dev

```

## 🔑 Authentication

The application uses JWT tokens for authentication:
- Tokens are stored in localStorage
- Protected routes redirect to login if no token is found
- API requests include authentication headers

Default credentials for testing:
- Email: user@example.com
- Password: password123

## 📊 API Integration

The dashboard fetches data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts) and includes:
- Client-side filtering
- Pagination (5 posts per page)
- Error handling for failed requests



## 💻 Technology Stack

- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Authentication**: JWT (jsonwebtoken)
- **API**: REST API integration with fetch

## 🔍 Usage

1. **Login Screen**
   - Enter your credentials (email and password)
   - Form validation will check for proper email format and password length

2. **Dashboard**
   - View data in a paginated table
   - Use the search box to filter by title or ID
   - Navigate between pages using the pagination controls


### Running production build

```bash
npm start

```


## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
