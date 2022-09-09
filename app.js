import express from "express";
import morgan from "morgan";
import firebaseAdmin from "./services/firebaseAdmin.js";
import firebaseFront from "./services/firebaseFront.js";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization
    ? req.headers.authorization.split(" ")
    : null;

  if (!authHeader) {
    res.status(403).json({ message: "unauthorized" });
  } else if (!authHeader[1]) {
    res.status(403).json({ message: "No token provided" });
  } else {
    try {
      console.log("verificar token");
      const token = authHeader[1];
      const result = await firebaseAdmin.verifyIdToken(token);
      console.log(result);

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json(error);
    }
  }
};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await firebaseFront.sigIn(email, password);
    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    res.send(401).json(error);
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await firebaseFront.createUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    res.send(500).json(error);
  }
});

app.get("/curso", authenticateJWT, (_req, res) => {
  res.status(200).json({ title: "bienvenido" });
});
