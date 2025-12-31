Hummersmyth
===========

`Hummersmyth` is a tiny and simple yet powerful HTML renderer and DOM creator for Node.js and the browser.
`Hummersmyth` has no dependencies.


Getting started
---------------

### Node.js

Install `hummersmyth` using npm.

```shell
npm install hummersmyth --save
```

Then require it into any module.

```js
const Hummersmyth = require('hummersmyth');
```

### Browser
`Hummersmyth` has no dependencies, which makes it easy to include in a browser.

You can download the latest release from the repository
* [`hummersmyth.js`](https://github.com/tbillenstein/hummersmyth/blob/master/hummersmyth.js) unminified, including comments
* [`hummersmyth.min.js`](https://github.com/tbillenstein/hummersmyth/blob/master/hummersmyth.min.js) minified version

Use a script tag to directly add `Hummersmyth` to the global scope.

```html
<script src="hummersmyth.min.js"></script>
```


Usage
-----
```js
const 
  ul = Hummersmyth.ul,
  li = Hummersmyth.li,  
  p = Hummersmyth.p,
  input = Hummersmyth.input,
  div = Hummersmyth.div;

// Render HTML snippet. Attributes are specified as plain JSON objects.
// Each tag function supports a variable list of arguments. 
// Attributes descriptors should be passed before 'content' for better readability,
// but can also be mixed with element content.

var html = 
  ul({ id: 'the-list', class: "list" },
    li({ class: 'first-item'}, "First item"),
    li("Second item"),
    li("Third item")
  );

// -> html === <ul id="the-list" class="list"><li class="first-item">First item</li><li>Second item</li><li>Third item</li></ul>'

html = 
  p(
    input({ id: 'uid', type: 'text', value: "abc123" }),

    // Multiple attributes descriptors will be merged.
    input({ type: 'password' }, { id: 'pw' }, { class: 'password' })
  );

// -> html === <p><input id="uid" type="text" value="abc123"><input type="password" id="pw" class="password"></p>


// Attributes descriptors and element content can also be given as an array.
html = 
  div(
    [ 
      { id: "i1" }, 
      p("abc"), 
      { class: 'xyz' } 
    ]
  );

// -> html === <div id="i1" class="xyz"><p>abc</p></div>
```


Examples
--------

### Render complete HTML page

```js
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
```


### Dynamically update DOM

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hummersmyth example</title>
</head>
<body>
    <script src="hummersmyth.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function()
      {
        // div is just a shortcut ...
        const div = Hummersmyth.div;

        var snippet = div({ id: 'main' }, "Blah");

        // Hummersmyth exports 2 methods to add html snippets to an existing DOM element.
        // - appendTo(element, html)
        // - prependTo(element, html)
        Hummersmyth.appendTo(document.body, snippet);
      });
    </script>
</body>
</html>
```

### Dynamically update DOM using jQuery


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hummersmyth example</title>
</head>
<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="hummersmyth.min.js"></script>
    <script>
        $(document).ready(function()
        {
          // div is just a shortcut ...
          const div = Hummersmyth.div;

          var snippet = div({ id: 'main' }, "Blah");

          $('body').append(snippet);
        });
    </script>
</body>
</html>
```

More examples
-------------
Please refer to the [test spec](https://github.com/tbillenstein/hummersmyth/blob/master/spec/HummersmythSpec.js) for more 
examples.


API
---

Hummersmyth exports the following list of HTML tags as functions
- a, abbr, address, area, article, aside, audio
- b, base, bdi, bdo, blockquote, body, br, button
- canvas, caption, cite, code, col, colgroup
- data, datalist, dd, del, details, dfn, div, dl, dt
- em, embed
- fieldset, figcaption, figure, footer, form 
- h1, h2, h3, h4, h5, h6, head, header, hr, html
- i, iframe, img, input, ins
- kbd, keygen
- label, legend, li, link
- main, map, mark, menu, menuitem, meta, meter
- nav, noscript
- object, ol, optgroup, option, output
- p, param, pre, progress
- q
- rp, rt, ruby
- s, samp, script, section, select, small, source, span, strong, style, sub, summary, sup
- table, tbody, td, textarea, tfoot, th, thead, time, title, tr, track
- u, ul
- var, video
- wbr

In the browser 2 more methods are available to add html snippets to an existing DOM element.
- `Hummersmyth.appendTo(element, html)`
- `Hummersmyth.prependTo(element, html)`

Parameter `element` can be an existing DOM element, a string like `#id-of-element` or `id-of-element` 
to reference the target element by id, or a jQuery object.


Testing
-------
We use 
* [JSHint](https://jshint.com/) for static code analysis.
* [Jasmine testing framework](https://jasmine.github.io/index.html) for testing.
* [Karma test runner](https://karma-runner.github.io/latest/index.html) for testing in the browser.
* [Istanbul test coverage framework](https://istanbul.js.org/) for tracking test coverage.

Steps to be taken
* Clone or download the repository.
* Change into the project directory.
* Use `npm install` to install all development dependencies.
* Use `npm runt lint` to run static code analysis. 
* Use `npm test` to run the tests. 
* Use `npm run coverage` to track test coverage. 
* The output should display successful execution results and a code coverage map.


Build
-----
* Clone or download the repository.
* Change into project directory.
* Use `npm run build` in project directory to build `hummersmyth.min.js` from `hummersmyth.js`.


Contribution
------------
Please use [Github issues](https://github.com/tbillenstein/hummersmyth/issues) for requests.

Pull requests are welcome.


Issues
------
We use GitHub issues to track bugs. Please ensure your bug description is clear and has sufficient instructions to be 
able to reproduce the issue.

The absolute best way to report a bug is to submit a pull request including a new failing test which describes the bug. 
When the bug is fixed, your pull request can then be merged.

The next best way to report a bug is to provide a reduced test case on jsFiddle or jsBin or produce exact code inline 
in the issue which will reproduce the bug.


Support
-------
* Send us an email: [tb@thomasbillenstein.com](mailto:tb@thomasbillenstein.com)
* Follow us on Twitter: [@tbillenstein](https://x.com/tbillenstein/)


Changelog
---------
v1.1.0
* Update npm modules.
* Update and extend test environment.
* Add static code analysis tool JSHint.
* Add Karma test runner.
* Fix JSHint issues.
* Replace uglify-js by terser for minification.
* Update README.

v1.0.3
* Update npm modules.

v1.0.2
* Update npm modules.

v1.0.1
* Update npm modules.

v1.0.0
* Initial public release


License
-------
Copyright (c) 2013-present, tbillenstein. `Hummersmyth` is licensed under the 
[MIT License](https://github.com/tbillenstein/hummersmyth/blob/master/LICENSE).
