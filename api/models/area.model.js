import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    googleEmbed: {
      type: String,
      required: true,
    },
    googleLocation: {
      type: String,
      required: true,
    },
    
    teamsPlay: {
      type: Array,
      
    },
    fitPlayers: {
      type: Number,
      required: true,
    },
    latitude : {
      type: Number,
      
    },
    longitude : {
      type: Number,
      
    },
    
    imageUrls: {
      type: Array,
      
    },
    
  },
  { timestamps: true }
);

const Area = mongoose.model('Area', areaSchema);

export default Area;
