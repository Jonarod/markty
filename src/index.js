/* eslint no-unused-vars: "warn" */
export default function markty(str, reg, rules, unlimited = false) {
  let prev, match, chunk, last = 0, out = '';
  let tokenizer = reg;
  while ( (match = tokenizer.exec(str)) ) {
    prev = str.substring(last, match.index);
    last = tokenizer.lastIndex;

    if (rules && typeof(rules) === "function") {
      chunk = rules(str, match);
    } else {
      chunk = rules;
    }

    out += prev;
    out += chunk;
  }
  out += str.substring(last);

  if( tokenizer.test(out) && unlimited === true ) {
    return markty(out, new RegExp(tokenizer), rules, true);
  } else {
    return out;
  }
}
