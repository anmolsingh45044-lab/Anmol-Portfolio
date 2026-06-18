const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  name:    { type:String, required:true, trim:true, maxlength:100 },
  email:   { type:String, required:true, trim:true, lowercase:true },
  message: { type:String, required:true, trim:true, maxlength:2000 },
  read:    { type:Boolean, default:false },
  ip:      String,
}, { timestamps:true });

const projectSchema = new Schema({
  title:   { type:String, required:true },
  desc:    { type:String, required:true },
  tech:    [String],
  status:  { type:String, enum:["Live","Beta","WIP","Archived"], default:"WIP" },
  link:    String, repo:String, image:String,
  order:   { type:Number, default:0 },
  visible: { type:Boolean, default:true },
}, { timestamps:true });

const skillSchema = new Schema({
  cat:   { type:String, required:true },
  color: String,
  items: [{ name:String, level:{ type:Number, min:0, max:100 } }],
  order: { type:Number, default:0 },
});

const timelineSchema = new Schema({
  year:  { type:String, required:true },
  label: { type:String, required:true },
  sub:String, icon:String,
  type:  { type:String, enum:["cert","edu","work"], default:"work" },
  order: { type:Number, default:0 },
});

const certSchema = new Schema({ title:{type:String,required:true}, date:String, color:String, url:String });

const siteSettingsSchema = new Schema({
  key:   { type:String, required:true, unique:true },
  value: Schema.Types.Mixed,
}, { timestamps:true });

const statsSchema = new Schema({
  date:     { type:String, required:true, unique:true },
  visits:   { type:Number, default:0 },
  messages: { type:Number, default:0 },
}, { timestamps:true });

const blogSchema = new Schema({
  title:{type:String,required:true}, slug:{type:String,required:true,unique:true},
  excerpt:String, content:String, tags:[String],
  published:{type:Boolean,default:false}, image:String,
}, { timestamps:true });

const adminSchema = new Schema({
  username:    { type:String, required:true, unique:true },
  passwordHash:{ type:String, required:true },
  lastLogin:   Date,
});

module.exports = {
  Contact:     mongoose.model("Contact",     contactSchema),
  Project:     mongoose.model("Project",     projectSchema),
  Skill:       mongoose.model("Skill",       skillSchema),
  Timeline:    mongoose.model("Timeline",    timelineSchema),
  Cert:        mongoose.model("Cert",        certSchema),
  SiteSetting: mongoose.model("SiteSetting", siteSettingsSchema),
  Stats:       mongoose.model("Stats",       statsSchema),
  Blog:        mongoose.model("Blog",        blogSchema),
  Admin:       mongoose.model("Admin",       adminSchema),
};
