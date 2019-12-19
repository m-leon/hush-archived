**Outdated**

### Hosting (Production)

Run the following commands as root

```
cd /opt
git clone https://github.com/m-leon/hush.git
cd hush/src
cp .env.ex .env

# Open .env and set:
#   APP_ENV=production
#   APP_DEBUG=false
#   APP_URL=hush.example.com

cd ..
touch hush.db
```

Depending on your deployment, you may now want to edit docker-compose.yml directly and change how ports are exposed on the 'www' container.

You can now run with `docker-compose up`.

### Systemd

To set up hush with systemd edit the following file to use with your environment and place the file in `/etc/systemd/system/hush.service`.

```
[Unit]
Description=Hush service with docker compose
Requires=docker.service
After=docker.service

[Service]
Restart=always

WorkingDirectory=/opt/hush

# Remove old containers, images and volumes
ExecStartPre=/usr/local/bin/docker-compose down -v
ExecStartPre=/usr/local/bin/docker-compose rm -fv
ExecStartPre=-/bin/bash -c 'docker volume ls -qf "name=%i_" | xargs docker volume rm'
ExecStartPre=-/bin/bash -c 'docker network ls -qf "name=%i_" | xargs docker network rm'
ExecStartPre=-/bin/bash -c 'docker ps -aqf "name=%i_*" | xargs docker rm'

# Compose up
ExecStart=/usr/local/bin/docker-compose up

# Compose down, remove containers and volumes
ExecStop=/usr/local/bin/docker-compose down -v

[Install]
WantedBy=multi-user.target
```
