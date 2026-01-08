const allowed = [
  "http://localhost:5173",
  "https://to-do-list-mern-pink.vercel.app"
];

app.use(
  cors({
    origin: allowed,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false
  })
);

app.options("*", cors());
