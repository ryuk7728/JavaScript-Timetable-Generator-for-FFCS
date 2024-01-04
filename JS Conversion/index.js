class Timetable {
    constructor(theory1, lab1, embedded1) {
        this.theory = theory1;
        this.lab = lab1;
        this.embedded = embedded1;
        this.tcombinations = [];
    }
    bruteForce() {
        let combinations = this.generateCombinations(this.theory);
        let combinations1 = this.generateCombinations(this.lab);
        let combinations2 = this.generateCombinations1(this.embedded);
        let t = new Set();
        let l = new Set();
        let e = new Set();
        let teachers = {};
        let slots = new Set();
        for (let combination of combinations) {
            t.clear();
            for (let key in combination) {
                for (let key1 in combination[key]) {
                    for (let x of combination[key][key1]) {
                        t.add(x);
                    }
                }
            }
            for (let combination1 of combinations1) {
                l.clear();
                for (let key2 in combination1) {
                    for (let key3 in combination1[key2]) {
                        for (let y of combination1[key2][key3]) {
                            l.add(y);
                        }
                    }
                }
                for (let combination2 of combinations2) {
                    e.clear();
                    let k1 = false;
                    for (let key4 in combination2) {
                        for (let key5 in combination2[key4]) {
                            for (let x1 of combination2[key4][key5]) {
                                for (let x2 of x1) {
                                    if (t.has(x2) || l.has(x2)) {
                                        k1 = true;
                                        e.clear();
                                        break;
                                    }
                                }
                                if (k1) {
                                    break;
                                }
                            }
                            if (k1) {
                                break;
                            }
                        }
                        if (k1) {
                            break;
                        }
                    }
                    if (!k1) {
                        teachers = this.findTeachers(combination, combination1, combination2);
                        slots = this.findSlots(combination, combination1, combination2);
                        let ob = new Brute(combination, combination1, combination2, teachers, slots);
                        this.tcombinations.push(ob);
                    }
                }
            }
        }
        return this.tcombinations;
    }
    findSlots(combination, combination1, combination2) {
        let slots = new Set();
        for (let key in combination) {
            for (let key1 in combination[key]) {
                slots.add(combination[key][key1]);
            }
        }
        for (let key in combination1) {
            for (let key1 in combination1[key]) {
                slots.add(combination1[key][key1]);
            }
        }
        for (let key in combination2) {
            for (let key1 in combination2[key]) {
                for (let x of combination2[key][key1]) {
                    slots.add(x);
                }
            }
        }
        return slots;
    }
    findTeachers(combination, combination1, combination2) {
        let teachers = {};
        for (let key in combination) {
            teachers[key] = new Set();
            for (let key1 in combination[key]) {
                teachers[key].add(key1);
            }
        }
        for (let key in combination1) {
            teachers[key] = new Set();
            for (let key1 in combination1[key]) {
                teachers[key].add(key1);
            }
        }
        for (let key in combination2) {
            teachers[key] = new Set();
            for (let key1 in combination2[key]) {
                teachers[key].add(key1);
            }
        }
        return teachers;
    }
    generateCombinations(theoryT) {
        let combinations = [];
        this.generateCombinationsHelper(theoryT, [], combinations);
        return combinations;
    }
    generateCombinations1(theoryT) {
        let combinations = [];
        this.generateCombinationsHelper1(theoryT, [], combinations);
        return combinations;
    }
    generateCombinationsHelper(theoryT, currentCombination, combinations) {
        if (currentCombination.length === Object.keys(theoryT).length) {
            combinations.push({});
            for (let comb1 of currentCombination) {
                if (!combinations[combinations.length - 1].hasOwnProperty(comb1.subject)) {
                    combinations[combinations.length - 1][comb1.subject] = {};
                }
                combinations[combinations.length - 1][comb1.subject][comb1.teacher] = comb1.slot;
            }
            return;
        }
        let subjects = Object.keys(theoryT);
        let subject = subjects[currentCombination.length];
        let teachers = theoryT[subject];
        for (let teacher in teachers) {
            let slots = teachers[teacher];
            if (!this.isSlotTaken(currentCombination, slots)) {
                let sts = new SubjectTeacherSlot(subject, teacher, slots);
                currentCombination.push(sts);
                this.generateCombinationsHelper(theoryT, currentCombination, combinations);
                currentCombination.pop();
            }
        }
    }
    generateCombinationsHelper1(theoryT, currentCombination, combinations) {
        if (currentCombination.length === Object.keys(theoryT).length) {
            combinations.push({});
            for (let comb1 of currentCombination) {
                if (!combinations[combinations.length - 1].hasOwnProperty(comb1.subject)) {
                    combinations[combinations.length - 1][comb1.subject] = {};
                }
                combinations[combinations.length - 1][comb1.subject][comb1.teacher] = comb1.slot;
            }
            return;
        }
        let subjects = Object.keys(theoryT);
        let subject = subjects[currentCombination.length];
        let teachers = theoryT[subject];
        for (let teacher in teachers) {
            let slots = teachers[teacher];
            if (!this.isSlotTaken1(currentCombination, slots)) {
                let sts = new SubjectTeacherSlotEmbedded(subject, teacher, slots);
                currentCombination.push(sts);
                this.generateCombinationsHelper1(theoryT, currentCombination, combinations);
                currentCombination.pop();
            }
        }
    }
    isSlotTaken(currentCombination, slot) {
        for (let sts of currentCombination) {
            for (let x of sts.slot) {
                if (slot.has(x)) {
                    return true;
                }
            }
        }
        return false;
    }
    isSlotTaken1(currentCombination, slot) {
        let k = false;
        for (let sts of currentCombination) {
            for (let x of sts.slot) {
                if (!k) {
                    for (let y of x) {
                        if (slot[0].includes(y)) {
                            return true;
                        }
                    }
                } else {
                    for (let y of x) {
                        if (slot[1].includes(y)) {
                            return true;
                        }
                    }
                }
                k = !k;
            }
        }
        return false;
    }
}

