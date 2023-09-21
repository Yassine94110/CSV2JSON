/**
 * TODO :
 * Exercice duration : 90 minutes
 * With the given CSV file "employees.csv", create a JSON file "employeeBySkill.json" with following data :
 [
     { nom: 'cadoret', prenom: 'gael', age: '29', skill: 'php' },
     { nom: 'cadoret', prenom: 'gael', age: '29', skill: 'javascript' },
     { nom: 'cadoret', prenom: 'gael', age: '29', skill: 'nodejs' },
     { nom: 'dupond', prenom: 'bob', age: '42', skill: 'nodejs' },
     { nom: 'coeur de lion', prenom: 'richard', age: '22', skill: 'go' },
     { nom: 'coeur de lion', prenom: 'richard', age: '22', skill: 'python' }
 ]
 * TODO :
 * 1 - Run command "yarn test" (watcher is active) !
 * 2 - Create you own "transform" function to match expected result to make the test pass (30 min)
 *     NB : you'll have to duplicate employees in order to have single skill by employee
 * 3 - Parse CSV file and use your "transform" function (15min)
 * 4 - Refactor your code to respect Functional Programming (FP) paradigme (30 min)
 * 5 - Create new functions to filter employees by age under 30 and over 40 and use function composition (15 min)
 * 6 - Create new function to enrich employees with new boolean property "isSenior" (isSenior = age of employee >= 40)
 * 7 - ADVANCED: create new function to group employees by skills (ex: {nodejs: ["gael cadoret", "bob dupond"], (...)})
 * 8 - Create a JSON file "employeeBySkill.json" with transformed results (3 min)
 * 9 - ADVANCED: "Done!" log must be the last message shown (NB: add log to watch order execution function)
 */
 const {
    parseCSVFile,
    filterEmployeesOver40,
    enrichEmployees,
    filterEmployeesBySkill,
    generateJsonFileBySkill,
    filterEmployeesUnder30,
  } = require("./modules/index");
  const EMPLOYEES_FILENAME = "employees.csv";
  const EMPLOYEES_BY_SKILL_FILENAME = "employeesBySkill.json";
  
  const readline = require("readline");
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  const waitForEnter = () => {
    return new Promise((resolve) => {
      rl.question("Press Enter to continue...", () => {
        resolve();
      });
    });
  };
  
  (async () => {
    try {
      console.clear(); 
      console.log("Step 3: Parsing CSV file and transforming data...");
      await parseCSVFile(EMPLOYEES_FILENAME);
      await waitForEnter();
  
      console.clear(); 
      console.log("Step 5.1: Filtering employees over 40...");
      await filterEmployeesOver40(EMPLOYEES_FILENAME);
      await waitForEnter();
  
      console.clear();
      console.log("Step 5.2: Filtering employees under 30...");
      await filterEmployeesUnder30(EMPLOYEES_FILENAME);
      await waitForEnter();
  
      console.clear();
      console.log("Step 6: Enriching employees with the isSenior property...");
      await enrichEmployees(EMPLOYEES_FILENAME);
      await waitForEnter();
  
      console.clear();
      console.log("Step 7: Grouping employees by skills...");
      await filterEmployeesBySkill(EMPLOYEES_FILENAME);
      await waitForEnter();
  
      console.clear();
      console.log("Step 8: Generating JSON file in employeeBySkill.json...");
      await generateJsonFileBySkill(EMPLOYEES_FILENAME);
  
      console.log("Done!");
      rl.close();
    } catch (error) {
      console.error("Error:", error);
    }
  })();
  