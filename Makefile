DOCKER:=$(shell grep docker /proc/self/cgroup)

GULP = ./node_modules/gulp/bin/gulp.js
NODEMON = ./node_modules/nodemon/bin/nodemon.js

install:
	@echo Running make install...
	@npm config set unsafe-perm true
	@npm install

run:
	@echo Running make run...
	@echo Setting up environment...
	# This delay is to allow any linked containers to begin.
	@sleep 10
	@echo Starting gulp watch in background...
	@nohup $(GULP) watch &
	@echo Starting server via nodemon...
	@$(NODEMON) index.js

# to catch all default targets and do nothing
.DEFAULT: ;

.PHONY: install run
