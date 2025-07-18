import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// Configurer CORS globalement avec options pour gérer le preflight
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Gestion explicite des requêtes OPTIONS (preflight)
app.options("/api/predict", (req, res) => {
  res.sendStatus(204); // No Content
});

app.post("/api/predict", async (req, res) => {
  const azureData = {
    Inputs: {
      input1: [req.body],
    },
  };

  try {
    const response = await fetch(
      "http://a00f8d2c-a7bf-4bd3-b35d-d9505d67ccab.francecentral.azurecontainer.io/score",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 3SjUsBdN2Vdh0odmXBfrOe2fO9KZCY4C",
        },
        body: JSON.stringify(azureData),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("Erreur proxy:", error);
    res.status(500).json({ error: "Erreur côté proxy" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy lancé sur http://localhost:${PORT}`);
});
