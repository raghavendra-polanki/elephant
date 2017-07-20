# elephant

TODO(surenderthakran): write project description

TODO(surenderthakran): write usage instructions

```
docker build -t elephant .

docker run --rm -it -v $(pwd)/application:/elephant/application -v $(pwd)/package.json:/elephant/package.json --link mongo_local:mongo -p 17883:17883 --name=elephant_1 elephant bash
```
```
docker run -d --rm -p 27017:27017 -v $HOME/workspace/data/mongo:/data/db --name mongo_local mongo:3.4.5 --auth
```
