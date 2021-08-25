const express = require('express');
const router = express.Router();

//importing Schema
const Task = require('../models/task');

//
router.get('/',async (req,res)=>{
  const tasks = await Task.find(); //gets data from data base
  console.log(tasks)
  res.render('index',{
    tasks // tasks:tasks
  });
});

//Ruta POST
router.post('/add', async (req,res)=>{
  const task = new Task(req.body);
  await task.save();
  res.redirect('/');
});

//Ruta Ordenar
router.get('/order/:id', async (req,res)=>{
  const{id}=req.params;
  const task = await Task.findById(id );
  task.status = !task.status;
  await task.save();
  console.log(task);
  res.redirect('/');
});

//Ruta Edit
router.get('/edit/:id', async (req,res)=>{
  const {id}=req.params;
  const task = await Task.findById(id);
  res.render('edit', {
    task
  });
});

//Ruta UPDATE
router.post('/edit/:id', async (req,res)=>{
  const {id}=req.params;
  const task = await Task.updateOne({_id:id}, req.body);
  res.redirect('/');
});

//Ruta Delete
router.get('/delete/:id', async (req,res)=>{
  const {id}=req.params;
  await Task.remove({_id: id});
  res.redirect('/');
});



module.exports = router;