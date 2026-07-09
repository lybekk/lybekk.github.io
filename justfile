default:
    just --choose

# Full setup on a fresh machine: Termux system deps + Ruby gems
setup:
    pkg install -y ruby clang make libffi termux-api
    cd docs && bundle install

# Update gems defined in the Gemfile
update:
    cd docs && bundle update

# Serve with livereload
dev:
    (sleep 3 && termux-open http://127.0.0.1:4000) &
    cd docs && bundle exec jekyll serve --livereload

# Build the static site into docs/_site
build:
    cd docs && bundle exec jekyll build

# Remove generated output and caches
clean:
    cd docs && rm -rf _site .jekyll-cache .sass-cache

