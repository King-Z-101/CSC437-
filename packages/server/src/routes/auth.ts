import dotenv from "dotenv";
import express, {
  NextFunction,
  Request,
  Response
} from "express";
import jwt from "jsonwebtoken";

import credentials from "../services/credential-svc";

const router = express.Router();

dotenv.config();
const TOKEN_SECRET: string =
  process.env.TOKEN_SECRET || "PREHISTORIC_ZOO_SECRET";

// Generate JWT token for authenticated zookeepers
function generateAccessToken(
  username: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token as string);
      }
    );
  });
}

// Register a new zookeeper
router.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res.status(400).send("Bad request: Invalid zookeeper information.");
  } else {
    credentials
      .create(username, password)
      .then((creds) => generateAccessToken(creds.username))
      .then((token) => {
        res.status(201).send({ token: token });
      })
      .catch((err) => {
        res.status(409).send({ error: err });
      });
  }
});

// Login existing zookeeper
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Bad request: Missing zookeeper credentials.");
  } else {
    credentials
      .verify(username, password)
      .then((goodUser: string) => generateAccessToken(goodUser))
      .then((token) => res.status(200).send({ token: token }))
      .catch((error) => res.status(401).send("Unauthorized: Invalid zookeeper credentials"));
  }
});

// Middleware to authenticate requests
export function authenticateZookeeper(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send("Access denied: Zookeeper authentication required");
  } else {
    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
      if (decoded) next();
      else res.status(403).send("Access denied: Invalid zookeeper credentials");
    });
  }
}

export default router;