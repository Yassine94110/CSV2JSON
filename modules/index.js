const fs = require('fs');
const csv = require('csv-parser');

const EMPLOYEES_FILENAME = "employees.csv";
const EMPLOYEES_BY_SKILL_FILENAME = "employeesBySkill.json";

const transform = (input) => {
    const transformedData = [];
  
    input.forEach((employee) => {
      const skills = employee.skills.split(',');
  
      skills.forEach((skill) => {
        transformedData.push({
          nom: employee.nom,
          prenom: employee.prenom,
          age: employee.age,
          skill: skill.trim(),
        });
      });
    });
  
    return transformedData;
  };
  const parseCSVFile = (filePath) => {
    const results = [];
  
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        const transformedData = transform(results);
        console.log(transformedData);
      });
  };
  const filterEmployeesOver40 = (filePath) => {
    const results = [];
  
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        const transformedData = transform(results);
        const filteredEmployees = transformedData.reduce((filtered, employee) => {
          const existingEmployee = filtered.find((e) => e.nom === employee.nom && e.prenom === employee.prenom);
          if (existingEmployee) {
            existingEmployee.skill += `,${employee.skill}`;
          } else if (employee.age > 40) {
            filtered.push(employee);
          }
          return filtered;
        }, []);
        console.log(filteredEmployees);
      });
  };

  const filterEmployeesUnder30 = (filePath) => {
    const results = [];
  
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        const transformedData = transform(results);
        const filteredEmployees = transformedData.reduce((filtered, employee) => {
          const existingEmployee = filtered.find((e) => e.nom === employee.nom && e.prenom === employee.prenom);
          if (existingEmployee) {
            existingEmployee.skill += `,${employee.skill}`;
          } else if (employee.age < 30) {
            filtered.push(employee);
          }
          return filtered;
        }, []);
        console.log(filteredEmployees);
      });
  };



  const enrichEmployees = (filePath) => {
    const results = [];
  
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        const transformedData = transform(results);
        const enrichedEmployees = transformedData.reduce((enriched, employee) => {
          const existingEmployee = enriched.find((e) => e.nom === employee.nom && e.prenom === employee.prenom);
          if (existingEmployee) {
            existingEmployee.skill += `,${employee.skill}`;
            existingEmployee.isSenior = existingEmployee.isSenior || employee.age >= 40;
          } else {
            enriched.push({
              ...employee,
              isSenior: employee.age >= 40,
            });
          }
          return enriched;
        }, []);
  
        console.log(enrichedEmployees);
      });
  };
const filterEmployeesBySkill = (filePath) => {
    const results = [];
  
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        const transformedData = transform(results);
        const employeesBySkill = transformedData.reduce((acc, employee) => {
          if (!acc[employee.skill]) {
            acc[employee.skill] = [];
          }
  
          acc[employee.skill].push(`${employee.prenom} ${employee.nom}`);
  
          return acc;
        }, {});
  
        console.log(employeesBySkill);
      });
  }





const generateJsonFileBySkill = (filePath) => {
    const results = [];
  
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        const transformedData = transform(results);
        const employeesBySkill = transformedData.reduce((acc, employee) => {
          if (!acc[employee.skill]) {
            acc[employee.skill] = [];
          }
  
          acc[employee.skill].push(`${employee.prenom} ${employee.nom}`);
  
          return acc;
        }, {});
  
        fs.writeFile(EMPLOYEES_BY_SKILL_FILENAME, JSON.stringify(employeesBySkill), (err) => {
          if (err) {
            console.error(err);
            return;
          }
  
        });
      });
  }


module.exports = {transform, parseCSVFile, filterEmployeesOver40,enrichEmployees ,filterEmployeesBySkill,generateJsonFileBySkill,filterEmployeesUnder30};