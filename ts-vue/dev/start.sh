#!/bin/bash

#删除存活的镜像
docker rm -f `docker ps -a |grep teacher_live_pc|awk '{print $1}'`
time=`date +%F-%H-%M-%S`

#进入命令构建镜像
cd /teacher_live_pc
docker build -t teacher_live_pc:$time ./

#启动镜像
docker run -d -p 18080:80 --name teacher_live_pc -v /etc/localtime:/etc/localtime:ro -v /web/teacher_live_pc/log:/opt/openresty/nginx/logs -m 512M teacher_live_pc:$time

#删除文件内容
rm -rf /teacher_live_pc/*
