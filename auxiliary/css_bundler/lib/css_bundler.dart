import 'dart:io';
import 'package:sass/sass.dart' as sass;
import 'package:path/path.dart' as p;

String globalScssPath = '../../src/components/styling/global.scss';

void generateBundle() {
  print('Generating unminified bundle');
  var cssBundlerPath = Directory(
    p.dirname(
      Platform.script.path
    )
  ).parent;
  var cssFilePath = p.join(
    cssBundlerPath.path, 'build', 'lybekk.css');
  var result = sass.compile(globalScssPath);
  var topText = ''' /*
  * Generated with css_bundler:
  * https://github.com/lybekk/lybekk.github.io/tree/source/auxiliary/css_bundler
  */\n''';
  File(cssFilePath.toString()).writeAsStringSync(topText + result);
}
