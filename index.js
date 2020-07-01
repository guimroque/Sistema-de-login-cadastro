const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash")

//Routers - importando rotas
const UsersRouter = require('./routes/UserRouter')
const AuthRouter = require("./routes/AuthRouter")
const AdminRouter = require('./routes/AdminRouter')
// View engine
app.set('view engine','ejs');

app.use(session({
    secret: "qualquercoisa", cookie: { maxAge: 30000000}
}))

app.use(flash());

app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.use("/", AuthRouter);
app.use("/user", UsersRouter);
app.use("/admin", AdminRouter);
// Router

    app.get("/", (req, res) => {
        res.render("index.ejs");
    })

// End Router
app.listen(3000, () => {
    console.log("O servidor está rodando!")
})