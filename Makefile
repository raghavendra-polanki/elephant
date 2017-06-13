DOCKER:=$(shell grep docker /proc/self/cgroup)

install:
	@echo Running make install...
	@npm config set unsafe-perm true
	@npm install

run:
	@echo Running make run...
	@echo Starting nodejs...
	@node index.js

# to catch all default targets and do nothing
.DEFAULT: ;

.PHONY: install run
