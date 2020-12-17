import 'dart:convert';
import 'dart:io';
import 'package:sass/sass.dart' as sass;
import 'package:path/path.dart' as p;

String sassFile = 'lib/bundle.scss';

String generateBundle() {
  try {
    print('Generating css bundles');
    var cssBundlerPath = Directory(
      p.dirname(
        Platform.script.path
      )
    ).parent;

    var cssFilePath = p.join(
      cssBundlerPath.path, 'build', 'lybekk.css');
    var result = sass.compile(sassFile);
    File(cssFilePath.toString()).writeAsStringSync(result);

    var cssMinifiedFilePath = p.join(
      cssBundlerPath.path, 'build', 'lybekk.min.css');
    const style = sass.OutputStyle.compressed;
    var resultMinified = sass.compile(sassFile, style: style);
    File(cssMinifiedFilePath.toString()).writeAsStringSync(resultMinified);

    return 'Success';
  } catch (e) {
    var msg = e.toString();
    print(msg);
    return msg;
  }

}
