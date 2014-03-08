var path = require('path');
var Filter = require('broccoli-filter');
var compiler = require('ember-template-compiler');
var emblem = require('emblem');

module.exports = TemplateCompiler
TemplateCompiler.prototype = Object.create(Filter.prototype);
TemplateCompiler.prototype.constructor = TemplateCompiler;
function TemplateCompiler (inputTree, options) {
    if (!(this instanceof TemplateCompiler)) { 
        return new TemplateCompiler(inputTree, options);
    }
    this.inputTree = inputTree;
}

TemplateCompiler.prototype.extensions = ['embl', 'emblem'];
TemplateCompiler.prototype.targetExtension = 'js';

TemplateCompiler.prototype.processString = function (string) {
  var compiled = emblem.precompile(compiler.EmberHandlebars, string);
  return 'export default Ember.Handlebars.template(' + compiled + ');\n';
}