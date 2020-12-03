//validation function for req.params.id
const mongoose = require('mongoose');
exports.isValid = function(param) {
    return !!(param !== '' && mongoose.Types.ObjectId.isValid(param));
}
// it was:
// if (param != '' && mongoose.Types.ObjectId.isValid(param)) {
//     return true
// } else {
//     return false
// }