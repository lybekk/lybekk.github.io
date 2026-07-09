# lybekk.github.io

Over engineered redirect stub. Site **[lybekk.tech](https://lybekk.tech/)** has moved to Codeberg.

- **Live site:** https://lybekk.tech
- **Source:** https://codeberg.org/lybekk/lybekk

This keeps the old GitHub Pages URL (`lybekk.github.io`) alive as a redirect so existing links and bookmarks still reach the new site.

## Local devving

The live site is built by GitHub Pages. The Gemfile is for local preview. Recipes live in the [`justfile`](justfile):


```sh
just        # Cool chooser if fzf is available in path

just setup   # system deps + gems
just dev     # serve with livereload
just build   # build into docs/_site
```

## Deployment

GitHub Pages builds from the **`main`** branch, **`/docs`** folder
(Settings → Pages). Jekyll config lives in `docs/_config.yml`.

