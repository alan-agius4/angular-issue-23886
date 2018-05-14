import * as ng from '@angular/compiler-cli';
import * as ts from 'typescript';
import * as path from 'path';

const options = {
	baseUrl: '.',
	basePath: '.',
	emitDecoratorMetadata: true,
	experimentalDecorators: true,
	moduleResolution: ts.ModuleResolutionKind.NodeJs,
	module: ts.ModuleKind.ES2015,
	target: ts.ScriptTarget.ES2015,
	outDir: './dist',
	declaration: true,
	skipLibCheck: true,
	noEmitOnError: false,

	// ng compiler options
	enableResourceInlining: true
};

let host = ng.createCompilerHost({
	options
});

host.readResource = () => Promise.resolve('Hello world!');

const program = ng.createProgram({
	rootNames: [path.resolve('./src/public_api.ts')],
	options,
	host
});

program.loadNgStructureAsync()
	.catch(console.error)
	.then(() => program.emit());
