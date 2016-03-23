# ejs-on-command

A command line interface for [ejs](https://github.com/tj/ejs) with support for piping.

## install

Install locally:

```
$ npm install ejs-on-command
```

Install globally:

```
$ npm install -g ejs-on-command
```

## usage

Render ejs from stdout to stdout:

```
$ echo "<h1><%= 'hello world' %></h1>" | ejs-on-command
```

With options:

```
$ echo "<h1><%= message %></h1>" | ejs-on-command -j '{"message":"hello world"}'
```

With options from json file:

```
$ echo "<h1><%= message %></h1>" | ejs-on-command -j options.json
```

Write to a destination:

```
$ echo "<h1><%= message %></h1>" | ejs-on-command -d output.html
```

Read from a destination:

```
$ ejs-on-command -d output.html input.ejs
```

Or perhaps make it part of your build in your `package.json`:

```
"scripts":{
	
	"render": "ejs-on-command input.ejs > output.html"

}
```

## roadmap

- iron out problems with Windows
- make use of other ejs features (cache etc)
- build tests
