.PHONY: start install serve i18n-upload i18n-download

.DEFAULT_GOAL := start
start: editor install serve

install: test-bundler
	@bundle install

serve: test-jekyll
	@jekyll serve --incremental

crowdin-sync: test-crowdin
	@crowdin-cli upload sources --auto-update -b master
	@crowdin-cli download -b master

###
# Misc stuff:
###

editor:
	@eval $(EDITOR) ./

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
