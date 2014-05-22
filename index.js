var path = require('path');
var Filter = require('broccoli-filter');
var compiler = require('ember-template-compiler');
var emblem = require('emblem');
var Handlebars = require('handlebars');

module.exports = TemplateCompiler
TemplateCompiler.prototype = Object.create(Filter.prototype);
TemplateCompiler.prototype.constructor = TemplateCompiler;
function TemplateCompiler (inputTree, options) {
    if (!(this instanceof TemplateCompiler)) { 
        return new TemplateCompiler(inputTree, options);
    }
    this.inputTree = inputTree;
    this.vanilla = options && options.vanilla || this.vanilla;
    this.extensions = options && options.extensions || this.extensions;
    this.targetExtension = options && options.targetExtension || this.targetExtension;
}

TemplateCompiler.prototype.vanilla = false;
TemplateCompiler.prototype.extensions = ['embl', 'emblem'];
TemplateCompiler.prototype.targetExtension = 'js';

TemplateCompiler.prototype.processString = function (string) {
  if(this.vanilla) {
    var compiled = emblem.precompile(Handlebars, string);
    return '/* jshint ignore:start */\nexport default Handlebars.template(' + compiled + ');\n/* jshint ignore:end */\n';
  } else {
    var compiled = emblem.precompile(compiler.EmberHandlebars, string);
    return 'export default Ember.Handlebars.template(' + compiled + ');\n';
  }
}
