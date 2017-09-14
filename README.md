# 一图：高校图书馆合作伙伴

* 产品主页：[https://1ibrary.github.io](https://1ibrary.github.io)

* Apple Store 下载地址：[https://itunes.apple.com/us/app/%E4%B8%80%E5%9B%BE/id1230892748?l=zh&ls=1&mt=8](https://itunes.apple.com/us/app/%E4%B8%80%E5%9B%BE/id1230892748?l=zh&ls=1&mt=8)

* 团队 GitHub 地址：[https://github.com/1ibrary](https://github.com/1ibrary)

* 前端 GitHub 地址：[https://github.com/1ibrary/1ibrary-front-end](https://github.com/1ibrary/1ibrary-front-end)

* 后端 GitHub 地址：[https://github.com/1ibrary/1ibrary-back-end](https://github.com/1ibrary/1ibrary-back-end)


## Screenshot

![](http://airing.ursb.me/image/1ibrary/1ibrary-1.jpeg-h600.jpg)

![](http://airing.ursb.me/image/1ibrary/1ibrary-2.jpeg-h600.jpg)

![](http://airing.ursb.me/image/1ibrary/1ibrary-3.jpeg-h600.jpg)

![](http://airing.ursb.me/image/1ibrary/1ibrary-4.jpeg-h600.jpg)

持续更新中，欢迎Star~ 欢迎下载~

---

## 1ibrary-front-end
> 一图app前端代码
## 时间轴

### 17.04.08
创建项目，编写NavigationBar组件,ShareNav组件。
编写网络请求工具库HttpUtils.js

by miemie

###  17.04.09
- 编写底部标签BottomTabs组件     
- 编写带有搜索栏的导航SearchNav组件    
- 编写首页的主体部分，即书目列表的ListView实现
- todo: 网络请求部分的代码还没有写（下拉刷新的实现）。       
接下来需要解决的分别是
- 搜索提示页
- 搜索结果页。

by miemie
  
### 17.04.10
- 完成搜索历史&推荐页
- 熟悉本地存储技术点AsyncStorage    

待做:    
- 搜索结果页

by miemie

### 17.04.11
- 完成搜索提示页
- 完成搜索结果页除ScrollableBar之外的部分
待做:    
- 搜索结果页
- 抽象出BookList组件，将BookItem设置为自定义    
后续思路:     
- 在每个BookItem上设定navigator组件，实现BookItem和Book详情页面的跳转

by miemie

### 17.04.12
> 今天一图这块啥也没干，晚上收到了新的设计稿，变漂亮了，大概想了一下构建，思路上没有很大的出入。
> 明天开始动工！^_^ 加油！💪

by miemie

### 17.04.13
- 对之前做的四个页面进行了新设计稿的改版
- 明天要做的图书详情页思路：先分页面把每个页面实现，然后用navigator实现页面间跳转
- 出现的问题:ScrollableTabView组件不够灵活，暂时放弃自定义，后期如果有时间再补救

by miemie

### 17.04.14
- 改版顶部导航样式
- 完成图书详情页的基本布局

by miemie

### 17.04.15
- 完成首页部分的所有单个页面的布局和事件的编写
- 利用navigator实现页面之间的跳转

by miemie

### 17.04.16
- 完成书单的增加和删除部分
- bug: 书单这部分本来打算使用ListView这个组件，但当data改变的时候,ListView并没有变化，不得已最后使用了ScrollView然后map，这个以后需要留意，现在暂时没搞明白怎么回事

by miemie

### 17.04.17
>可以说是非常拼的一天了。。。。     

- 剩下登录页的两个页面没写
- 剩下个人页面的setting页和aboutus页没写

> 连写带改连续弄了8h。。。。。眼睛可以说是非常痛了。。。。😂
> 现在去躺尸。。。。。。

- 大boss: 网络层请求部分的代码 最后写
- 大boss: 排除所有的warning 网络层之前做 用chrome dev调试定位

by miemie

### 17.04.20
- 完成所有页面布局
- 明天测试网络层

by miemie

### 17.04.23
- 网络层局部测试成功
待做:    
- 所有网络层请求代码
- listview上拉刷新使用refreshcontrol来做，下拉加载参考[这篇回答](https://segmentfault.com/q/1010000004101829)
- 首页要做缓存 一开始先显示缓存 然后加载成功再刷新 书单在网络请求结束之后也要本地缓存
- 细节部分怎么完善？用户提示怎么做，用户不存在这些，统统暂时alert
- warning边做边排了一部分，集中排除要在最后
- 真机调试

by miemie

### 17.04.24
- 图书列表页面网络请求完成 图片无法加载
- 网络请求层代码与后端同步

by miemie

### 17.04.25
- 完善一些交互的细节
- 待做:
- 所有后端参数在前端都用props传递
- 同步后端api
- 交互排bug（为什么书单列表里面的书删完一个会影响下一个？？？？？）
- 楼上这个问题很烦，2h过去了
- 好气啊！！！！！！！

by miemie

### 17.04.26
## 除了书单列表里的删除效果很丑以外，基本完结了
ps 现在已经不丑了

by miemie

### 17.04.27
- bug: 启动页加载不出来 完全卡死
- 关于我们页面要新增webview 不过很明显现在进不去了
- webview这个比较简单 等启动页弄完之后参考[文章1](http://blog.csdn.net/codetomylaw/article/details/52490378)和[文章2](http://blog.csdn.net/wxs0124/article/details/50722135)即可     

下午四点更新:    
> 初稿完结

by miemie

### 17.04.29
- iphone 6s 点击问题修复
- 待做：
- 设置页面的按钮应该不滑动按钮也能动 像微信一样
- 完成按钮太小了

晚上update:   
以上问题全部解决

by miemie

### 17.04.30

- 添加了logo
- 修改了display name
- 修改了版本号
- 添加了LICENSE
- 尝试修改splash，尝试失败 _(:з」∠)_

提交 v1.0.2 审核

by Airing

### 17.05.01
今天点进去看小熊补充的内容。    
license添加进去了，不过关于我们里面版本号好像米有改？？？😂

by miemie

### 17.05.02
- 尝试修复滑动书单不灵敏的问题
- 修复删除后从书单进入列表页面时不及时刷新的bug

下午更新：    
震惊！！！之前一直以为无解的页面组件残留问题竟然被垂死梦中惊坐起的咩咩解决了哈哈哈哈哈哈哈！！    
然后修复了图书详情页面信息显示不完全的问题。     
^_^上课去。。。。。。    

by miemie

### 17.06.21
- 清行李回家的21号 开始重构一图

by miemie

### 17.06.26
- 新建common文件夹 编写styles.js 
- 待做： 更改未重构代码中的响应式高度和宽度的处理方式

by miemie

### 17.07.10
- 添加styles文件（内含设备长宽 响应式长宽获取函数）
- 添加Urls文件 聚合所有的url前缀和路径
- 复用楼上文件里的东西
- 修改文件名

by miemie

### 17.07.11
- router重构把聚合文件写了一下 成功
- todo： 用router重构所有页面／用redux管理数据

by miemie

### 17.07.12
- router重构继续进行
- 对这个插件渐渐上手了，开心～～～啦啦啦啦

by miemie

### 17.07.17
- router重构还有最后一步 比想象中麻烦啊。。。。
- 明天起床继续写。。。。。
待做:
- 利用修改后的searchNav组件构建新的搜索提示 搜索标签页面
- 写一个页面级别的组件 利用它来达到楼上的目的
- 添加书单页面的完成按钮 考虑使用refresh进行修改
- 调整搜索结果页面的滑动条

by miemie

### 17.07.18
- 昨天立的flag今天基本实现了
- bug：书单里面的书删不了也点不开
待做：
- 排除楼上bug 编写redux重构代码

by miemie

### 17.07.19
- 书单里面的书 网络请求有问题

by miemie

### 17.07.20
- 解决了昨天的bug 谢天谢地
- 有三个bug无解 丢给胖胖看了 希望他能解决掉噢😄

by miemie

### 17.07.22
- 胖胖把4个bug变成了1个 棒棒～🍭🍭🍭
- 明天开始使用redux进行数据管理的重构

by miemie

### 17.07.23
- 胖胖把1个bug变成了0个！ 🍭🍭🍭
- 使用alert和toast对提醒的细节做了完善
- 重构tab
- 添加自动登录
- 把所有的异步都替换成了async/await的写法
- 坐等code review 😄

by miemie

### 17.07.24
- 按照胖胖的建议做了修改
- bug：如果多次搜索 那么点击取消 将会无法直接回到首页 而是多次回弹到上次搜索结果
- 等debug和code review呀～～

by miemie

### 17.07.25
- 根据code review结果做修改
- 等新的review~~~~

by miemie

### 17.07.26
- 首页加入弹框
- redux思前想后觉得不适合一图 不改
- 加入了keyboardscrollview这个插件 但是网络请求发不出去所以测试不了
- 让搜索提示页自动focus（Search页面） 单页测试没毛病 等网络请求修复

 bug
 - [x] 网络请求 网络请求 网络请求
 - [x] 搜索框旁边的取消按钮对焦需要点两次(一次是使搜索框失去焦点 一次是对给取消键) 
 - [x] 如果多次搜索 那么会弹出多个结果页 最后需要一层一层回退到首页 如何直接跳首页 并且把中间的释放掉呢

 备注：为了上架 现在使用一图原有后端

 by miemie

### 17.07.27

带不走的留不下的  
我全都交付它  
让它捧着我在手掌  
自由自在挥洒  

如果有一个怀抱  
勇敢不计代价  
别让我飞  
将我温柔豢养  

《鱼》- 陈绮贞

 by 繁易

 ### 17.07.28

 咩咩的最后一次更新:

 - [x] BooCollect和BookCollectList那一片 啊。。。 就是提交post的时候 那个some很多余啊。。。。
 - [x] 然后点开收藏查看不了新图书是因为BookCollect页面的state没更新
 - [x] 然后删除图书之后从BookCollect进入BookCollectList的时候也不会更新删除内容 也是因为pop了BookCollectList之后BookCollect页面的state没有更新
 - 然后记得翻聊天记录 看有没有我跟你反映过的并且还没解决的而我又忘记写进readme的东西
 - [x] 下午七点钟补充： 自动登录用不了 我写在login页面的componentDidMount页里了

 by miemie
 
### 17.07.30

重构：

- 升级到 RN 最新版 0.46.4
- 重构 HttpUtils，使用 Axios 与 qs 实现
- 重构登录，抽象公用函数等

Bugfix:
  - BookCollect 不更新
  - 搜索框旁边的取消按钮对焦需要点两次
  - 多次搜索，会弹出多个结果页，无法一次性返回
  - 登录报错
  - 收藏查看不了新图书

Feature:
  - 自动登录

By 繁易


### 17.08.01

祝你好运。一图。

by miemie

### 17.08.01 - 17.08.03

理清需求，开始对接南昌大学后端

对接：
  - [x] 登录
  - [x] 首页热门图书
  - [x] 图书详情
  - [x] 书单显示
  - [x] 添加书单
  - [x] 搜索功能
  - [x] 热门搜索
  - [x] 按作者/出版社搜索
  - [x] 收藏功能
  - [x] 查看已借阅图书
  - [x] 订阅功能

Refactor:
  - 移除无用代码
  - 优化代码格式

Feature:
  - 适配多个大学的URL

后端问题：
  - book_db_id 不应该由前端传入
  - 书单，书籍列表由字符串改为数组
  - 书单的内容应该由后端返回，而非前端去请求，这样有**严重的安全问题**
  - 搜索返回的结果缺少 book_last_number 属性
  - 豆瓣 Api 有次数限制

TODO
  - [x] 优化交互方式
  - [x] 完善网络状态提示
  - [x] 增加登出
  - [x] 设计对接多个大学的具体架构

感谢：

- 感谢田国华同学的彻夜支持
- 感谢 Miemie 同学的重构工作，让修改和对接的难度降低了几个级别
- 感谢邓国雄同学的支持，可以对后端一些不好的地方做修改了

By 繁易

### 17.08.07
啦啦啦啦啦啦～～

by miemie

### 17.08.23

  - [x] 收藏功能
  - [x] 自动登录
  - [x] 订阅功能

By 繁易

### 17.08.24

- 重构书单代码
- 页面划分文件夹
- 新增 Index 页面    
    
### 17.08.30
看上去像是加了redux的样子～～     
    
by miemie     

### 17.08.31
8月的最后一天    
一图的readme由我来守护！     
   
by miemie

### 17.09.01
9月的第一天   
一图的readme由我来开启！     

- [x] 通知功能

至此，一图 App 前端部分全部建设完成，已可以正常使用。

by 繁易    
    
### 17.09.14
一图final啦～～～    
小熊快来编译上架呀～～～      
    
by miemie


  
    
      
    
  
