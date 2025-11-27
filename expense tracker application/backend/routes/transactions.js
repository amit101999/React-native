import express from "express";
import { sql } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, title, amount, category } = req.body;
  try {
    if (!user_id || !title || !amount || !category) {
      res.status(400).json({ message: "all fields are required" });
    }

    const result =
      await sql`insert into transaction (user_id, title ,amount , category)
    values (${user_id},${title},${amount},${category}) returning *`;

    console.log(result);

    res
      .status(200)
      .json({ message: "Transaction created successfully", data: result[0] });
  } catch (e) {
    console.log("Error in creating transaction", e);
    res.status(500).json({ message: "Internal error" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result =
      await sql` select * from transaction where user_id = ${id} order by created_at desc`;
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.log("Error in getting transaction", e);
    res.status(500).json({ message: "Internal error" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result =
      await sql` delete from transaction where id = ${id} returning *`;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res
      .status(200)
      .json({ message: "Transaction deleted successfully", data: result });
  } catch (e) {
    console.log("Error in deleting transaction", e);
    res.status(500).json({ message: "Internal error" });
  }
});

router.get("/summary/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const balance =
      await sql`select coalesce(sum(amount),0) as balance from transaction where user_id = ${id}`;
    const income =
      await sql` select coalesce(sum(amount),0) as income from transaction where user_id = ${id} and amount > 0 `;
    const expenses =
      await sql` select coalesce(sum(amount),0) as expenses from transaction where user_id = ${id} and amount < 0 `;

    res.status(200).json({
      balance: balance[0].balance,
      income: income[0].income,
      expenses: expenses[0].expenses,
    });
  } catch (e) {
    console.log("Error in getting summary transaction", e);
    res.status(500).json({ message: "Internal error" });
  }
});

export default router;