class SubjectTeacherSlot {
    constructor(subject, teacher, slot) {
        this.subject = subject;
        this.teacher = teacher;
        this.slot = slot;
    }
}

class SubjectTeacherSlotEmbedded {
    constructor(subject, teacher, slot) {
        this.subject = subject;
        this.teacher = teacher;
        this.slot = slot;
    }
}

class Brute {
    constructor(combination, combination1, combination2, teachers, slots) {
        this.combination = combination;
        this.combination1 = combination1;
        this.combination2 = combination2;
        this.teachers = teachers;
        this.slots = slots;
    }
}







// Example values for theory
const theory = {
    'Subject1': {
        'Teacher1': new Set(['B1', 'TB1']),
        'Teacher2': new Set(['B2', 'TB2']),
    },
    'Subject2': {
        'Teacher3': new Set(['E2', 'TE2']),
        'Teacher4': new Set(['G1', 'TG1']),
    }
    // Add more subjects as needed
};

// Example values for lab
const lab = {
    'LabSubject1': {
        'LabTeacher1': new Set(['L1', 'L2','L3','L4']),
        'LabTeacher2': new Set(['L14', 'L15','L16','L17']),
    },
    'LabSubject2': {
        'LabTeacher3': new Set(['L5', 'L6','L7','L8']),
        'LabTeacher4': new Set(["L18", "L19","L20","L21"]),
    }
    // Add more lab subjects as needed
};

// Example values for embedded
const embedded = {
    'EmbeddedSubject1': {
        'EmbeddedTeacher1': [
            ["B2","TB2"],["L11","L12"]
        ],
        'EmbeddedTeacher2': [
            ["F2","TF2"],["L23","L24"]
        ]
    },
    'EmbeddedSubject2': {
        'EmbeddedTeacher3': [
            ["B1","TB1"],["L7","L8"]
        ],
        'EmbeddedTeacher4': [
            ["E2","TE2"],["L22","L23"]
        ]
    }
    // Add more embedded subjects as needed
};

// Creating an instance of the Timetable class
const timetable = new Timetable(theory, lab, embedded);

// Calling the bruteForce method to generate combinations
const combinations = timetable.bruteForce();

// Log the generated combinations for demonstration
for (let i = 0; i < combinations.length; i++) {
    let bruteObject = combinations[i];

    console.log(`Combination ${i + 1}:`);
    
    // Display details of combination
    console.log("Theory:", bruteObject.combination);
    console.log("Lab:", bruteObject.combination1);
    console.log("Embedded:", bruteObject.combination2);
    
    // Display details of teachers and slots
    console.log("Teachers:", bruteObject.teachers);
    console.log("Slots:", bruteObject.slots);

    // Add additional details if needed

    console.log("\n");
}

