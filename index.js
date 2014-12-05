#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

program
  .version('1.0.0')
  .option('-j, --json [path]', 'Provide a JSON string or a path to a JSON file.', undefined)
  .option('-d, --destination [path]', 'Path to output destination. If none is provided, output will be piped to stdout.', undefined)
  .parse(process.argv);

var input = '';
var output = '';
var options = {};

read();

function read(){

	if(program.args.length){

		input = fs.readFileSync( path.join( process.cwd(), program.args[0] ), {encoding:'utf-8'} );

		write();

	}else{

		// resume and set the encoding of stdin stream
		process.stdin.resume();
		process.stdin.setEncoding('utf-8');

		// set our read stream to stdin
		process.stdin.on('data', function(data){ input += data });
		process.stdin.on('end', function(){ write(); });

	}
}

function write(){

	if(program.json){

		try{
			json = fs.readFileSync( path.join( process.cwd(), program.json ), {encoding:'utf-8'} )
		}catch(e){
			json = program.json;
		}

		options = JSON.parse(json);

	}

	// render the ejs with supplied options
	output = ejs.render( input, options );
	
	// if a destination option is provided, write the output to a file
	if( program.destination ){
		
		var file = path.join( process.cwd(), program.destination );
		
		mkdirp.sync(path.dirname( file ));
		
		fs.writeFileSync( file, output );
	
	}else{

		// write the output to stdout
		process.stdout.write( output );

		process.exit();

	}
}
