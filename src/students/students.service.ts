import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

export interface Student extends CreateStudentDto {
    id: number;
}

@Injectable()
export class StudentsService implements OnModuleInit {
    private students: Student[] = [];
    private currentId = 1;

    onModuleInit() {
        // Add dummy data
        const dummyStudents = [
            { name: "John Doe", age: 20, grade: "A+" },
            { name: "Jane Smith", age: 19, grade: "B" },
            { name: "Bob Johnson", age: 21, grade: "A" },
            { name: "Alice Brown", age: 18, grade: "A-" },
            { name: "Charlie Wilson", age: 22, grade: "B+" }
        ];

        dummyStudents.forEach(student => {
            this.create(student);
        });
    }

    create(createStudentDto: CreateStudentDto): Student {
        const student = {
            id: this.currentId++,
            ...createStudentDto,
        };
        this.students.push(student);
        return student;
    }

    findAll(): Student[] {
        return this.students;
    }

    findOne(id: number): Student {
        const student = this.students.find(student => student.id === id);
        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
    }

    update(id: number, updateStudentDto: UpdateStudentDto): Student {
        const studentIndex = this.students.findIndex(student => student.id === id);
        if (studentIndex === -1) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }

        this.students[studentIndex] = {
            ...this.students[studentIndex],
            ...updateStudentDto,
        };

        return this.students[studentIndex];
    }

    remove(id: number): void {
        const studentIndex = this.students.findIndex(student => student.id === id);
        if (studentIndex === -1) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        this.students.splice(studentIndex, 1);
    }
} 