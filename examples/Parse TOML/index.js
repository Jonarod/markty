let tomlLines = '^ *([^\\s]+) *[=:] *"((?!")[\\w\\W]+?)"|^ *([^\\s]+) *[=:] *\\[((?!\\])[\\w\\W]+?)\\]|^ *([^\\s]+) *[=:] *(.+) *'
let tomlHeaders = '^ *\\[(\\[)?\\"?(.*?)\\"?\\]\\]?(?= *$)'
let matchThis = new RegExp(`${tomlLines}|${tomlHeaders}|^(.+)$`, 'gm')

let result = markty(TOML, matchThis, (string, match) => {
	let [token,
		key_1, val_1,
		key_2, val_2,
		key_3, val_3,
    header_double, header,
    trash
  ] = match, k, v
  if (key_1 || key_2 || key_3){
  	k = `"${key_1 || key_2 || key_3}"`
    if (val_1) {v = `"${val_1}"`}
    if (val_2) {v = `[${val_2}]`}
    // val_3 is important: it is a value NOT surrounded by double-quotes
    if (val_3) {
    // if true, then val_3 is a number (exception for '' and []...)
    v = (+val_3 === +val_3) ? val_3 : `"${val_3}"`
    // In reality, further tests should be made against val_3
    // Is it inf ? hex ? date ? ...
  }
		    
    return k + ' = ' + v + '<br />'
  } 
  else if (header) return header_double ? '[["'+header+'"]]'  + '<br />': '["'+header+'"]' + '<br />'
  // If a user puts a value on multiple lines (using line-breaks), WITHOUT using double-quotes
  // everything coming after the line-break is trash
  else if (trash) return ''
})
