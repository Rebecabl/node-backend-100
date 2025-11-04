const cors = require('cors');
app.use(cors({ origin: ['http://localhost:5173', 'https://SEU-FRONT.vercel.app'] }));

const path = require('path'); const fs = require('fs');
const dbFile = process.env.DB_PATH || path.join(process.cwd(), 'data', 'todos.db');
fs.mkdirSync(path.dirname(dbFile), { recursive: true });
