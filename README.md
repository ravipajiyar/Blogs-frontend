BlogApp – Frontend Technical Task
A professional, responsive blog platform built as a technical demonstration using Next.js 14 and Zustand. This application features a secure authentication flow, full CRUD capabilities for blog management, and a modern SaaS-inspired design.
Quick Start
Follow these steps to run the application locally:
Clone the repository:
code
Bash
git clone https://github.com/YOUR_USERNAME/frontend-blog-test.git
cd blog-app
Install dependencies:
code
Bash
npm install
Run the development server:
code
Bash
npm run dev
Access the app:
Open http://localhost:3000 in your browser.
Tech Stack
Framework: Next.js 14 (App Router)
State Management: Zustand (with Persistence)
Styling: Tailwind CSS (Dark Mode enabled)
Validation: React Hook Form + Zod
API Handling: Axios (Mocking JSONPlaceholder)
Rich Text: React Quill
Key Features
Authentication: Mock JWT-based login/register flow with useAuth custom hook.
Blog Management: Full CRUD (Create, Read, Update, Delete) using usePosts custom hook.
Protected Routes: Secure dashboard access restricted to authenticated users.
Search & Filter: Real-time client-side search functionality.
Pagination: Structured post navigation (6 posts per page).
Responsive UI: Modern, mobile-first design with Glassmorphism and theme persistence.
