const express=require("express");

const mongoose=require("mongoose");

const app=express();

app.use(express.json())

const connectBG = ()=>{
    mongoose.connect("mongodb://localhost:27017/BANKDetail")
}

const userschema =mongoose.Schema({

  firstName:{type:String,required:true},
  middleName:{type:String,required:true},
  lastName:{type:String,required:true},
  age:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  address:{type:String,required:true},
  gender:{type:String,required:true}

},{
    timestamps:true
});

const User=mongoose.model("bankuser",userschema)

const branchschema=mongoose.Schema({

    name:{type:String,required:true},
    address:{type:String,required:true},
    IFSC:{type:String,required:true},
    Micr:{type:String,required:true},
},{
    timestamps:true
})

const Branch=mongoose.model("details", branchschema)

const masteracc=mongoose.Schema({
    balance:{type:String,required:true}
},{
    timestamps:true
})

const Masteracc=mongoose.model("masterAcc",masteracc)

const savingacc=mongoose.Schema({
    account_number:{type:Number,required:true,unique:true},
    balance :{type:Number,required:true},
    interestRate:{type:Number,required:true},
    startDate:{type:Number,required:true},
    maturityDate:{type:String,required:true}
},{
    timestamps:true
})
const SavingAcc=mongoose.model("savingaccount",savingacc)

const fixedAcc=mongoose.Schema({
    account_number:{type:Number,required:true,unique:true},
    balance :{type:Number,required:true},
    interestRate:{type:Number,required:true},
    startDate:{type:Number,required:true},
    maturityDate:{type:String,required:true}
},{
     timestamps:true
});

const FIXED= mongoose.model("fixedacc",fixedAcc)

app.get("/banks",async(req,res)=>{

    try{

        const Userdetail=await User.find({}).lean().exec()

        return res.status(200).send(Userdetail)

    }catch(err){
       return res.status(500).send({message:err.message})

    }

});

app.post("/banks",async(req,res)=>{
    try{
        const user=await User.create(req.body)
        return res.status(201).send(user)
    }catch(err){
        return res.status(500).send({message:err.message})

    }
})






app.listen(5500,async()=>{
    try{
       await connectBG();
    }catch(err){
        console.log("err:",err)
    }
    console.log("app is listening on 5500")
})