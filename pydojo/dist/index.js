
function outf(text) {
  var mypre = document.getElementById("output");
  mypre.innerHTML = mypre.innerHTML + text;
}

function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

// Run code using Skulpt
function runIt() {
  document.getElementById("output").innerHTML = '';
  Sk.pre = "output";
  Sk.configure({ output: outf, read: builtinRead, __future__: Sk.python3 });
  var myPromise = Sk.misceval.asyncToPromise(function () {
    return Sk.importMainWithBody("<stdin>", false, jar.toString(), true);
  });
  myPromise.then(function (mod) {
    console.log('success');
  },
    function (err) {
      console.log(err.toString());
      var container = document.createElement("span");
      container.appendChild(document.createTextNode(err));
      container.style.color = "red";
      document.getElementById("output").appendChild(container);
    });
}

// Run tests and provide feedback
function submitIt() {
  var tests = document.getElementById("unittests").value;
  document.getElementById("output").innerHTML = '';
  Sk.pre = "output";
  Sk.configure({ output: outf, read: builtinRead, __future__: Sk.python3 });
  var myPromise = Sk.misceval.asyncToPromise(function () {
    return Sk.importMainWithBody("<stdin>", false, jar.toString() + '\n' + tests, true);
  });
  myPromise.then(function (mod) {
    var results = document.getElementById("yourresults");
    results.innerHTML = results.innerHTML + "Congratulations! Problem solved successfully.";
    results.style.color = "green";
    console.log('success');
  },
    function (err) {
      console.log(err.toString());
      var container = document.createElement("span");
      container.appendChild(document.createTextNode(err));
      container.style.color = "red";
      document.getElementById("output").appendChild(container);
    });
}

let jar = CodeJar(document.querySelector(".editor"), withLineNumbers(Prism.highlightElement, {
  color: '#000',
  backgroundColor: 'rgb(232, 232, 232)'
}), {
  tab: ' '.repeat(4),
  indentOn: /[:(\[]$/,
});
jar.updateCode(document.getElementById("defaultcode").value);