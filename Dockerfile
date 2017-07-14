FROM node:8 # TODO(surenderthakran): use our own image instead

ADD . /elephant

WORKDIR /elephant

RUN make install

CMD make run
