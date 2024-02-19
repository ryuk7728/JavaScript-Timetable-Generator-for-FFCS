class Timetable {
    constructor(theory1, lab1, embedded1) {
        this.theory = theory1;
        this.lab = lab1;
        this.embedded = embedded1;
        this.tcombinations = [];
    }

   intersection(t, l) {
        for (const z of t) { 
          if (l.has(z) || l.has(this.mirrorSlot1(z)) || l.has(this.mirrorSlot2(z))) {
            return true;
          }
        }
        return false;
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
                if(this.intersection(t,l)){
                    continue;
                }
                for (let combination2 of combinations2) {
                    e.clear();
                    let k1 = false;
                    for (let key4 in combination2) {
                        for (let key5 in combination2[key4]) {
                            for (let x1 of combination2[key4][key5]) {
                                for (let x2 of x1) {
                                    if (t.has(x2) || l.has(x2)||t.has(this.mirrorSlot1(x2)) || l.has(this.mirrorSlot1(x2))||t.has(this.mirrorSlot2(x2)) || l.has(this.mirrorSlot2(x2))) {
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

     mirrorSlot1(x) {
        if (x === "A1") {
            return "L1";
        }
        if (x === "B1") {
            return "L7";
        }
        if (x === "C1") {
            return "L13";
        }
        if (x === "D1") {
            return "L19";
        }
        if (x === "E1") {
            return "L25";
        }
        if (x === "F1") {
            return "L2";
        }
        if (x === "G1") {
            return "L8";
        }
        if (x === "TA1") {
            return "L27";
        }
        if (x === "TB1") {
            return "L4";
        }
        if (x === "TC1") {
            return "L10";
        }
        if (x === "TE1") {
            return "L22";
        }
        if (x === "TF1") {
            return "L28";
        }
        if (x === "TG1") {
            return "L5";
        }
        if (x === "TAA1") {
            return "L11";
        }
        if (x === "TCC1") {
            return "L23";
        }
        if (x === "TD1") {
            return "L29";
        }
        if (x === "A2") {
            return "L31";
        }
        if (x === "B2") {
            return "L37";
        }
        if (x === "C2") {
            return "L43";
        }
        if (x === "D2") {
            return "L49";
        }
        if (x === "E2") {
            return "L55";
        }
        if (x === "F2") {
            return "L32";
        }
        if (x === "G2") {
            return "L38";
        }
        if (x === "TA2") {
            return "L57";
        }
        if (x === "TB2") {
            return "L34";
        }
        if (x === "TC2") {
            return "L40";
        }
        if (x === "TD2") {
            return "L46";
        }
        if (x === "TE2") {
            return "L52";
        }
        if (x === "TF2") {
            return "L58";
        }
        if (x === "TG2") {
            return "L35";
        }
        if (x === "TAA2") {
            return "L41";
        }
        if (x === "TBB2") {
            return "L47";
        }
        if (x === "TCC2") {
            return "L53";
        }
        if (x === "TDD2") {
            return "L59";
        }
        
        // For cases like "L1" or "L7" where the output should be the corresponding "A1" or "B1"
        if (x === "L1") {
            return "A1";
        }
        if (x === "L7") {
            return "B1";
        }
        if (x === "L13") {
            return "C1";
        }
        if (x === "L19") {
            return "D1";
        }
        if (x === "L25") {
            return "E1";
        }
        if (x === "L2") {
            return "F1";
        }
        if (x === "L8") {
            return "G1";
        }
        if (x === "L27") {
            return "TA1";
        }
        if (x === "L4") {
            return "TB1";
        }
        if (x === "L10") {
            return "TC1";
        }
        if (x === "L22") {
            return "TE1";
        }
        if (x === "L28") {
            return "TF1";
        }
        if (x === "L5") {
            return "TG1";
        }
        if (x === "L11") {
            return "TAA1";
        }
        if (x === "L23") {
            return "TCC1";
        }
        if (x === "L29") {
            return "TD1";
        }
        if (x === "L31") {
            return "A2";
        }
        if (x === "L37") {
            return "B2";
        }
        if (x === "L43") {
            return "C2";
        }
        if (x === "L49") {
            return "D2";
        }
        if (x === "L55") {
            return "E2";
        }
        if (x === "L32") {
            return "F2";
        }
        if (x === "L38") {
            return "G2";
        }
        if (x === "L57") {
            return "TA2";
        }
        if (x === "L34") {
            return "TB2";
        }
        if (x === "L40") {
            return "TC2";
        }
        if (x === "L46") {
            return "TD2";
        }
        if (x === "L52") {
            return "TE2";
        }
        if (x === "L58") {
            return "TF2";
        }
        if (x === "L35") {
            return "TG2";
        }
        if (x === "L41") {
            return "TAA2";
        }
        if (x === "L47") {
            return "TBB2";
        }
        if (x === "L53") {
            return "TCC2";
        }
        if (x === "L59") {
            return "TDD2";
        }
        
        return "";
    }
    
    mirrorSlot2(x) {
        if (x === "A1") {
            return "L14";
        }
        if (x === "L14") {
            return "A1";
        }
        if (x === "B1") {
            return "L20";
        }
        if (x === "L20") {
            return "B1";
        }
        if (x === "C1") {
            return "L26";
        }
        if (x === "L26") {
            return "C1";
        }
        if (x === "D1") {
            return "L3";
        }
        if (x === "L3") {
            return "D1";
        }
        if (x === "E1") {
            return "L9";
        }
        if (x === "L9") {
            return "E1";
        }
        if (x === "F1") {
            return "L15";
        }
        if (x === "L15") {
            return "F1";
        }
        if (x === "G1") {
            return "L21";
        }
        if (x === "L21") {
            return "G1";
        }
        if (x === "A2") {
            return "L44";
        }
        if (x === "L44") {
            return "A2";
        }
        if (x === "B2") {
            return "L50";
        }
        if (x === "L50") {
            return "B2";
        }
        if (x === "C2") {
            return "L56";
        }
        if (x === "L56") {
            return "C2";
        }
        if (x === "D2") {
            return "L33";
        }
        if (x === "L33") {
            return "D2";
        }
        if (x === "E2") {
            return "L39";
        }
        if (x === "L39") {
            return "E2";
        }
        if (x === "F2") {
            return "L45";
        }
        if (x === "L45") {
            return "F2";
        }
        if (x === "G2") {
            return "L51";
        }
        if (x === "L51") {
            return "G2";
        }
        return "";
    }
    


    
    
    
    
    isSlotTaken(currentCombination, slot) {
        for (let sts of currentCombination) {
            for (let x of sts.slot) {
                if (slot.has(x)||slot.has(this.mirrorSlot1(x))||slot.has(this.mirrorSlot2(x))) {
                    return true;
                }
            }
        }
        return false;
    }
    isSlotTaken1(currentCombination, slot) {
        for (let sts of currentCombination) {
            for (let x of sts.slot) {
                    for (let y of x) {
                        if (slot[0].includes(y)||slot[0].includes(this.mirrorSlot1(y))||slot[0].includes(this.mirrorSlot2(y))||slot[1].includes(y)||slot[1].includes(this.mirrorSlot1(y))||slot[1].includes(this.mirrorSlot2(y))) {
                            return true;
                        }
                    }
             
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
        'Teacher1': new Set(['A1', 'TA1']),
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
        'LabTeacher1': new Set(['L31', 'L32','L33','L34']),
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
            ["A1","TA1"],["L11","L12"]
        ],
        'EmbeddedTeacher2': [
            ["F2","TF2"],["L20","L21"]
        ]
    },
    'EmbeddedSubject2': {
        'EmbeddedTeacher3': [
            ["B1","TB1"],["L5","L6"]
        ],
        'EmbeddedTeacher4': [
            ["C2","TC2"],["L22","L23"]
        ]
    }
    // Add more embedded subjects as needed
};

// Creating an instance of the Timetable class
const timetable = new Timetable(theory, lab, embedded);

// Calling the bruteForce method to generate combinations
const combinations = timetable.bruteForce();
console.log("The combinations are:\n")

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

