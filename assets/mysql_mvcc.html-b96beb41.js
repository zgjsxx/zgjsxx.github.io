import{_ as n,V as a,W as s,X as e,Y as r,$ as o,a0 as c,F as i}from"./framework-9a29aaa0.js";const l={},m=c('<h1 id="mysql-mvcc机制详解" tabindex="-1"><a class="header-anchor" href="#mysql-mvcc机制详解" aria-hidden="true">#</a> mysql MVCC机制详解</h1><p>MVCC, 是Multi Version Concurrency Control的缩写，其含义是<strong>多版本并发控制</strong>。这一概念的提出是为了解决MySQL的在RC级别下存在的<strong>不可重复读</strong>的问题。</p><p>这里回顾一下MySQL的隔离级别和各种隔离级别所存在的问题。</p><p>MySQL的四种隔离级别如下：</p><ul><li>读未提交（read uncommitted）：指一个事务还没有提交时，它做的变更才能被其他事务看到；</li><li>读提交(read committed)，指一个事务提交之后，它所做的变更才能被其他事务看到</li><li>可重复度（repeated read），指一个事务执行过程中看到的数据，一直跟这个事务启动时看到的数据时一致的，这是MySQL InnoDB引擎的默认隔离级别。</li><li>串行化(serializable)：会对记录加上读写锁，在多个事务对这条记录进行读写操作时，如果发生了读写冲突的时候，后访问的事务必须等前一个事务执行完成，才能继续执行</li></ul><p>读提交级别下会遇到<strong>不可重复读</strong>的问题，所谓不可重复读是指在同一个事务中多次select出的数据的值发生了变化。例如下图中所示：</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/database/mysql/MVCC/read-uncommitted.png" alt="mysql" tabindex="0" loading="lazy"><figcaption>mysql</figcaption></figure><p>A用户在第一次查询ID=1的用户时，其年龄是10。 在这之后，B用户对ID=1的用户的age进行了修改，并且提交了事务，结果A用户第二次查询ID=1的用户的年龄时发现年龄修改为了20。这样的变化就是<strong>不可重复读</strong>。</p><p>{ creator_trx_id: 创建该read view的事务的id m_ids： 创建readview时，当前数据库活跃且未提交的事务id列表 min_trx_id： 创建ReadView时，当前数据库中活跃且未提交的最小事务id max_trx_id： 创建ReadView时，当前数据库中分配的下一个事务的id值 }</p><p>参考文章</p>',10),d={href:"https://www.cnblogs.com/qdhxhz/p/15750866.html",target:"_blank",rel:"noopener noreferrer"},p={href:"https://www.cnblogs.com/cswiki/p/15338928.html",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.6hu.cc/archives/86666.html",target:"_blank",rel:"noopener noreferrer"};function _(g,w){const t=i("ExternalLinkIcon");return a(),s("div",null,[m,e("p",null,[e("a",d,[r("https://www.cnblogs.com/qdhxhz/p/15750866.html"),o(t)]),e("a",p,[r("https://www.cnblogs.com/cswiki/p/15338928.html"),o(t)]),e("a",h,[r("https://www.6hu.cc/archives/86666.html"),o(t)])])])}const f=n(l,[["render",_],["__file","mysql_mvcc.html.vue"]]);export{f as default};
