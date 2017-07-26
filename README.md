# elephant

TODO(surenderthakran): write project description

TODO(surenderthakran): update usage instructions

### Build Application image
```
docker build -t elephant .
```

### Start mongo container with authentication enabled
```
docker run -d -p 27017:27017 --restart unless-stopped -v $HOME/workspace/data/mongo:/data/db --name mongo_container mongo:3.4.5 --auth
```

### Start application container
```
docker run --rm -it -v $(pwd)/application:/elephant/application -v $(pwd)/package.json:/elephant/package.json --link mongo_container:mongo -p 17883:17883 --name=elephant_1 elephant bash
```

### Mongo Backup:
```
docker run --rm --link mongo_local:mongo -v $HOME/workspace/data/backup/mongo:/backup mongo:3.4.5 bash -c 'mongodump -u {user} -p {user_password} --out /backup --host $MONGO_PORT_27017_TCP_ADDR'
```

### Mongo Restore:
#### Run mongo container without auth enabled
```
docker run -d --rm -p 27017:27017 -v $HOME/workspace/data/mongo:/data/db --name mongo_local mongo:3.4.5
```
#### Run restore command
```
docker run --rm --link mongo_local:mongo -v $HOME/workspace/data/backup/mongo:/backup mongo:3.4.5 bash -c 'mongorestore -u admin -p admin /backup --host $MONGO_PORT_27017_TCP_ADDR'
```
#### Start Mongo with authentication enabled
