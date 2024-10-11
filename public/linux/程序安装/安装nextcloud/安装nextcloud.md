## 1.安装docker

给yum添加镜像

```sh
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo   http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

安装docker-ce (ce为免费社区版)

```
yum -y install docker-ce
```

配置阿里镜像加速(解决拉取镜像慢)，没有vim使用vi或安装vim（yum -y install vim）

```powershell
vim /etc/docker/daemon.json
```

```json
{
  "registry-mirrors": ["https://bcd6gwnb.mirror.aliyuncs.com"]
}
```

Docker 启动和自启动

```powershell
systemctl start docker.service
systemctl enable docker.service
```

查看docker和docker compose版本

```powershell
docker version
docker compose version
```

新版docker已经默认安装了docker compose，如果没有请安装docker compose

## 2.安装nextcloud

编写dockerfile

在任意目录新建文件夹nextcloud，编写docker-compose.yml文件；内容如下：

==（NEXTCLOUD_TRUSTED_DOMAINS为你虚拟机地址。如有不需要的服务，可移除。）==

```yaml
services: # 服务定义开始
  db: # 数据库服务
    image: mysql:8
    container_name: mysql
    restart: always
    command: --default-authentication-plugin=mysql_native_password
    ports: # 端口映射设置
      - '3306:3306' # 将容器端口80映射到主机端口8080
    environment: # 环境变量设置
      MYSQL_DATABASE: nextcloud # 创建名为nextcloud的数据库
      MYSQL_USER: nextcloud # 设置MySQL用户为nextcloud
      MYSQL_PASSWORD: nextcloud # 设置MySQL密码，请替换为你的密码
      MYSQL_ROOT_PASSWORD: nextcloudroot # 设置MySQL root用户密码，请替换为你的密码
    volumes: # 挂载卷设置
      - ./db:/var/lib/mysql # 将数据库数据目录挂载到当前文件夹下的db目录
    #command: ["--innodb_strict_mode=0"] # 添加这行以禁用InnoDB的严格模式

  redis: # Redis服务
    image: redis # 使用Redis镜像
    container_name: nextcloud-redis # 容器名称为nextcloud-redis
    restart: unless-stopped # 容器停止时重新启动
  rabbitmq:
    image: rabbitmq:3.8
    container_name: rabbitmq
    restart: always
    environment:
      RABBITMQ_DEFAULT_USER: nextcloud
      RABBITMQ_DEFAULT_PASS: nextcloud
    ports:
      - '5672:5672' # RabbitMQ 服务端口

  nextcloud: # Nextcloud服务
    image: nextcloud # 使用Nextcloud镜像
    container_name: nextcloud-app # 容器名称为nextcloud-app
    restart: unless-stopped # 容器停止时重新启动
    ports: # 端口映射设置
      - '8080:80' # 将容器端口80映射到主机端口8080
    environment: # 环境变量设置
      NEXTCLOUD_ADMIN_USER: admin # 设置Nextcloud管理员用户为admin
      NEXTCLOUD_ADMIN_PASSWORD: admin # 设置Nextcloud管理员密码
      MYSQL_HOST: db # 设置MySQL主机为db
      MYSQL_DATABASE: nextcloud # 设置MySQL数据库为nextcloud
      MYSQL_USER: nextcloud # 设置MySQL用户为nextcloud
      MYSQL_PASSWORD: nextcloud # 设置MySQL密码
      REDIS_HOST: redis # 设置Redis主机为redis
      NEXTCLOUD_TRUSTED_DOMAINS: localhost,192.168.49.130#设置可访问地址
      QUEUE_CONNECTION: rabbitmq # 设置rabbitmq
      QUEUE_HOST: rabbitmq
      QUEUE_PORT: 5672
      QUEUE_USER: nextcloud # 设置rabbitmq用户
      QUEUE_PASSWORD: nextcloud # 设置rabbitmq密码
    volumes: # 挂载卷设置
      - ./nextcloud:/var/www/html # 将Nextcloud数据目录挂载到当前文件夹下的nextcloud目录
    depends_on: # 依赖服务设置
      - db # 依赖于数据库服务
      - redis # 依赖于Redis服务

  onlyoffice-document-server: # OnlyOffice文档服务器服务
    image: onlyoffice/documentserver # 使用OnlyOffice Document Server镜像
    container_name: onlyoffice-document-server # 容器名称为onlyoffice-document-server
    restart: unless-stopped # 容器停止时重新启动
    environment: # 环境变量设置
      JWT_ENABLED: 'true' # 启用JWT认证
      JWT_SECRET: 11111 # 设置JWT密钥，请替换为你的密钥
    ports: # 端口映射设置
      - '8082:80' # 将容器端口80映射到主机端口8082

volumes: # 挂载卷定义开始
  db: # 数据库挂载卷
  nextcloud: # Nextcloud挂载卷
```

在yml所在目录执行命令:docker compose up -d
执行完成即可访问 localhost:8080。
用户名：admin 密码：admin

## 3.文件上传

文件上传地址：'http://服务地址/remote.php/dav/files/用户名/'+文件名
例如：'http://192.168.49.130:8080/remote.php/dav/files/admin/1.txt'
上传需添加请求头Authorization：'Basic ' + btoa(username + ':' + password)

> 注：btoa为js函数，将输入的字符串转换为 Base64 编码的字符串

## 4.创建共享

参考文档：[https://docs.nextcloud.com/server/latest/developer_manual/client_apis/OCS/ocs-share-api.html](https://)
对共享 API 的所有调用的基 URL 为：http://192.168.49.130:8080/ocs/v2.php/apps/files_sharing/api/v1

对 OCS 端点的所有调用都需要将标头设置为 。OCS-APIRequest:true
返回值类型为xml，如需要json格式需添加请求头headers['Accept']='application/json'

![截图](/linux/程序安装/安装nextcloud/2448bf05e0101f74fc9654501435a985.png)
