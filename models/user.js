import mongoose from '.';

const Schema = mongoose.Schema;
mongoose.model("user", new Schema({
  name: String,
  pwd: String,
}));
