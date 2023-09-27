
function outf(text) {
  var mypre = document.getElementById("problem-output");
  mypre.innerHTML = mypre.innerHTML + text;
}

function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

function runPy(prog, onSuccess, onFailure) {
  Sk.pre = "output";
  Sk.configure({ output: outf, read: builtinRead, __future__: Sk.python3 });
  var myPromise = Sk.misceval.asyncToPromise(function () {
    return Sk.importMainWithBody("<stdin>", false, prog, true);
  });
  myPromise.then(onSuccess, onFailure);
}

// Run code using Skulpt
function runIt() {
  document.getElementById("problem-output").innerHTML = '';
  runPy(jar.toString(),
    function (mod) {
      console.log('Skulpt: program executed successfully');
    },
    function (err) {
      console.log(err.toString());
      var container = document.createElement("span");
      container.appendChild(document.createTextNode(err));
      container.style.color = "red";
      document.getElementById("problem-output").appendChild(container);
    });
}

// Run tests and provide feedback
function submitIt(id) {
  var tests = document.getElementById("problem-unittests").value;
  document.getElementById("problem-output").innerHTML = '';
  runPy(jar.toString() + '\n' + tests,
    function (mod) {
      var results = document.getElementById("problem-results");
      results.innerHTML = "Congratulations! Problem solved successfully.";
      results.style.color = "green";
      setProblemSolved(id, true);
      console.log('Skulpt: program executed successfully');
    },
    function (err) {
      console.log(err.toString());
      var results = document.getElementById("problem-results");
      results.innerHTML = "Sorry, your code is incorrect. See error below:";
      results.style.color = "red";
      var container = document.createElement("span");
      container.appendChild(document.createTextNode(err));
      container.style.color = "red";
      document.getElementById("problem-output").appendChild(container);
    });
}

// Setup CodeJar editor:
let jar = CodeJar(document.querySelector(".editor"), withLineNumbers(Prism.highlightElement, {
  color: '#000',
  backgroundColor: 'rgb(232, 232, 232)'
}), {
  tab: ' '.repeat(4),
  indentOn: /[:(\[]$/,
});
jar.updateCode("");

// Database of problems:
// id, title, description, defaultcode, unittests
const problemset = [
  { id: "SumN", title: "Sum from <code>1</code> to <code>n</code>", description: "<p> Write a function <code>sum_to(n)</code> that adds up all the numbers from <code>1</code> up to <code>n</code>. If you call <code>sum_to(10)</code>, for example, it should return <code>55</code>. </p>", defaultcode: "def sum_to(n):\n    # Your code goes here\n\nprint(sum_to(10))  # Expected: 55", unittests: "tests = [(n, sum(range(n+1))) for n in [0,10,15,100,98765]]\nfor n, ans in tests:\n    assert ans == sum_to(n), f'sum_to({n}) should be {ans} but was {sum_to(n)}'\n" },
  { id: "SumEven", title: "Sum even numbers", description: "<p> Write a function <code>sum_evens(n)</code> that adds up all the <i>even</i> numbers from <code>1</code> up to <code>n</code>. If you call <code>sum_evens(10)</code>, for example, it should return <code>2+4+6+8+10=30</code>. </p>", defaultcode: "def sum_evens(n):\n    # Your code goes here\n\nprint(sum_evens(10))  # Expected: 30", unittests: "tests = [(n, sum(range(0,n+1,2))) for n in [0,10,15,100,98765]]\nfor n, ans in tests:\n    assert ans == sum_evens(n), f'sum_evens({n}) should be {ans} but was {sum_evens(n)}'\n" },
]

// Ensure problem IDs are distinct:
const problemIds = new Set();
for (const problem of problemset) {
  if (problemIds.has(problem.id)) {
    window.alert("ERROR: found duplicate problem ID: " + problem.id);
  }
  problemIds.add(problem.id);
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

const usingLocalStorage = storageAvailable("localStorage");

// Progress state: map from problem ID to solved=true/false when no local storage
const progress = new Map();

/** Returns true if the problem with the given ID is solved */
function getProblemSolved(id) {
  if (usingLocalStorage) {
    return window.localStorage.getItem(id) === "true";
  } else {
    return progress.get(id) === true;
  }
}

/** Set the problem with the given ID to be solved (true) or unsolved (false)  */
function setProblemSolved(id, solved) {
  if (usingLocalStorage) {
    window.localStorage.setItem(id, solved ? "true" : "false");
  } else {
    progress.set(id, solved);
  }
}

const problemPage = document.getElementById("problem");
const problemListPage = document.getElementById("problem-list");
const problemList = document.getElementById("problem-ul");

function showProblemList() {
  // Re-generate problem list to update solved status (TODO optimize)
  problemList.innerHTML = "";
  for (const problem of problemset) {
    let li = document.createElement("li");
    let link = document.createElement("a");
    link.innerHTML = problem.title;
    link.href = "#";
    link.onclick = function () { showProblem(problem) };
    li.appendChild(link);
    li.classList.add(getProblemSolved(problem.id) ? "problem-solved" : "problem-unsolved");
    problemList.appendChild(li);
  }

  // Show problem list and hide problem & editor
  problemListPage.style.display = "";
  problemPage.style.display = "none";
}

function showProblem(problem) {
  // Show problem:
  document.getElementById("problem-title").innerHTML = problem.title;
  document.getElementById("problem-description").innerHTML = problem.description;
  document.getElementById("problem-unittests").innerHTML = problem.unittests;
  jar.updateCode(problem.defaultcode);
  // Setup submit button:
  document.getElementById("submit-button").onclick = function () { submitIt(problem.id) };
  // Clear output and results:
  document.getElementById("problem-output").innerHTML = '';
  document.getElementById("problem-results").innerHTML = '';
  // Hide problem list and show problem & editor
  problemListPage.style.display = "none";
  problemPage.style.display = "";
}

// Show problem list on startup:
showProblemList();
