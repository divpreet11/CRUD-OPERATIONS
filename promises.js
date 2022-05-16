findData = async(req, res) => {
    let id = req.params.id;
    console.log(id);

    const abc = new Promise((resolve, reject) => {
        Data.findById(id, req.body, function(err, resp) {
            if (err)
                reject(err)
            else
                resolve(resp)

        })
    })


    const ddd = await abc;

    res.status(200).json({
        status: 'success',
        data: {
            findUser: ddd
        }
    });
}


//practice

//userdata
//Strong password using bcryptJS
// const securePassword = async(Password) => {
//     const passHash = await bcrypt.hash(Password, 12);
//     console.log(passHash);

//     const passCheck = await bcrypt.compare(Password, passHash);
//     console.log(passCheck);
// }
// securePassword("Divpreet@123")

/*************routes*********************/

//to create token

// const createToken = async() => {
//     const token = await jwt.sign({ _id: "626fc4fba100cf7733e9cf45" }, "mynameisDivpreetKaurandthisismysecretkey")
//     console.log(token);

//     const uservar = await jwt.verify(token, "mynameisDivpreetKaurandthisismysecretkey");
//     console.log(uservar);
// }

// createToken();




// const usersData = JSON.parse(
//     fs.readFileSync(`${__dirname}/Data/user.json`)
// );


// /***************************OPERATIONS********************************/

// getAllUsers = (req, res) => {
//     res.status(200).json({
//         status: "success",
//         data: {
//             usersData
//         }
//     });
// }

// getUserID = (req, res) => {
//     const params = req.params
//     const Userid = usersData[params.id * 1]
//     console.log(params)
//     res.status(200).json({
//         status: "success",
//         data: {
//             usersData: Userid
//         }
//     });

// }

// addData = (req, res) => {
//     try {

//         //const newUser = Object.assign({ Userid: Math.floor(Math.random() * 100) }, req.body);

//         const abc = req.body
//         abc.Userid = Math.floor(Math.random() * 100)

//         // fs.closeSync

//         usersData.push(abc);
//         const ss = fs.writeFileSync(`${__dirname}/Data/user.json`, JSON.stringify(usersData), { flag: 'w+' })
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 usersData: abc
//             }

//         });
//     } catch (err) {

//         res.status(400).json({ error: err })
//     }
// }



// //delete

// deleteData = (req, res) => {

//     const userid = req.params.id * 1;
//     let index = 9999;

//     for (let i = 0; i < usersData.length; i++) {
//         if (userid == usersData[i].id) {
//             index = i;
//             break;
//         }
//     }
//     console.log(index)
//     usersData[index] = usersData[usersData.length - 1]
//     usersData.pop()
//     console.log(usersData)
//     const ss = fs.writeFileSync(`${__dirname}/Data/user.json`, JSON.stringify(usersData), { flag: 'w+' })


//     res.send({ success: true, msg: 'User removed successfully' })

// }

// //patch
// updateData = (req, res) => {

//     const userid = req.params.id * 1
//         //const user = usersData.find((usersData) => usersData.id === userid);
//     console.log(userid);


//     const newUser = Object.assign({ userid }, req.body);

//     //usersData.push(newUser);

//     const userIndex = usersData.findIndex((val) => val.userid === userid)

//     if (userIndex <= -1) {
//         return res.status(404).json({ message: "User not found" })
//     }
//     console.log("Herer index", userIndex, newUser)
//     usersData.splice(userIndex, 1, newUser);

//     const ss = fs.writeFileSync(`${__dirname}/Data/user.json`, JSON.stringify(usersData), { flag: 'w+' })

//     res.status(200).json({
//         status: 'success',
//         data: {
//             usersData: newUser
//         }

//     });


//     //console.log(usersData);
// }




//middleware
//token=req.header["hello"]