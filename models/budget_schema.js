const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    amount:{
        type: Number,
        required: true
    },
    color:{
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                if (v.charAt(0) !== '#') return false  
                if (v.length != 7) return false
                return true
            }, 
            message: "Invalid hexcode! Must be in #000000 format"
        }
    }
}, {collection: 'budget'});

module.exports = mongoose.model('Budget', budgetSchema);