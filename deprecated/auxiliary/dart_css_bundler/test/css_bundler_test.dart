import 'package:css_bundler/css_bundler.dart';
import 'package:test/test.dart';

void main() {
  test('generateBundle', () {
    var result = generateBundle();
    expect(result, 'Success');
  });
}
