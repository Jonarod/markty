import { expect } from 'chai';
import markty from '../src';

describe('markty()', () => {
	describe('Simple', () => {
			it('parses simple rule', () => {
				expect(markty('*hello world*', /(\*)([^*]+?)(\*)/g, (s, m) => {
          if( m[2] ){
            return '<em>'+ m[2] +'</em>';
          }
        })).to.equal('<em>hello world</em>');
			});
  });
  describe('Nesting: unlimited', () => {
    it('does NOT nest without TRUE', () => {
      expect(markty('==//__**--marked italic underlined bold striked--**__//==', /([/*=\-_^~]{2})(?!\s)((?:(?!\n\n|\s?\1).)+)(\1)/g, (s, m) => {
        let t;
        const TAGS = ['em', 'strong', 'mark', 's', 'u', 'sup', 'sub'];
        const PATTERNS = ['//', '**', '==', '--', '__', '^^', '~~'];
        if (m[2]) {
          t = TAGS[PATTERNS.indexOf(m[1])];
          return `<${t}>${m[2]}</${t}>`;
        }
      })).to.equal('<mark>//__**--marked italic underlined bold striked--**__//</mark>');
    });
    it('NESTS using TRUE', () => {
      expect(markty('==//__**--marked italic underlined bold striked--**__//==', /([/*=\-_^~]{2})(?!\s)((?:(?!\n\n|\s?\1).)+)(\1)/g, (s, m) => {
        let t;
        const TAGS = ['em', 'strong', 'mark', 's', 'u', 'sup', 'sub'];
        const PATTERNS = ['//', '**', '==', '--', '__', '^^', '~~'];
        if (m[2]) {
          t = TAGS[PATTERNS.indexOf(m[1])];
          return `<${t}>${m[2]}</${t}>`;
        }
      }, true)).to.equal('<mark><em><u><strong><s>marked italic underlined bold striked</s></strong></u></em></mark>');
    });
  });
});
