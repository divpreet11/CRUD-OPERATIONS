const Data = require('/data/Node Js/CRUD/Model/model')


//Post data == working correctly

// createUsers = (req, res) => {
//     console.log(req.body)
//     const details = new Data(req.body)

//     details.save()
//     res.status(200).json({
//         status: 'success'
//     });
// }

//post data using validations
module.exports.createUsers = async(req, res) => {
    console.log(req.body)
    try {
        const password = req.body.password;
        const cPassword = req.body.confirmPassword;

        if (password === cPassword) {
            // const registerEmployee = new Register({
            //     firstname: req.body.firstname,
            //     lastname: req.body.lastname,
            //     email: req.body.email,
            //     gender: req.body.gender,
            //     age: req.body.age,
            //     phone: req.body.phone,
            //     password: password,
            //     confirmPassword: cPassword
            // })

            const details = new Data(req.body)
                //console.log(details)

            const token = await details.generateAuthToken();
            console.log(token);
            const registered = await details.save();
            res.status(200).json({
                status: 'success'
            });



        } else {
            //console.log("Passwords are not matching")
            res.status(401).json({
                status: 'passwords are not matching'
            })
        }
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
}


module.exports.findData = async(req, res) => {
    let id = req.params.id;
    const result = await new Promise((resolve, reject) => {
        Data.findById(id, req.body, function(err, resp) {
            if (err) {
                reject(err)
            } else {
                resolve(resp)
            }
        })
    })
    res.status(200).json({
        status: 'success',
    });
}


module.exports.updateData = async(req, res) => {
    let id = req.params.id

    const result1 = await new Promise((resolve, reject) => {
        const updateUser = Data.findByIdAndUpdate(id, req.body, { new: true, }, function(err, resp) {
            if (err) {
                reject(err)
            } else {
                resolve(resp)
            }

        })
    })

    res.status(200).json({
        status: 'success',
        data: {
            updateUser: result1
        }
    });
}

module.exports.deleteData = async(req, res) => {
    let id = req.params.id
    const result2 = await new Promise((resolve, reject) => {


        const deleteUser = Data.findByIdAndDelete(id, function(err, resp) {
            if (err) {
                reject(err)
            } else {
                resolve(resp)
            }
        })
    })
    res.status(200).json({
        status: 'success'
    });
}


module.exports.loginDetails = async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const usermail = await Data.findOne({ email: email });

        const ismatch = await bcrypt.compare(password, usermail.confirmPassword);



        const token = await usermail.generateAuthToken();
        console.log("Your token is:" + token);



        let options = {
            maxAge: 1000 * 60 * 15, // would expire after 15 minutes
            httpOnly: true, // The cookie only accessible by the web server
            // signed: true // Indicates if the cookie should be signed
        }
        res.cookie("jwt", token, options);
        console.log('user data added to cookie');
        console.log(`My cookie value is ${res.cookie.jwt}`)


        if (ismatch) {

            console.log("welcome Back");
            res.status(201).json({
                token: token,
                status: 'success'
            })
        } else {
            throw "wrong pass";
        }


    } catch (error) {

        res.status(401).json({
            status: 'invalid'
        })
    }

}