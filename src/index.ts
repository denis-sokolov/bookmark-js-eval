function cleanEval(code: string): unknown {
  const f = Function('"use strict";' + code);
  return f();
}

const params = new URLSearchParams(location.search);
const jss = params.getAll("js");

const $ = (selector: string) => document.querySelector(selector);
const input = $(".input") as HTMLDivElement;
const output = $(".output") as HTMLDivElement;
const code = $("#code") as HTMLTextAreaElement;
const link = $("#output-link") as HTMLLinkElement;

if (jss.length === 0) {
  input.hidden = false;
} else {
  output.hidden = false;
}
jss.forEach((js) => {
  console.log("Evaluating", js);
  try {
    const result = cleanEval(js);
    console.log(result);
    if (result) output.innerText = JSON.stringify(result);
  } catch (err) {
    output.innerText = err.message + "\n" + err.stack;
  }
});

const generateLink = () =>
  (link.href = location.origin + "?js=" + encodeURIComponent(code.value));
code.addEventListener("input", generateLink);
generateLink();
