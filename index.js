import express, { Router } from "express";
import cors from 'cors'
import { configureRoute } from "./configuration/configureRoute.js";
import { connectDatabase } from "./configuration/configureDatabase.js";

const port = 4300;

const app = express();

// app.use(cors({
//    origin:'http//localhost:3000'
// }))

app.use(cors({
}))
app.use(express.json());

configureRoute(app);
connectDatabase();

app.listen(port, () => {
   console.log("server has started on port", port)

}
)