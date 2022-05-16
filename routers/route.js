const { route } = require("express/lib/router")

app.route('/').post(createUsers)
app.route('/:id').patch(updateData).delete(deleteData).get(findData)
app.route('/login', auth).post(loginDetails)

module.exports = route