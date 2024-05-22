# Timetable Generation in JavaScript

This JavaScript code generates timetables based on preferred teachers. The corresponding teachers and slots can be added to the `theory`, `lab`, and `embedded` variables.

## Overview

- **Theory**: Subjects that have only theory slots (e.g., A1, B1).
- **Lab**: Subjects that have only lab slots (e.g., L1, L2).
- **Embedded**: Subjects that have both theory and lab components (e.g., A1, TA1, L1, L2).

## Sample Input and Output

### Input

```javascript
const theory = {
    'CAO': {
        'Senthil': new Set(['A1', 'TA1']),
        'Priya': new Set(['B2', 'TB2']),
    },
    'TOC': {
        'Rajendran': new Set(['E2', 'TE2']),
        'Akash': new Set(['G1', 'TG1']),
    }
};

const lab = {
    'OOPS': {
        'Raghavendran': new Set(['L31', 'L32', 'L33', 'L34']),
        'Murugan': new Set(['L14', 'L15', 'L16', 'L17']),
    },
    'Python': {
        'Vani': new Set(['L5', 'L6', 'L7', 'L8']),
        'Rajesh': new Set(['L35', 'L36', 'L37', 'L38']),
    }
};

const embedded = {
    'Calculus': {
        'Yuvapriya': [
            ['C1', 'TC1'], ['L31', 'L32']
        ],
        'Navaneethan': [
            ['D2', 'TD2'], ['L1', 'L2']
        ]
    },
    'Chemistry': {
        'Kamalakannan': [
            ['B1', 'TB1'], ['L55', 'L56']
        ],
        'Sureka': [
            ['C2', 'TC2'], ['L22', 'L23']
        ]
    }
};
```

### Output

```javascript
The combinations are:

Combination 1:
Theory: {
  CAO: { Priya: Set(2) { 'B2', 'TB2' } },
  TOC: { Rajendran: Set(2) { 'E2', 'TE2' } }
}
Lab: {
  OOPS: { Murugan: Set(4) { 'L14', 'L15', 'L16', 'L17' } },
  Python: { Vani: Set(4) { 'L5', 'L6', 'L7', 'L8' } }
}
Embedded: {
  Calculus: { Yuvapriya: [ [Array], [Array] ] },
  Chemistry: { Sureka: [ [Array], [Array] ] }
}
Teachers: {
  CAO: Set(1) { 'Priya' },
  TOC: Set(1) { 'Rajendran' },
  OOPS: Set(1) { 'Murugan' },
  Python: Set(1) { 'Vani' },
  Calculus: Set(1) { 'Yuvapriya' },
  Chemistry: Set(1) { 'Sureka' }
}

Combination 2:
Theory: {
  CAO: { Priya: Set(2) { 'B2', 'TB2' } },
  TOC: { Rajendran: Set(2) { 'E2', 'TE2' } }
}
Lab: {
  OOPS: { Murugan: Set(4) { 'L14', 'L15', 'L16', 'L17' } },
  Python: { Vani: Set(4) { 'L5', 'L6', 'L7', 'L8' } }
}
Embedded: {
  Calculus: { Navaneethan: [ [Array], [Array] ] },
  Chemistry: { Sureka: [ [Array], [Array] ] }
}
Teachers: {
  CAO: Set(1) { 'Priya' },
  TOC: Set(1) { 'Rajendran' },
  OOPS: Set(1) { 'Murugan' },
  Python: Set(1) { 'Vani' },
  Calculus: Set(1) { 'Navaneethan' },
  Chemistry: Set(1) { 'Sureka' }
}
```

