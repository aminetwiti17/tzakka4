var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MissionSchema = new Schema({
  employeeID: { type: Schema.Types.ObjectId, ref: "employee", required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  statuS: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Mission = mongoose.model("Mission", MissionSchema);

module.exports = Mission;
