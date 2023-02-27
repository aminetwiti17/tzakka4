const mongoose = require("mongoose");

function DB() {
  mongoose
    .connect(process.env.x, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to mongodb"))
    .catch((e) => console.log(e));
}
module.exports = DB;
//twiti:BPsPs2oZJrRLH2Gk
