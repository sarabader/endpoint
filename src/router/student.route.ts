import express from 'express';
import validate from '../middleware/validate';
import { studentSchema, studentSchemaType } from '../zod_schema/student';

const router = express.Router();
let student : studentSchemaType[] =[];

router.get('/', validate(studentSchema), (req, res, next) => {
    return res.json(student);
  });

router.post('/', validate(studentSchema), (req, res, next) => {
    const newStudent = req.body as studentSchemaType;
    student.push(newStudent);
    return res.status(201).json({ message: 'Student information is Added !' });
  });

router.put('/:id', validate(studentSchema), (req, res, next) => {
    const updatedStudent = req.body as studentSchemaType;
    const { id } = req.params;
    const updatedList = student.filter((std) => {
      return std.id !== id;
    });
    updatedList.push(updatedStudent);
    student = updatedList;
            return res.json({
                message: 'Student information is Updated !'
            })
});

router.delete('/id',(req, res, next) => {
    const id  = req.params;
    const delStudent = student.filter((std) => {
      return std.id !== id;
    });
    student = delStudent;
    return res.json({
      message: 'Student is deleted !',
    });
  });

router.get('/:major', (req, res) => {
    let { major }  = req.params;
    let searchArr = student.filter((m)=>{
      return m.major.toLowerCase().includes(major);
    })
    return res.json(searchArr);
  });

router.put('/:level', validate(studentSchema), (req, res, next) => {
    const updatedLevel = student.find((std) => {
      return std.level;
    });
    updatedLevel?.level 
            return res.json({
                message: 'Student information is Updated !'
            })
});

export default router;