# CSS Bundler

Used for bundling css/scss into a single-file CSS for use in other projects.

A command-line application with entrypoint `bin/css_bundler.dart`, library code
in `lib/css_bundler.dart`, and example unit test in `test/`.

Run with `dart run`

> **Bundling with global sass**
> 1. Enable globally `pub global activate sass`
> 2. Bundle with `sass ../../src/components/styling/global.scss build/lybekk.css`

## Compiled app

```bash
dart2native bin/css_bundler.dart -o build/css_bundler

./build/css_bundler
```


## Notes

Created with `dart create -t console-full css_bundler`

## Resources

* [Dart SASS](https://sass-lang.com/dart-sass)
* [sass CLI](https://sass-lang.com/documentation/cli/dart-sass)

## TODO

- [] refactor to reflect migration to eleventy
