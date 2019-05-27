import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import SingerController from "./controllers/Singer.Controller";
import upload from "./utils/UploadConfig";
import PORT from "./config/Port";
let urlEncodeParse = bodyParser.urlencoded({ extended: false })
const app = express();
app.set("view engine", "ejs");

app.use(express.static("./public"));

app.get("/", (req, res) => {
    SingerController.getAllSinger()
        .then(singerList => res.render("index", { singerList }))
        .catch(error => console.log(error))
})

app.get("/add", (req, res) => {
    res.render("add");
})

app.post("/add", upload.single('image'), (req, res) => {
    const { name } = req.body;
    const image = req.file;
    // console.log(name, image.path );
    SingerController.addNewSinger(name, image.filename)
        .then(result => res.redirect("/"))
        .catch(err => {
            console.log(err + "");
            res.statusCode = 400;
            res.send("Cannot add a singer");
        });
})

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    SingerController.editInfoSinger(id)
        .then(result => res.render("edit", { singer: result }))
        .catch(error => res.status(400).send(error + ""));
})

app.post("/update/:id", upload.single('image'), (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const updateObj = req.file ? { name, image: req.file.filename } : { name };
    SingerController.updateInfoSinger(id, updateObj)
        .then((singer) => {
            if (singer.image !== 'default.png') fs.unlinkSync(__dirname + "/public/" + singer.image);
            res.redirect("/")
        })
        .catch(error => res.status(400).send(error + ""));
})

app.get("/remove/:id", (req, res) => {
    let { id } = req.params;
    SingerController.deleteSinger(id)
        .then((singer) => {
            if (singer.image !== 'default.png') fs.unlinkSync(__dirname + "/public/" + singer.image);
            res.redirect("/")
        })
        .catch(error => res.status(400).send("Cannot delete this Singer"));
})


// process.env.PORT là PORT mà heroku sẽ cấp cho server để chạy
app.listen(process.env.PORT || PORT, () => {
    console.log("Server is running at port " + PORT);
})