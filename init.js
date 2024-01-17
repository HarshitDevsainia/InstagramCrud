const mongoose=require('mongoose');
const chat =require('./models/chat.js');
main().then(()=>{
    console.log('Connection Build');
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp')
}

chat.insertMany([
    {
        from:'Nishant',
        to:'Bharat',
        msg:'Hii Whats up bro',
        created_at:new Date()
    },
    {
        from:'Chavi',
        to:'Akriti',
        msg:'Send me class Shedule',
        created_at:new Date()
    },
    {
        from:'Yash Maheswari',
        to:'Hemant',
        msg:'Are you Coming College',
        created_at:new Date()
    },
    {
        from:'kuldeep',
        to:'Harshit Soni',
        msg:'Hey harshit Can you solve this question',
        created_at:new Date()
    },
    {
        from:'Ishu Varshney',
        to:'Harshit Soni',
        msg:"Let's go center Point",
        created_at:new Date()
    },
    {
        from:'Ishu Varshney',
        to:'Harsh Maheswari',
        msg:'Are You Coming with us',
        created_at:new Date()
    },
    {
        from:'Harsh Maheshwari',
        to:'Ishu Varshney',
        msg:'No i Have Some Work',
        created_at:new Date()
    },
]);



