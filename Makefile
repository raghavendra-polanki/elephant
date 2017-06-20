DOCKER:=$(shell grep docker /proc/self/cgroup)

GULP = ./node_modules/gulp/bin/gulp.js
NODEMON = ./node_modules/nodemon/bin/nodemon.js

install:
	@echo Running make install...
	@npm config set unsafe-perm true
	@npm install

run:
	@echo Running make run...
ifdef DOCKER
	@echo Setting up environment...
	# This delay is to allow any linked containers to begin.
	@sleep 10
	@echo Starting gulp watch in background...
	@nohup $(GULP) watch &
	@echo Starting server via nodemon...
	@$(NODEMON) index.js
else
	@echo Error: Project is configured to only run inside a docker container!
	@echo Refer to README.md for usage instructions.
endif

# to catch all default targets and do nothing
.DEFAULT: ;

.PHONY: install run
