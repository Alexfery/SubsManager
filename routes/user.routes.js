import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => res.send({title:'GET all users'}))

userRouter.post('/', (req, res) => res.send({title:'POST a user'}))

userRouter.get('/:id', (req, res) => res.send({title:'GET a user'}))

userRouter.put('/:id', (req, res) => res.send({title:'Edited a user'}))

userRouter.delete('/:id', (req, res) => res.send({title:'Deleted a user'}))

export default userRouter;