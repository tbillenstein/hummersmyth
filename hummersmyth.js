/**
 * Hummersmyth - HTML renderer and DOM creator for Node.js and the browser.
 *
 * @copyright: Copyright (c) 2013-present, tbillenstein
 *
 * @author: tbillenstein <tb@thomasbillenstein.com> (https://thomasbillenstein.com)
 *
 * @license This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


(function(window)
{
	const Hummersmyth = {};

	if (typeof module === 'object' && module && typeof module.exports === 'object')
	{
		setupNode();
	}
	else
	{
		/* istanbul ignore next */
		setupBrowser();
	}

	function setupNode()
	{
		'use strict';

		module.exports = Hummersmyth;

		setupRenderer(Hummersmyth);
	}

	/* istanbul ignore next */
	function setupBrowser()
	{
		window.Hummersmyth = Hummersmyth;

		setupRenderer(Hummersmyth);

		// Ref: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
		// Ref: https://hacks.mozilla.org/2011/11/insertadjacenthtml-enables-faster-html-snippet-injection/
		Hummersmyth.appendTo = function(element, html)
		{
			insertAdjacentHTML(element, 'beforeend', html);
		};

		Hummersmyth.prependTo = function(element, html)
		{
			insertAdjacentHTML(element, 'afterbegin', html);
		};

		function insertAdjacentHTML(element, position, html)
		{
			if (element.jQuery)
			{
				if (position === 'afterbegin')
				{
					element.prepend(html);
				}
				else
				{
					element.append(html);
				}
			}
			else
			{
				if (typeof element === 'string')
				{
					element = document.getElementById(element[0] === '#' ? element.substr(1) : element);
				}

				element.insertAdjacentHTML(position, html);
			}
		}
	}

	function setupRenderer(hummersmyth)
	{
		// Will generate methods hummersmyth.a, hummersmyth.div, hummersmyth.span, etc.

		const elements = [
				'a', 'abbr', 'address', 'article', 'aside', 'audio',
				'b', 'bdi', 'bdo', 'blockquote', 'body', 'button',
				'canvas', 'caption', 'cite', 'code', 'colgroup',
				'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt',
				'em',
				'fieldset', 'figcaption', 'figure', 'footer', 'form',
				'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'html',
				'i', 'iframe', 'ins',
				'kbd',
				'label', 'legend', 'li',
				'main', 'map', 'mark', 'menu', 'menuitem', 'meter',
				'nav', 'noscript',
				'object', 'ol', 'optgroup', 'option', 'output',
				'p', 'pre', 'progress',
				'q',
				'rp', 'rt', 'ruby',
				's', 'samp', 'script', 'section', 'select', 'small', 'span', 'strong', 'style', 'sub', 'summary', 'sup',
				'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr',
				'u', 'ul',
				'var', 'video'
			],
			voidElements = [
				'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param',
				'source', 'track', 'wbr'
			];

		populate(elements, false);
		populate(voidElements, true);
		populateOther();

		function populate(elements, isVoid)
		{
			elements.forEach(function(element)
			{
				hummersmyth[element] = function()
				{
					return render(element, arguments, isVoid);
				};
			});
		}

		function populateOther()
		{
			hummersmyth.doctype = function() { return '<!DOCTYPE html>'; };
		}

		function render(element, args, isVoid)
		{
			const
				LEFT_ANGLE_BRACKET = '<',
				LEFT_ANGLE_BRACKET_SLASH = '</',
				RIGHT_ANGLE_BRACKET = '>',
				DOUBLE_QUOTES = '"';

			var attributes = {},
				elementAttributes = '',
				elementContent = '',
				startTag,
				endTag;

			// If args is an arguments object convert it to an array.
			// Then flatten this array (args) so that there are no more nested arrays.

			args = flatten(isArray(args) ? args : Array.prototype.slice.call(args));

			// Merge all attribute objects and concatenate (html) strings.
			args.forEach(function(arg)
			{
				if (isObject(arg))
				{
					attributes = merge({}, attributes, arg);
				}
				else if (!isUndefined(arg) && !isNull(arg))
				{
					elementContent += arg;
				}
			});

			// Build html attributes string.
			each(attributes, function(value, key)
			{
				elementAttributes += ' ' + key + '=' + DOUBLE_QUOTES + value + DOUBLE_QUOTES;
			});

			startTag = LEFT_ANGLE_BRACKET + element + elementAttributes + RIGHT_ANGLE_BRACKET;

			// Wrap with element's tag and return the stuff.
			if (isVoid)
			{
				return startTag;
			}

			endTag = LEFT_ANGLE_BRACKET_SLASH + element + RIGHT_ANGLE_BRACKET;

			return startTag + elementContent + endTag;
		}

		function isUndefined(value)
		{
			return value === undefined;
		}

		function isNull(value)
		{
			return value === null;
		}

		function isObject(value)
		{
			return value !== null && (typeof value === 'object');
		}

		function isArray(value)
		{
			return Array.isArray(value);
		}

		function each(collection, iteratee)
		{
			var key;

			for (key in collection)
			{
				iteratee(collection[key], key);
			}
		}

		function flatten(array)
		{
			return [].concat.apply([], array);
		}

		function merge(object, src1, src2)
		{
			m(object, src1);
			m(object, src2);

			return object;

			function m(object, src)
			{
				var key;

				for (key in src)
				{
					object[key] = src[key];
				}
			}
		}
	}
})(this);
