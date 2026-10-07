# 🎓 Student AI Assistant

An AI-powered student assistant that uses **Google Gemini, tool calling, PostgreSQL, Express.js, and React** to answer questions about student details, marks, attendance, and academic performance.

The system allows users to ask questions naturally, while Gemini decides which backend tools should be executed to retrieve the required information from PostgreSQL.

---

## 🚀 Features

- 🤖 AI-powered student assistant
- 🔧 Gemini function/tool calling
- 🧠 Multi-step AI tool execution
- 👨‍🎓 Student information lookup
- 📊 Student marks lookup
- 📅 Attendance lookup
- 📈 Overall performance analysis
- 🔎 Student search by name
- 🗄️ PostgreSQL database integration
- 🛡️ Zod validation for AI-generated tool arguments
- ⚠️ Error handling for database and Gemini failures
- 🌐 Express REST API
- 💬 React chat interface
- 🎨 Tailwind CSS UI
- 📱 Responsive design
- 🔐 Environment variable configuration

---

## 🏗️ Architecture

```text
                    React Frontend
                         │
                         ▼
                  Express REST API
                    POST /api/chat
                         │
                         ▼
                  Gemini AI Model
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
        Tool Selection          Tool Router
                                    │
             ┌──────────────────────┼─────────────────────┐
             │          │           │          │          │
             ▼          ▼           ▼          ▼          ▼
        getStudent  getAttendance  findStudent  getMarks  getPerformance
             │          │           │          │          │
             └──────────┴───────────┴──────────┴──────────┘
                                    │
                                    ▼
                              PostgreSQL
                                    │
                                    ▼
                              Tool Results
                                    │
                                    ▼
                              Gemini AI
                                    │
                                    ▼
                             Final Response
                                    │
                                    ▼
                              React UI

UI

🛠️ Tech Stack
Frontend
- React
- Vite
- Tailwind CSS
- React Markdown
Backend
- Node.js
- Express.js
- Google Gemini API
- Zod
- CORS
- dotenv
Database
- PostgreSQL
- node-postgres (pg)
📂 Project Structure
student-Ai-Assistance/
│
├── backend/
│   ├── app.js
│   ├── ai.js
│   ├── db.js
│   ├── getStudentTool.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md

.env should never be committed to GitHub.

🗄️ Database
The project uses PostgreSQL with three main tables.
Students
students
├── id
├── name
├── email
├── course
└── semester

Attendance
attendence
├── id
├── student_id
├── subject
└── percentage

Marks
marks
├── id
├── student_id
├── subject
└── marks

🔧 AI Tools
Gemini can access the following backend tools.
1. getStudent
Gets student information using the student ID.
Example:
Give me the details of student 1.

2. findStudentByName
Finds a student using their name.
Example:
Give me Nikhil's details.

3. getAttendance
Gets attendance information for all subjects.
Example:
What is Nikhil's attendance?

4. getMarks
Gets marks for all subjects.
Example:
What are Nikhil's marks?

5. getStudentPerformance
Calculates overall academic performance using:
- Average marks
- Average attendance
Example:
How is Nikhil performing?

🧠 Multi-Step Tool Calling
The assistant can execute multiple tools when one tool's result is required by another.
For example:
User:
How is Nikhil performing?

        ↓

Gemini

        ↓

findStudentByName("Nikhil")

        ↓

PostgreSQL

        ↓

Student ID = 1

        ↓

Gemini

        ↓

getStudentPerformance(1)

        ↓

PostgreSQL

        ↓

Performance data

        ↓

Gemini

        ↓

Final natural-language answer

This creates an agent-like workflow instead of a simple chatbot.
🛡️ Validation & Security
The project validates AI-generated tool arguments using Zod.
Example:
const schema = z.object({
  studentId: z.number().int().positive()
});

The backend also checks whether the requested tool exists before executing it.
Database queries use parameterized SQL:
pool.query(
  "SELECT * FROM students WHERE id = $1",
  [id]
);

This helps protect against SQL injection.
API keys and database credentials are stored in environment variables.
⚙️ Environment Variables
Create a .env file inside the backend folder:
GEMINI_API_KEY=your_gemini_api_key

POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_HOST=localhost
POSTGRES_DATABASE=student_ai
POSTGRES_PORT=5433

Never commit .env to GitHub.
📦 Installation
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL

cd student-Ai-Assistance

2. Backend
cd backend

Install dependencies:
npm install

Create .env:
GEMINI_API_KEY=your_key

POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=localhost
POSTGRES_DATABASE=student_ai
POSTGRES_PORT=5433

Start the backend:
node app.js

Backend runs on:
http://localhost:3000

💻 Frontend
Open another terminal:
cd frontend

Install dependencies:
npm install

Start React:
npm run dev

Frontend usually runs on:
http://localhost:5173

🔌 API
Health Check
GET /

Response:
{
  "success": true,
  "message": "Student AI Assistant API is running"
}

Chat
POST /api/chat

Request:
{
  "message": "How is Nikhil performing?"
}

Response:
{
  "success": true,
  "answer": "Nikhil's overall performance..."
}

💬 Example Questions
You can ask:
Give me Nikhil's details.

What are Nikhil's marks?

What is Nikhil's attendance?

How is Nikhil performing?

How is Abhi performing?

Give me Rahul's details.

The assistant handles unavailable students and other errors gracefully.
🔄 Request Flow
User
  │
  ▼
React Chat UI
  │
  ▼
POST /api/chat
  │
  ▼
Express
  │
  ▼
Gemini
  │
  ▼
Tool Calling
  │
  ▼
Zod Validation
  │
  ▼
Tool Router
  │
  ▼
PostgreSQL
  │
  ▼
Tool Result
  │
  ▼
Gemini
  │
  ▼
Natural Language Response
  │
  ▼
React

🎯 Learning Outcomes
This project demonstrates practical AI engineering concepts:
- LLM API integration
- Prompt engineering
- Structured tool definitions
- Function calling
- Tool routing
- Multi-step agent loops
- Database integration with LLMs
- Input validation
- Error handling
- REST API development
- React AI interfaces
- Environment variable security
🚀 Future Improvements
Possible future enhancements:
- Authentication
- Role-based access
- Admin dashboard
- Student login
- Conversation history
- Streaming AI responses
- Redis caching
- More academic tools
- External API integrations
- Deployment
- Monitoring and logging
👨‍💻 Author
Nikhil R M
Information Science Engineering Student
Built as a practical AI Engineering project using Gemini tool calling, PostgreSQL, Express, and React.

### One small recommendation

Because your database table is actually named **`attendence`**, I've kept that spelling in the README to match your current project. For a future cleanup, I'd recommend renaming it to the correct spelling **`attendance`** throughout the database/code.

After putting this into `README.md`, you can commit:

```bash
git add README.md
git commit -m "docs: add project README"
git push
