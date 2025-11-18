import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const app = express();
app.use(cors());
app.use(express.json());

// Access Token REAL (nunca coloque no front-end!)
const client = new MercadoPagoConfig({
  accessToken: "APP_USR-5079596909849619-111808-bb8409b6a366cbaadb074c81de680f9a-521005600"
});

const preference = new Preference(client);

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: req.body.items,
      back_urls: {
        success: "https://seu-dominio.com/sucesso.html",
        failure: "https://seu-dominio.com/erro.html",
        pending: "https://seu-dominio.com/pendente.html"
      },
      auto_return: "approved"
    };

    const result = await preference.create({ body });

    res.json({ id: result.id });

  } catch (error) {
    console.error("ERRO AO CRIAR PREFERENCE:", error);
    res.status(500).json({
      error: "Erro ao criar preference",
      details: error
    });
  }
});

app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
