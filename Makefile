.PHONY: start install serve build i18n-upload i18n-download

.DEFAULT_GOAL := start
start:
	@make install
	@make serve

install: test-bundler
	@git submodule update --init --recursive
	@bundle install

serve: test-jekyll
	@jekyll serve --incremental

build: test-jekyll
	@jekyll build

serve-production: test-jekyll
	@make crowdin-download
	@JEKYLL_ENV=production jekyll serve

build-production: test-jekyll
	@make crowdin-download
	@JEKYLL_ENV=production jekyll build

crowdin-upload: test-crowdin
	@crowdin-cli upload sources --auto-update -b master

crowdin-download: test-crowdin
	@crowdin-cli download -b master
	@ruby ./scripts/normalize-frontmatter.rb
	@ruby ./scripts/normalize-toc.rb

###
# Misc stuff:
###

BUNDLE_EXISTS := $(shell command -v bundle 2> /dev/null)
JEKYLL_EXISTS := $(shell command -v jekyll 2> /dev/null)
CROWDIN_EXISTS := $(shell command -v crowdin-cli 2> /dev/null)

test-bundler:
ifndef BUNDLE_EXISTS
	$(error bundler is not installed. Run `gem install bundler`)
endif

test-jekyll:
ifndef JEKYLL_EXISTS
	$(error Jekyll is not installed. Run `make install`)
endif

test-crowdin:
ifndef CROWDIN_EXISTS
	$(error Crowdin is not installed. Run `make install`)
endif
ifndef CROWDIN_API_KEY
	$(error CROWDIN_API_KEY is undefined)
endif
