"use strict";

var tap = require('tap');

var fs = require('fs-extra');
var lih = require('../core/lib/list_item_hunter');
var Pattern = require('../core/lib/object_factory').Pattern;
var PatternGraph = require('../core/lib/pattern_graph').PatternGraph;
var extend = require('util')._extend;
var pa = require('../core/lib/pattern_assembler');
var ph = require('../core/lib/parameter_hunter');
var pattern_assembler = new pa();
var parameter_hunter = new ph();

// fake pattern creators
function createFakeListPattern(customProps) {
  var inputs = {
    relPath: '01-molecules/01-lists/00-list.mustache',
    data: {}
  };
  var pattern = new Pattern(inputs.relPath);

  return extend(pattern, customProps);
}

function createFakePatternLab(customProps) {

  //NOTE: These listitems are faked so that pattern_assembler.combine_listitems has already clobbered them.

  var pl = {
    graph: PatternGraph.empty(),
    "listitems": {
      "1": [
        {
          "title": "Foo",
          "message": "FooM"
        }
      ],
      "2" : [
        {
          "title": "Foo",
          "message": "FooM"
        },
        {
          "title": "Bar",
          "message": "BarM"
        }
      ],
      "3": [
        {
          "title": "Foo",
          "message": "FooM"
        },
        {
          "title": "Bar",
          "message": "BarM"
        },
        {
          "title": "Baz",
          "message": "BazM"
        },
      ]
    },
    "data": {
      "link": {},
      "partials": []
    },
    "config": {
      "debug": false,
      "paths": {
        "source": {
          "patterns": "./test/files/_patterns"
        }
      },
      "outputFileSuffixes": {
        "rendered": ''
      }
    },
    "partials" : {},
    "patterns" : []
  };

  return extend(pl, customProps);
}


tap.test('process_list_item_partials - renders listItems when pattern included with patternparameter', function(test){
  //arrange
  var list_item_hunter = new lih();
  var patterns_dir = './test/files/_patterns';

  var pl = {};
  pl.config = {};
  pl.data = { title: "test"};
  pl.data.link = {};
  pl.config.debug = false;
  pl.patterns = [];
  pl.partials = {};
  pl.config.patterns = { source: patterns_dir };
  pl.listitems = {
    "1": {
      "headline": {
        "short": "a"
      }
    },
    "2": {
      "headline": {
        "short": "b"
      }
    },
    "3": {
      "headline": {
        "short": "c"
      }
    }
  };

  var listPattern = new Pattern('00-test/457-listitem.mustache');
  listPattern.template = fs.readFileSync(patterns_dir + '/00-test/457-listitem.mustache', 'utf8');
  listPattern.extendedTemplate = listPattern.template;
  listPattern.stylePartials = pattern_assembler.find_pattern_partials_with_style_modifiers(listPattern);
  listPattern.parameteredPartials = pattern_assembler.find_pattern_partials_with_parameters(listPattern);

  var listParentPattern = new Pattern('00-test/457-parent.mustache');
  listParentPattern.template = fs.readFileSync(patterns_dir + '/00-test/457-parent.mustache', 'utf8');
  listParentPattern.extendedTemplate = listParentPattern.template;
  listParentPattern.stylePartials = pattern_assembler.find_pattern_partials_with_style_modifiers(listParentPattern);
  listParentPattern.parameteredPartials = pattern_assembler.find_pattern_partials_with_parameters(listParentPattern);

  pl.patterns.push(listPattern);
  pl.patterns.push(listParentPattern);

  //act
  parameter_hunter.find_parameters(listParentPattern, pl);

  //assert.
  var expectedValue = 'title<ul><li>a</li><li>b</li><li>c</li></ul>';
  test.equals(listParentPattern.extendedTemplate.replace(/\s\s+/g, ' ').replace(/\n/g, ' ').trim(), expectedValue.trim());
  test.end();
});
