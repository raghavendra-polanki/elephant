FROM surenderthakran/nodejs:v6

ADD . /elephant

WORKDIR /elephant

RUN make install

CMD make run
