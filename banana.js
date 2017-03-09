const readline = require('readline');
const nodemailer = require('nodemailer');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function hidden(query, callback) {
    var stdin = process.openStdin(),
        i = 0;
    process.stdin.on("data", function(char) {
        char = char + "";
        switch (char) {
            case "\n":
            case "\r":
            case "\u0004":
                stdin.pause();
                break;
            default:
                process.stdout.write("\033[2K\033[200D"+query+"["+((i%2==1)?"=-":"-=")+"]");
                i++;
                break;
        }
    });

    rl.question(query, function(value) {
        rl.history = rl.history.slice(1);
        callback(value);
    });
}

hidden("password : ", function(password) {
        // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'carlosmarques.personal@gmail.com',
            pass: password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Banana Master 🍌" <carlosmarques.personal@gmail.com>', // sender address
        to: 'isabel.pecastelo@gmail.com', // list of receivers
        subject: '🍌 Banana Warning 🍌', // Subject line
        text: 'Your banana has been touched...', // plain text body
        html: '<b>Your banana has been touched...</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
});