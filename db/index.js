const { uid } = require("uid");
const { axios } = require("axios");

// let rosterDB = [];

class Roster {
    constructor() {
        return this;
    }

    addStudent(name, location) {
        const id = this.generateUID();
        this[id] = new Student(id, name, location);

        return this[id];
    }

    addStudent2(student) {
        console.log(student);
        this[student.id] = new Student(
            student.id,
            student.name,
            student.location
        );

        return this[student.id];
    }

    deleteStudent(id) {
        this[id] = undefined;
    }

    generateUID() {
        let id = uid();
        while (this[id] !== undefined) {
            id = uid();
        }
        return id;
    }

    find(name, location) {
        let results = new Roster();

        console.log(Object.keys(this));
        Object.values(this).forEach((student) => {
            if (!name && !location) {
                results.addStudent2(student);
            }
            if (name === student.name) {
                results.addStudent2(student);
            }
            if (location === student.location) {
                results.addStudent2(student);
            }
        });
        return results;
    }

    async getPhoto() {
        const URL = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${this.location}`;
        return await axios.get(URL);
    }
}

class Student {
    constructor(id, name, location) {
        this.id = id;
        this.name = name;
        this.location = location;
    }
}

let rosterDB = new Roster();

rosterDB.addStudent("Angel", "Las Vegas");
rosterDB.addStudent("Alberto", "Las Vegas");
rosterDB.addStudent("Bob", "Las Vegas");

module.exports = {
    rosterDB,
};
