// components/chatbotData.js

const chatbotData = [
  { question: "Hello", answer: "Hi! How can I help you today?" },
  { question: "what is your name", answer: "I'm your friendly chatbot assistant." },
  { question: "how are you", answer: "I'm just code, but I'm running great!" },
  { question: "which river is the longest", answer: "The Amazon River spans around 4,345 miles!" },
  { question: "who is your creator", answer: "Jamal Veve M" },
  {
    question: "react project setup",
    answer: `Here's how to create a React project with Vite:
1. 🚀 Run: \`npm create vite@latest ./ -- --template react\`
2. ✍️ Set a project name.
3. 📦 Run \`npm install\`
4. ⚙️ Run \`npm run dev\`
🎉 You're ready!`,
  },
  {
    question: "guide on tailwind",
    answer: `Install Tailwind in Vite:
1. \`npm install -D tailwindcss postcss autoprefixer\`
2. \`npx tailwindcss init -p\`
3. Configure \`tailwind.config.js\`
4. Add to \`index.css\`:
\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`
5. Import \`index.css\` in \`main.jsx\`
🎉 Done!`,
  },
];

export default chatbotData;
