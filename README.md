Write your own markup parser as micro building blocks.

## Demos

- [Markdown inlines + New](https://jsfiddle.net/ko3hubbu/20/): Some Markdown inlines formatting (no blocks) + other invented ones.

- [Daring Fireball Blocks](https://jsfiddle.net/md9316uu/5/): Just Markdown blocks, without inlines. (missing lists: WIP... )

## Why bother with this ?

We all love markdown, pandoc and the likes, but sometimes we may need extra-features, or LESS features. I have been through a bunch of markdown parsers myself and found a limited choice in that you always have to choose between `100kb-I-do-not-really-need-this` libs, and `1kb-I-wish-this-existed` libs.

**Markty** provides a zero calory core (just a cursive function using `.exec()`), then we enrich this core with some plugins that are basically a set of regex rules. Combining the `core` + the `rules` = you choose your balance between size/value.

At the end of the day, this library will be useful **if and only if** it can gather a maximum `rule` set we could pick ideas/code from.
Originally I thought about giving it as a Gist, but I think it's handy to be able to get it through `npm` as well :)

So we depend on **YOU** !!

## Let's create a shiny new Markdown rule !

> Requirement: make all text surrounded by two `~`, striked-through.

> e.g: `~~erase me~~`  should become   `<s>Erase me</s>` 



First install, `npm install markty --save` then:

```js
import markty from 'markty'

// we need a string to be parsed
let myString = `Please ~~erase this!~~`

// 1. starts with ~~, not followed by whitespace char, 
// 2. then match anything but exclusing any of: two line-breaks, a possible whitespace char, a whitespace char + one ~
// 3. match the first pattern (~~)
// That means only ~~hello world~~ will match but not: ~~ hello world~~, ~~hello world ~~, ~~ hello world ~~, etc...
// make this pattern look for the string globally
let matchingRule = /(\~{2})(?!\s)((?:(?!\n\n|\s?\~).)+)(\1)/g

// Answers the question: what should we do once we matched this ?
let businessRules = (string, match) => {
  if (match[2]) {
    // match returns an array containing all regex groups matched
    // in this case, match[1] is the 2nd group of our matchingRule regex
    // so match[1] represents the actual string between ~~
    return '<s>' + match[2] + '</s>'
  } 
}

// Call markty to process rules
let myParsedString = markty(myString, matchingRule, businessRules)

console.log(myParsedString)
// returns:
// Please <s>~~erase this!~~</s>
```


## Nesting

Here is where Markty starts to show its value.
By using the `true` option like this:  

`markty(myString, matchingRule, businessRules, true)` 

we tell Markty to continue processing it's own output until it finds any `matchingRule`'s pattern again. That means it indefinitely scans the **output** string for all possible occurences of the `matchingRule`. This is useful in nesting situations. For example:

```js
// This rule matches any string surrounded with doubling  `/`, `*`, `=`, `-`, `-`, `_`, `^`, and `~`.
let matchingRule = /([/*=\-_^~]{2})(?!\s)((?:(?!\n\n|\s?\1).)+)(\1)/g
``` 

We owe to do somthing with those matches, like 
> if a string is found enclosed by two == : surround it with `<mark></mark>`

> if a string is found enclosed by two // : surround it with `<em></em>`

> etc...

A business rule for this regex could look like:

```js
let businessRules = (string, match) => {
  let [token, opening, content, closing] = match, t

  const TAGS = ['em', 'strong', 'mark', 's', 'u', 'sup', 'sub']
  const PATTERNS = ['//', '**', '==', '--', '__', '^^', '~~']

  if (content) {
		t = TAGS[PATTERNS.indexOf(open)]
  	return `<${t}>${content}</${t}>`
  }
}
```

Then we can use Markty to process a random string:

```js
let myString = `
==//__**--marked italic underlined bold striked--**__//==
`

let myParsedString = markty(myString, matchingRule, businessRules)

console.log(myParsedString)
// returns:
// <mark>//__**--marked italic underlined bold striked--**__//</mark>

```

As you can see, this is not quite what we wanted: `<mark>//__**--marked italic underlined bold striked--**__//</mark>`.

To let Markty parse this result again, we need to allow it so by setting the last option to `true`:

```js
let myParsedString = markty(myString, matchingRule, businessRules, true) // added true to indefinitely match

console.log(myParsedString)
// returns:
// <mark><em><u><strong><s>marked italic underlined bold striked</s></strong></u></em></mark>
```

Huray !!
Markty RE-processed the output: RE-tried the `matchingRule` and RE-processed the `businessRules` until no further `matchingRule` was found.



## Is this markdown ?

Yes and No.
If you ask: "will it be commonMark compliant ?", then "NO NEVER".

Now, yes, you can re-write some markdown rules using `Markty`, and you could eventually use it as a PRE/POST-processor of any other parser: be free :)


## Credits

This was **HEAVILY** inspired by [snarkdown](https://github.com/developit/snarkdown) (big kudos to [@Jason Miller](https://github.com/developit)).

