import express from "express"
const app = express();
import { multiplicator } from "./multiplier";


app.get('/ping', (_req, res) => {
  res.send('pong');
});


app.post('/calculate', (req, res) => {
    const { value1, value2, op } = req.body;


    const result = multiplicator(Number(value1), Number(value2), op);
    res.send({result})

})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});