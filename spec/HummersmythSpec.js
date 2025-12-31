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


var Hummersmyth = Hummersmyth || require('../hummersmyth');

describe("Hummersmyth", function()
{
	const h = Hummersmyth;

	/***************************************************************************************************************
	 * General.
	 **************************************************************************************************************/
	it("should export all expected HTML tags", function()
	{
		const 
			allTags = [
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
				'var', 'video',
				'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param',
				'source', 'track', 'wbr'
			];

		allTags.forEach(function(tag)
		{
			expect(typeof Hummersmyth[tag]).toBe('function');
		});
	});

	it("should render correct html.", function()
	{
		expect(h.div("blah")).toBe('<div>blah</div>');
	});

	it("should render correct html.", function()
	{
		expect(h.code({ title: "U+003C LESS-THAN SIGN"}, "&lt;")).toBe(
			'<code title="U+003C LESS-THAN SIGN">&lt;</code>');
	});

	/***************************************************************************************************************
	 * Empty elements.
	 **************************************************************************************************************/
	it("should render empty elements.", function()
	{
		expect(h.div()).toBe('<div></div>');
	});

	it("should render empty elements.", function()
	{
		expect(h.div(h.div(), h.div())).toBe('<div><div></div><div></div></div>');
	});

	/***************************************************************************************************************
	 * Attributes.
	 **************************************************************************************************************/
	it("should handle empty attributes.", function()
	{
		expect(h.div({})).toBe('<div></div>');
	});

	it("should handle attributes.", function()
	{
		expect(h.div({ id: 'theId' }, "blah")).toBe('<div id="theId">blah</div>');
	});

	it("should handle attributes.", function()
	{
		expect(h.div({ id: 'theId', class: 'theClass' }, "blah")).toBe(
			'<div id="theId" class="theClass">blah</div>');
	});

	it("should handle attributes.", function()
	{
		expect(h.div({ id: 'theId', class: 'class1 class2 class3' }, "blah")).toBe(
			'<div id="theId" class="class1 class2 class3">blah</div>');
	});

	/***************************************************************************************************************
	 * Elements and multiple attribute configurations.
	 **************************************************************************************************************/
	it("should handle multiple attribute configurations.", function()
	{
		expect(h.div({ id: 'i1' }, { class: 'xyz' })).toBe('<div id="i1" class="xyz"></div>');
	});

	it("should handle multiple attribute configurations, mixed with elements.", function()
	{
		expect(h.div({ id: 'i1' }, h.p("abc"), { class: 'xyz' }, h.span("xyz"))).toBe(
			'<div id="i1" class="xyz"><p>abc</p><span>xyz</span></div>');
	});

	it("should handle multiple attribute configurations, overwriting attributes.", function()
	{
		expect(h.div({ class: 'abc' }, { class: 'xyz' })).toBe('<div class="xyz"></div>');
	});

	it("should handle multiple attribute configurations, overwriting attributes.", function()
	{
		expect(h.div({ id: 'i1', class: 'abc' }, { id: 'i2', class: 'xyz' })).toBe(
			'<div id="i2" class="xyz"></div>');
	});

	it("should handle multiple attribute configurations, overwriting attributes.", function()
	{
		expect(h.div({ id: 'i1', class: 'abc' }, { class: 'xyz' })).toBe('<div id="i1" class="xyz"></div>');
	});

	it("should handle multiple attribute configurations, overwriting attributes.", function()
	{
		expect(h.div({ class: 'abc' }, { id: 'i2', class: 'xyz' })).toBe('<div class="xyz" id="i2"></div>');
	});

	/***************************************************************************************************************
	 * Parameter passing as array.
	 **************************************************************************************************************/
	it("should handle parameter passing as array.", function()
	{
		expect(h.div([])).toBe('<div></div>');
	});

	it("should handle parameter passing as array.", function()
	{
		expect(h.div([ { id: "i1" }, { class: 'xyz' } ])).toBe('<div id="i1" class="xyz"></div>');
	});

	it("should handle parameter passing as array.", function()
	{
		expect(h.div([ h.p("abc"), h.p("def") ])).toBe('<div><p>abc</p><p>def</p></div>');
	});

	it("should handle parameter passing as array.", function()
	{
		expect(h.div([ { id: "i1" }, h.p("abc"), { class: 'xyz' } ])).toBe(
			'<div id="i1" class="xyz"><p>abc</p></div>');
	});

	it("should handle parameter passing as array.", function()
	{
		expect(h.div([ { id: "i1" }, h.p("abc") ], [ { class: 'xyz' } ])).toBe(
			'<div id="i1" class="xyz"><p>abc</p></div>');
	});

	/***************************************************************************************************************
	 * Void elements.
	 **************************************************************************************************************/
	it("should handle void elements.", function()
	{
		expect(h.input({ type: 'password' })).toBe('<input type="password">');
	});

	it("should handle void elements.", function()
	{
		expect(h.input({ id: 'theId', type: 'text', value: "theValue" })).toBe(
			'<input id="theId" type="text" value="theValue">');
	});

	it("should handle void elements.", function()
	{
		expect(h.img({ src: 'http://yourserver:1335/blah.png' })).toBe(
			'<img src="http://yourserver:1335/blah.png">');
	});

	/***************************************************************************************************************
	 * Void elements and multiple attribute configurations.
	 **************************************************************************************************************/
	it("should handle void elements and multiple attribute configurations.", function()
	{
		expect(h.input({ type: 'password' }, { id: 'i1' }, { class: 'abc' })).toBe(
			'<input type="password" id="i1" class="abc">');
	});

	/***************************************************************************************************************
	 * Nested elements.
	 **************************************************************************************************************/
	it("should handle nested elements.", function()
	{
		var html =
				h.div(
					h.span("blah1"),
					h.span("blah2"),
					h.span("blah3")
				);

		expect(html).toBe('<div><span>blah1</span><span>blah2</span><span>blah3</span></div>');
	});

	it("should handle nested elements including attributes.", function()
	{
		var html =
				h.ul({ id: 'theId', class: 'nobullets' },
					h.li({ style: "float:left;"}, "blah1"),
					h.li({ style: "float:left;"}, "blah2"),
					h.li({ style: "float:right;"}, "blah3")
				);

		expect(html).toBe(
			'<ul id="theId" class="nobullets"><li style="float:left;">blah1</li><li style="float:left;">blah2</li><li style="float:right;">blah3</li></ul>');
	});

	/***************************************************************************************************************
	 * Other elements.
	 **************************************************************************************************************/
	it("should handle other elements.", function()
	{
		var html = h.doctype();

		expect(html).toBe('<!DOCTYPE html>');
	});

	
	/***************************************************************************************************************
	 * Render some snippets.
	 **************************************************************************************************************/
	it("should render complete page.", function()
	{
		const 
			html = Hummersmyth.html,
			head = Hummersmyth.head,
			meta = Hummersmyth.meta,
			title = Hummersmyth.title,
			link = Hummersmyth.link,
			body = Hummersmyth.body,
			div = Hummersmyth.div,
			script = Hummersmyth.script;

		var page = 
			html(
				head(
					meta({ charset: 'utf-8' }),
					meta({ 
						'http-equiv': 'X-UA-Compatible', 
						content: 'IE=edge'
					}),
					meta({
						name: 'viewport',
						content: 'width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0'
					}),	
					title("My page"),
					link({ 
						href: 'https://fonts.googleapis.com/css?family="Source+Sans+Pro"', 
						rel: 'stylesheet' 
					})
				),
				body(
					div({ id: 'main' }),
					script({ 
						src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', 
						language: 'javascript', 
						type: 'text/javascript' 
					}),
					script({ 
						src: '/static/index.js', 
						language: 'javascript', 
						type: 'text/javascript' 
					})
				)
			);

		expect(page).toBe(
			'<html>' + 
			'<head>' + 
			'<meta charset="utf-8">' + 
			'<meta http-equiv="X-UA-Compatible" content="IE=edge">' + 
			'<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">' + 
			'<title>My page</title>' +
			'<link href="https://fonts.googleapis.com/css?family=\"Source+Sans+Pro\"" rel="stylesheet">' +			
			'</head>' + 
			'<body>' + 
			'<div id="main"></div>' + 
			'<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" language="javascript" type="text/javascript"></script>' + 
			'<script src="/static/index.js" language="javascript" type="text/javascript"></script>' + 
			'</body>' + 
			'</html>');	
	});

	it("should render simple snippet.", function()
	{
		const 
			ul = Hummersmyth.ul,
			li = Hummersmyth.li;

		var html = 
			ul({ id: 'the-list', class: "list" },
				li({ class: 'first-item'}, "First item"),
				li("Second item"),
				li("Third item")
			);

		expect(html).toBe('<ul id="the-list" class="list"><li class="first-item">First item</li><li>Second item</li><li>Third item</li></ul>');	
	});

	it("should render simple snippet.", function()
	{
		const 
			p = Hummersmyth.p,
			input = Hummersmyth.input;

		var html = 
			p(
				input({ id: 'uid', type: 'text', value: "abc123" }),
				input({ type: 'password' }, { id: 'pw' }, { class: 'password' })
			);

		expect(html).toBe('<p><input id="uid" type="text" value="abc123"><input type="password" id="pw" class="password"></p>');	
	});
});
