# ToDo React Project

[![GitHub License](https://img.shields.io/github/license/Dima-McArrow/todo_react)](/LICENSE)

## 🌟 Introduction

This project is a React-based to-do application that incorporates TypeScript and Vite. The application allows users to create, read, update, and delete tasks with an emphasis on user experience and responsiveness. It includes various React components, such as task cards and forms, as well as modern React hooks for state management.

## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Usage](#usage)
- [Author](#author)

## 📦 Getting Started <a name = "getting_started"></a>

### Prerequisites

To run this project, you need to have Node.js installed along with npm (Node package manager). You can download and install Node.js from [here](https://nodejs.org/).

### Installation

To set up the project for development on your local machine, please follow these steps:

1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/your-username/todo_react.git
   ```
2. Change the working directory to the project directory:
   ```sh
   cd todo_react
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## 📝 Usage <a name = "usage"></a>

Once the server is running, you can visit `http://localhost:3000` in your browser to view the to-do application.

- To add a task, click on the "Create new task" button and fill in the required details.
- You can mark tasks as done, edit tasks, or delete them using the buttons on each task card.
- The application also provides filtering options to see all tasks, tasks that are done, or tasks that are pending.

## 💻 Development

### Scripts

This project includes the following scripts:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the codebase for potential issues.

### Folder Structure

Please follow the directory tree structure provided below to understand the project organization and file hierarchy:

#🛠 Project structure

```
.
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── public
│   ├── todo.svg
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── login.css
│   ├── main.tsx
│   ├── new_task.css
│   ├── sign_in.css
│   ├── tsconfig.app.tsbuildinfo
│   ├── vite-env.d.ts
│   ├── assets
│   │   ├── high-priority-svgrepo-com.svg
│   │   ├── low-priority-svgrepo-com.svg
│   │   ├── medium-priority-svgrepo-com.svg
│   │   ├── priority_high.svg
│   │   ├── react.svg
│   │   └── todo.svg
│   ├── add_task_button.tsx
│   ├── delete_button.tsx
│   ├── done_switch.tsx
│   ├── footer.tsx
│   ├── form.txt
│   ├── form_two.tsx
│   ├── header.tsx
│   ├── login.tsx
│   ├── logout.tsx
│   ├── menu.tsx
│   ├── new_card.tsx
│   ├── new_task.tsx
│   ├── select_importance.tsx
│   ├── sign_in.tsx
│   ├── task_card.txt
│   ├── task_info_modal.tsx
│   └── user.tsx
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── tsconfig.node.tsbuildinfo

(plus additional files and directories)
```

**Explanation of Key Files and Directories:**

- `index.html`: The entry point HTML file that includes the root div where the React app is mounted.
- `App.tsx`: React component that acts as the root component of the to-do application.
- `src/`: Directory containing all React components, styles, and TypeScript configurations.
- `public/`: Public assets folder containing static files like icons and images.
- `package.json`: JSON file with the project's dependencies, scripts, and other configurations.
- `.tsconfig`: TypeScript configuration files to specify the compiler options for the project.

### Code Style

This project uses ESLint to maintain code quality and consistency. Please follow the established coding practices and use the ESLint configuration to ensure your code follows the project coding standards.

## ✍️ Author <a name = "author"></a>

- [@Dima-McArrow](https://github.com/Dima-McArrow) - Idea & Initial work

## ⚖️ License

Distributed under the ISC License. See `LICENSE` file for more information.

Project Link: [https://github.com/your-username/todo_react](https://github.com/your-username/todo_react)

---
