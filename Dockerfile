# TODO(surenderthakran): use our own image instead
FROM node:8

ADD . /elephant

WORKDIR /elephant

RUN make install

CMD make run
