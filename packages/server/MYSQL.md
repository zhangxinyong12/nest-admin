# mysql
## 账户
zhang ZHang123
## root
root ZHang123 只允许localhost访问
创建用户
```sql
create user 'test'@'%' identified by 'ZHang123';
```
## 创建数据库添加用户
```sql
create database test;
grant all privileges on test.* to 'test'@'%';
flush privileges;
```
## 查看用户权限
```sql
show grants for 'test'@'%';
```
## 查看数据库
```sql
show databases;
```