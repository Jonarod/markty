# Parse TOML

TOML stands for Tom's Obvious, Minimal Language. Here is some good reads about it: [toml](https://github.com/toml-lang/toml)

This snippet matches TOML's headers, keys and values with a lazier definition: 
- key/value pairs can be separated with `=` (classic TOML) or `:` (added)
- values strings can be wrapped with `"` (classic TOML) **or NOT** (added)

This means, this INVALID TOML is still parsed:

```toml
[[product]]
Name: This is a one liner string without quotes, like in YAML
Description: "Now here is a string a bit longer
and with line breaks. In fact line-breaks are supported
as long as the content is surrounded by double-quotes"
Quantity: 2

[[product]]
Name = "This is a another line WITH quotes, like in TOML"
Description = "Look to my left, I have an equal sign"
Quantity = 7

```
First `product` is defined lazily: double-quote are missing in the `Name`.
Key/Value separator is `:` instead of `=`.
So the matching rule in this code is more user-friendly than the real TOML's specs. 
Users could "forget" both `=` and surronding `"`: we would still parse it :)


However, the processing rules doesn't do much for now, but it presents how we could manipulate TOML's `Headers`, `keys` and `values`. 
