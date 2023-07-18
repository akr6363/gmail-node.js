const nodemailer = require("nodemailer");
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const port = 3010
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
    service: "gmail",
     host: "smtp.forwardemail.net",
    port: 465,
    secure: false,
    requireTLS: true,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: 'anyakr6363@gmail.com',
        pass: 'mptbxhprpmfepzsl'
    }
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/senMessage', async (req, res) => {

const {email, name, message} = req.body

    const info = await transporter.sendMail({
        from: 'portfolio', // sender address
        to: "akr636363@yandex.ru", // list of receivers
        subject: "feedback", // Subject line
        html: "<div>\n" +
            "    <b>Message from portfolio:</b>\n" +
            `    <div>name: ${name}</div>\n` +
            `    <div>email: ${email}</div>\n` +
            `    <div>${message}</div>\n` +
            "</div>", // html body
    });
    res.send(req.body);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
