#!/bin/bash
chown -R www.www /code
cd / &&
./opt/openresty/nginx/sbin/nginx
tail -f /etc/hosts
