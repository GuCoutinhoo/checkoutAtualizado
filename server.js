// server.js
import express from "express";
import cors from "cors";
import { MercadoPago } from "@mercadopago/sdk-node";

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Access Token (NUNCA colocar no front-end)
const mp = new MercadoPago({
  accessToken: "APP_USR-5079596909849619-111808-bb8409b6a366cbaadb074c81de680f9a-521005600"
});

app.post("/create_preference", async (req, res) => {
  try {
    const preference = {
      items: req.body.items,
      back_urls: {
        success: "https://seu-dominio.com/sucesso.html",
        failure: "https://seu-dominio.com/erro.html",
        pending: "https://seu-dominio.com/pendente.html"
      },
      auto_return: "approved"
    };

    const response = await mp.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error("ERRO AO CRIAR PREFERENCE:", error);
    res.status(500).json({ error: "Erro ao criar preference", details: error });
  }
});

app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
