const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')


const getAllTasks = asyncWrapper(async(req,res)=>{
    const tasks = await Task.find({});
    res.status(200).json({tasks});
})

const createTask = asyncWrapper(async(req,res)=>{
    const task = await Task.create(req.body);
    res.status(201).json({task});
})


const getSingleTask = asyncWrapper(async(req,res,next)=>{
    const id = req.params.id;
    const task = await Task.findOne({_id:id});
   if(!task){
    return next(createCustomError(`Not Found a task with id: ${id}`,404));
   }
   res.status(200).json({task});
})

const updateTask = asyncWrapper(async(req,res,next)=>{
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate({_id:id},req.body,{new:true,  runValidators: true});

    if(!task){
        return next(createCustomError(`Not Found such task`,404));

    }

    res.status(200).json({ task })

})

const deleteTask = asyncWrapper(async(req,res)=>{
    const id = req.params.id;
    const task = await Task.findByIdAndDelete({_id:id});

    if(!task){
        return next(createCustomError(`Cannot delete task with is ${id}`,404))
    }

    res.status(200).json({task});

})

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}