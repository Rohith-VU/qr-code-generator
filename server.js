const express = require("express");
const QRCode = require("qrcode");

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.set("view engine", "ejs");

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Generate QR → Navigate to result page
app.post("/generate", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.redirect("/");
  }

  try {
    const qrImage = await QRCode.toDataURL(url);
    res.render("result", { qrCode: qrImage, url });
  } catch (error) {
    console.error(error);
    res.send("Error generating QR Code");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
