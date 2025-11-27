import express from "express";
import dotenv from "dotenv";
import { sql } from "./db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
import transcationRoute from "./routes/transactions.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:8081",
  })
);
app.use(rateLimiter);
app.use(express.json());

async function initDb() {
  try {
    await sql`create table if not exists transaction (
    id serial primary key,
    user_id  varchar(255) not null,
    title varchar(255) not null,
    amount  decimal(10,2) not null,
    category varchar(255) not null,
    created_at date not null default current_date
    )`;

    console.log("db initalized and connected successfully");
  } catch (e) {
    console.log("error in connecting  db", e);
  }
}

app.use("/api/transaction", transcationRoute);

initDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
});
