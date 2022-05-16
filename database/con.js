const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/myCRUD", {

}).then(() => {
    console.log(`connection is successful`);
}).catch((err) => {
    console.log(`no connection`);
});