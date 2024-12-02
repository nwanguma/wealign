# WeAlign

This is the client-side application of WeAlign, a platform designed to help developers turn side projects into actual businesses by enabling collaboration, event discovery, and sharing resources.

## 🌟 Project Overview

WeAlign connects developers with like-minded collaborators, helping them find events, articles, and other resources that are essential for turning side projects into successful ventures.

## 🛠️ Tech Stack

- **Frontend Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for rapid, responsive design
- **State Management:** [Redux](https://redux.js.org/) for global state management
- **Authentication:** JWT (JSON Web Token)
- **Routing:** Next.js dynamic routing

## 🚀 Features

- **User Authentication:** Sign up, log in, and manage user profiles.
- **Collaborator Discovery:** Users can browse and join projects, view collaborator profiles.
- **Event Listings:** Discover and attend tech events that align with your side projects.
- **Article & Resource Sharing:** Read and share helpful articles and resources.
- **Real-time Notifications:** Get updates on project status, new events, and collaborators.

## 🔧 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 16.x or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- A running backend API, please contact me via [email](mailto:nwangumat@gmail.com) for access to API.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nwanguma/wealign.git
   cd wealign
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root of the project and add the necessary environment variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000  # Your backend URL
   NEXT_PUBLIC_AUTH_URL=http://localhost:8000/auth  # Auth endpoint
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:

   Visit `http://localhost:3000` to see the app running locally.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/docs/intro)

## 🚨 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---
