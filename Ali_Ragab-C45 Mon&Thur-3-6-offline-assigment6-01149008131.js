import express from "express";
import mysql2 from "mysql2/promise";
const app = express();
const port = 3000;

async function connectionDB() {
  return await mysql2
    .createConnection({
      host: "127.0.0.1",
      port: "3306",
      database: "assigmnt_6",
      user: "root",
      password: "",
    })
    .catch((error) => {
      console.log("failed connect to db");
    });
}

connectionDB();

app.use(express.json());

app.get("/", (req, res, next) => {
  return res.json({ message: "landing page" });
});

// GET all product 
app.get("/products", async (req, res, next) => {
    const db = await connectionDB();
    const selectQuery = `SELECT * FROM Products`;
    const result = await db.execute(selectQuery);
    return res.json({ message: "done", products: result });
});

// GET product by ID
app.get("/products/:id", async (req, res, next) => {
    const db = await connectionDB();
    const selectQuery = `SELECT * FROM Products WHERE ProductID = ?`;
    const result = await db.execute(selectQuery, [req.params.id]);
    return res.json({ message: "done", product: result });
});

// POST create product
app.post("/products", async (req, res, next) => {
    const db = await connectionDB();
    const { ProductName, Price, StockQuantity, SupplierID } = req.body;
    const insertQuery = `INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)`;
    const result = await db.execute(insertQuery, [ProductName, Price, StockQuantity, SupplierID]);
    return res.json({ message: "done", result: result });
});

// PUT update product
app.put("/products/:id", async (req, res, next) => {
    const db = await connectionDB();
    const { ProductName, Price, StockQuantity, SupplierID } = req.body;
    const updateQuery = `UPDATE Products SET ProductName=?, Price=?, StockQuantity=?, SupplierID=? WHERE ProductID=?`;
    const result = await db.execute(updateQuery, [ProductName, Price, StockQuantity, SupplierID, req.params.id]);
    return res.json({ message: "done", result: result });
});

// DELETE product
app.delete("/products/:id", async (req, res, next) => {
    const db = await connectionDB();
    const deleteQuery = `DELETE FROM Products WHERE ProductID = ?`;
    const result = await db.execute(deleteQuery, [req.params.id]);
    return res.json({ message: "done", result: result });
});


// GET all suppliers
app.get("/suppliers", async (req, res, next) => {
    const db = await connectionDB();
    const selectQuery = `SELECT * FROM Suppliers`;
    const result = await db.execute(selectQuery);
    return res.json({ message: "done", suppliers: result });
});

// GET supplier by ID
app.get("/suppliers/:id", async (req, res, next) => {
    const db = await connectionDB();
    const selectQuery = `SELECT * FROM Suppliers WHERE SupplierID = ?`;
    const result = await db.execute(selectQuery, [req.params.id]);
    return res.json({ message: "done", supplier: result });
});

// POST create supplier
app.post("/suppliers", async (req, res, next) => {
    const db = await connectionDB();
    const { SupplierName, ContactNumber } = req.body;
    const insertQuery = `INSERT INTO Suppliers (SupplierName, ContactNumber) VALUES (?, ?)`;
    const result = await db.execute(insertQuery, [SupplierName, ContactNumber]);
    return res.json({ message: "done", result: result });
});

// PUT update supplier
app.put("/suppliers/:id", async (req, res, next) => {
    const db = await connectionDB();
    const { SupplierName, ContactNumber } = req.body;
    const updateQuery = `UPDATE Suppliers SET SupplierName=?, ContactNumber=? WHERE SupplierID=?`;
    const result = await db.execute(updateQuery, [SupplierName, ContactNumber, req.params.id]);
    return res.json({ message: "done", result: result });
});

// DELETE supplier
app.delete("/suppliers/:id", async (req, res, next) => {
    const db = await connectionDB();
    const deleteQuery = `DELETE FROM Suppliers WHERE SupplierID = ?`;
    const result = await db.execute(deleteQuery, [req.params.id]);
    return res.json({ message: "done", result: result });
});


// GET all sales
app.get("/sales", async (req, res, next) => {
    const db = await connectionDB();
    const selectQuery = `SELECT s.*, p.ProductName FROM Sales s JOIN Products p ON s.ProductID = p.ProductID`;
    const result = await db.execute(selectQuery);
    return res.json({ message: "done", sales: result });
});

// GET sale by ID
app.get("/sales/:id", async (req, res, next) => {
    const db = await connectionDB();
    const selectQuery = `SELECT * FROM Sales WHERE SaleID = ?`;
    const result = await db.execute(selectQuery, [req.params.id]);
    return res.json({ message: "done", sale: result });
});

// POST create sale
app.post("/sales", async (req, res, next) => {
    const db = await connectionDB();
    const { ProductID, QuantitySold, SaleDate } = req.body;
    const insertQuery = `INSERT INTO Sales (ProductID, QuantitySold, SaleDate) VALUES (?, ?, ?)`;
    const result = await db.execute(insertQuery, [ProductID, QuantitySold, SaleDate]);
    return res.json({ message: "done", result: result });
});

// DELETE sale
app.delete("/sales/:id", async (req, res, next) => {
    const db = await connectionDB();
    const deleteQuery = `DELETE FROM Sales WHERE SaleID = ?`;
    const result = await db.execute(deleteQuery, [req.params.id]);
    return res.json({ message: "done", result: result });
});

app.get("{/*dummy}", (req, res, next) => {
  return res.status(404).json({ message: "invalid routing" });
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
