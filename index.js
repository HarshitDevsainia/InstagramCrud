const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const app=express();
const chats=require('./models/chat');
const methodoverride=require('method-override');

const ExpressError=require('./ExpressError.js');
const asyncWrap=require('./utils/asyncWrap.js');

app.use(methodoverride('_method'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine',"ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));



main().then(()=>{
    console.log('Connection Build');
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

app.listen(8080,(req,res)=>{
    console.log('App is Listening at port 8080');
});

// const checktoken=(req,res,next)=>{
//     let{token}=req.query;
//     if(token==='access'){
//         console.log('Access');
//         next();
//     }
//     else{
//         throw new ExpressError(444,'Access Denied');
//     }
// }

app.get('/',(req,res)=>{
    res.send('Working Good');
});


app.get('/chats',asyncWrap(async (req,res)=>{
    let chat=await chats.find();
    res.render('index.ejs',{chat});
    next(err);
}));


//Show route

app.get('show/:id',(req,res)=>{
    res.redirect('show.ejs');
})

//new page 

app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
});


app.post('/chats',asyncWrap(async(req,res,next)=>{
    let {to,msg,from}=req.body;
    let newchats=new chats({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    await newchats.save();
    res.redirect('/chats'); 
}));

//Edit page

app.get('/chats/:id/edit',asyncWrap(async(req,res,next)=>{
    let {id}=req.params;
    let chat=await chats.findById(id);
    if(chat===null){
        return next(new ExpressError(404,'Give a Valid id'));
    }
    res.render('edit.ejs',{chat});
}));
app.put('/chats/:id',asyncWrap(async(req,res)=>{
    let {id}=req.params;
    let {newMsg : msg}=req.body;
    await chats.findByIdAndUpdate(id,{msg:msg},{runValidators:true,new:true});
    res.redirect('/chats');
}));

//Delete route

app.delete('/chats/:id',async(req,res)=>{
    let {id}=req.params;
    await chats.findByIdAndDelete(id);
    res.redirect('/chats');
});

app.use((err,req,res,next)=>{
    console.log(err.name);
    next(err);
});

app.use((err,req,res,next)=>{
    let {status=500,message='Give a valid request'}=err;
    res.status(status).send(message);
});