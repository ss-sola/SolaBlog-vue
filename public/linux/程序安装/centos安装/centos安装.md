## 1.下载镜像

清华下载镜像：[https://mirrors.tuna.tsinghua.edu.cn/](https://)

找到centos7镜像：CentOS-7-x86_64-DVD-2009.iso

## 2.centos配置

1、选中刚刚配置的CentOS7，然后点击“开启此虚拟机”。

![截图](/linux/程序安装/centos安装/2bd90f90e8b1fbd5efa530f742f930ff.png)

2、选择“典型”选项，然后下一步。

![截图](/linux/程序安装/centos安装/9f3f61fb14c4948c8bd699023dd48787.png)

3、选择“稍后安装操作系统”，点击下一步。

![截图](/linux/程序安装/centos安装/3114d9aa6095e88a3f320ad27a52186d.png)

4、客户机操作选择“Linux”,版本选择“CentOS 7 64位”，点击下一步。

![截图](/linux/程序安装/centos安装/82c1cb8aa8409421409b689e030c7e41.png)

5、输入“虚拟机名称”，选择虚拟机文件保存的位置，点击下一步。

![截图](/linux/程序安装/centos安装/acd234729dc8588f741cc40dfc51ee8e.png)

6、最大磁盘默认20G大小即可，然后选择“将虚拟机磁盘存储为单个文件”，下一步。

![截图](/linux/程序安装/centos安装/42c457c5bfc9935ae227d94b4c041235.png)

7、点击”自定义硬件配置“。

![截图](/linux/程序安装/centos安装/ed685e4d6024b8102591fbabd735df94.png)

8、选中”新CD/DVD“，选择”使用ISO映像文件“，然后设置CentOS7的ISO映像路径，点击关闭。

![截图](/linux/程序安装/centos安装/054ca30b2f514a9c66400479cf7403dc.png)

## 3.centos安装

1、选中刚刚配置的CentOS7，然后点击“开启此虚拟机”。

![截图](/linux/程序安装/centos安装/c2c8a9bda1eee806cae790a1d4d1fc9c.png)

2、虚拟机启动之后会出现如下界面（白色表示选中），我们将鼠标移入到虚拟机中，并按下键盘中的“↑”键，选择Install CentOS 7，最后按下“Enter 键”。

![截图](/linux/程序安装/centos安装/6ea673ade57aecef7fcdf47431746731.png)

3、按下Enter进行安装。

![截图](/linux/程序安装/centos安装/fcfca0ad016d835d41246ed0e389e369.png)

4、等待系统加载完成。

![截图](/linux/程序安装/centos安装/d13643bf702c0aaf0c60085623e337bf.png)

5、选择使用哪种语言，推荐使用英文。但如果是第一次安装，建议先安装中文版的熟悉一下，之后再选择英文的进行实践，这里就介绍中文的，下滑至底部选择中文。

![截图](/linux/程序安装/centos安装/9dced2d90901c4674cc17daf2d99427f.png)

6、【本地化】只配置日期和时间，键盘和语言支持没有特殊情况默认就好。

![截图](/linux/程序安装/centos安装/c4eb0246c3d4042d4a29a737c2208bbd.png)

7、中国范围内都选择为上海（因为只有上海可选），并选择为24小时制，设置完成后单击完成按钮

![截图](/linux/程序安装/centos安装/52dd26d69fe53dceb7b27aa416aa1476.png)

8、【软件】中只配置软件选择，安装源系统会自动识别，所以不用管。

![截图](/linux/程序安装/centos安装/e95a781b7705a9725b6cae21ee7ba808.png)

9、然后我们选择安装的系统是否含有界面，界面一般对于我们来说用处不大，而且CentOS的界面不好操作，所以这里选择最小安装。

![截图](/linux/程序安装/centos安装/acba5f084163402fe6174bac78b6bab4.png)

10、【系统】中只配置安装位置，指的是系统如何分区，其它的都默认就好。

![截图](/linux/程序安装/centos安装/246f135ff7a6bcb2674341806f09199d.png)

11、对分区不清楚的就选择自动配置分区，这里演示我要配置分区。

![截图](/linux/程序安装/centos安装/b7f62bb32b942681ef19a70478c47f6c.png)

12、手动分区我们要选择标准分区，然后点击下面的“+”添加分区。

![截图](/linux/程序安装/centos安装/cc969bc23c85badc5e92ecbda776b0ce.png)

我们分别创建三个分区：/boot区、swap交换分区、根分区/

13、添加 /boot分区，用来放启动文件，大小300MB足矣，然后点击“添加挂载点”。

![截图](/linux/程序安装/centos安装/f3d36da4d44172893b8e3c194af0deb4.png)

![截图](/linux/程序安装/centos安装/a056a1c3c85c5742306707557192915e.png)

14、添加 swap分区，这个是交换分区，一般情况是物理内存的2倍大小，用于物理内存不足时使用，可能造成系统不稳定， 所以看情况，可以设置小一点，甚至设置为0MB，这里我设置为512MB，然后点击”添加挂载点“。

![截图](/linux/程序安装/centos安装/706d08a3820a4ead62061a5205d40e94.png)

![截图](/linux/程序安装/centos安装/5734ef5f68595562717648a07a600f5d.png)

15、增加根分区，表示所有空间大小，这里不填写大小，即默认剩余的空间都给根分区，然后点击”添加挂载点“。

![截图](/linux/程序安装/centos安装/5b1945ff9bdbf5d8f0aff81a71bf3a1e.png)

![截图](/linux/程序安装/centos安装/1bdb619adc37d0261e67c9404a3ac2f9.png)

16、点击”完成“。

![截图](/linux/程序安装/centos安装/9266811d1b690f8fe9da783772d5aa33.png)

17、点击”接受更改“。

![截图](/linux/程序安装/centos安装/bd6bc61ac41e9d343a784969f435ba47.png)

18、回到界面，点击“开始安装“。

![截图](/linux/程序安装/centos安装/4ccf080154394613a4f14aa553c1361e.png)

19、接下来配置用户设置。

（1）、设置管理员ROOT密码，这是最高权限root用户的密码（默认账号为root，密码为现在要设置的）。

在实际中root密码越复杂越好，因为这里只是演示，所以密码就没有那么复杂了。

提示：这个密码非常重要，请务必牢记！！！

![截图](/linux/程序安装/centos安装/cb3aa436b347b8dce0aea3583cb2f137.png)

![截图](/linux/程序安装/centos安装/cb3aa436b347b8dce0aea3583cb2f137.png)

（2）创建用户，这里就是普通的用户，权限比较低，这一步我们可以省略。

![截图](/linux/程序安装/centos安装/1d3f817df499fe9e623118025f6b5d5e.png)

20、用户设置好了之后，等待CentOS安装完成，，然后点击“完成配置”。

![截图](/linux/程序安装/centos安装/c841e5922f92f37fbf1f926fbd7d4749.png)

21、等待配置全部完成后“点击重启”。

![截图](/linux/程序安装/centos安装/aef2c95e774dcdb939b7a59aee1311c5.png)

22、下面我们来登录CentOS，使用默认账号为root，密码为 你在前面安装时设置的root密码

![截图](/linux/程序安装/centos安装/5ef9694b1a59d9d1c4ab8376b75c8667.png)

## 4.启动虚拟网络

首先要确保的是CentOS为NAT模式。

![截图](/linux/程序安装/centos安装/b368d35b25955fbe151f2839f31d3bc4.png)

进入网络配置文件目录：cd /etc/sysconfig/network-scripts/，并且用 ls 命令查看是否有ifcfg-xxx名称的配置文件（ifcfg-lo除外），如果没有则说明网卡没有被识别，这种只能重装或者换个CentOS的版本。

![截图](/linux/程序安装/centos安装/ff710411f53dcf1846dcf26ccc030cfd.png)

编辑ifcfg-ens33文件：vi ifcfg-ens33。按 i 进入insert编辑模式，

将BOOTPROTO设为dhcp，将ONBOOT设为yes，

按下Esc进入命令模式输入:wq保存并退出。

![截图](/linux/程序安装/centos安装/f49685f4b62880d0ee777d052630fcea.png)

配置完成之后输入：service network restart，重启网卡让网卡设置生效，之后就可以上网了。

输入ip addr检查一下动态分配的IP

![截图](/linux/程序安装/centos安装/635203fc748434670673bf64a841d146.png)

最后验证是否可以访问外网。

![截图](/linux/程序安装/centos安装/c6872d3a03a3024f4e2c581f75c86d5f.png)
