const e=JSON.parse('{"key":"v-1e240f1d","path":"/posts/lesson/cs6.824-distributed-system/lesson5-7-raft.html","title":"raft算法","lang":"zh-CN","frontmatter":{"category":["分布式系统"],"tag":["分布式系统"],"description":"raft算法 3. Paxos的问题 4. 面向可理解性的设计 5. raft一致性算法 5.1 raft算法基础 5.1.1 raft状态机 5.1.2 raft任期 5.1.3 raft节点通讯 5.2 Leader选举 5.2.1 选举过程 5.2.2 选举成功的条件 5.2.3 如何避免无限循环的投票分裂 5.3 日志复制 5.3.1 复制的流程 5.3.2 日志的组织方式 5.3.3 提交日志 5.3.4 匹配日志 5.3.5 日志不一致的场景 5.3.6 避免 log 不一致：AppendEntries 中的一致性检查 5.4 安全性 5.4.1 限制一：包含所有已提交 entry 的节点才能被选为 leader 问题 raft算法，有没有可能有多个candidate同时获得了多数票？ raft算法中，节点根据什么规则投票? 资源","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/lesson/cs6.824-distributed-system/lesson5-7-raft.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"raft算法"}],["meta",{"property":"og:description","content":"raft算法 3. Paxos的问题 4. 面向可理解性的设计 5. raft一致性算法 5.1 raft算法基础 5.1.1 raft状态机 5.1.2 raft任期 5.1.3 raft节点通讯 5.2 Leader选举 5.2.1 选举过程 5.2.2 选举成功的条件 5.2.3 如何避免无限循环的投票分裂 5.3 日志复制 5.3.1 复制的流程 5.3.2 日志的组织方式 5.3.3 提交日志 5.3.4 匹配日志 5.3.5 日志不一致的场景 5.3.6 避免 log 不一致：AppendEntries 中的一致性检查 5.4 安全性 5.4.1 限制一：包含所有已提交 entry 的节点才能被选为 leader 问题 raft算法，有没有可能有多个candidate同时获得了多数票？ raft算法中，节点根据什么规则投票? 资源"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-20T08:28:08.000Z"}],["meta",{"property":"article:tag","content":"分布式系统"}],["meta",{"property":"article:modified_time","content":"2024-09-20T08:28:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"raft算法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-09-20T08:28:08.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"3. Paxos的问题","slug":"_3-paxos的问题","link":"#_3-paxos的问题","children":[]},{"level":2,"title":"4. 面向可理解性的设计","slug":"_4-面向可理解性的设计","link":"#_4-面向可理解性的设计","children":[]},{"level":2,"title":"5. raft一致性算法","slug":"_5-raft一致性算法","link":"#_5-raft一致性算法","children":[{"level":3,"title":"5.1 raft算法基础","slug":"_5-1-raft算法基础","link":"#_5-1-raft算法基础","children":[]},{"level":3,"title":"5.2 Leader选举","slug":"_5-2-leader选举","link":"#_5-2-leader选举","children":[]},{"level":3,"title":"5.2.3 如何避免无限循环的投票分裂","slug":"_5-2-3-如何避免无限循环的投票分裂","link":"#_5-2-3-如何避免无限循环的投票分裂","children":[]},{"level":3,"title":"5.3 日志复制","slug":"_5-3-日志复制","link":"#_5-3-日志复制","children":[]},{"level":3,"title":"5.3.5 日志不一致的场景","slug":"_5-3-5-日志不一致的场景","link":"#_5-3-5-日志不一致的场景","children":[]},{"level":3,"title":"5.4 安全性","slug":"_5-4-安全性","link":"#_5-4-安全性","children":[]}]},{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[{"level":3,"title":"raft算法，有没有可能有多个candidate同时获得了多数票？","slug":"raft算法-有没有可能有多个candidate同时获得了多数票","link":"#raft算法-有没有可能有多个candidate同时获得了多数票","children":[]},{"level":3,"title":"raft算法中，节点根据什么规则投票?","slug":"raft算法中-节点根据什么规则投票","link":"#raft算法中-节点根据什么规则投票","children":[]}]},{"level":2,"title":"资源","slug":"资源","link":"#资源","children":[]}],"git":{"createdTime":1726716009000,"updatedTime":1726820888000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":6}]},"readingTime":{"minutes":15.38,"words":4615},"filePathRelative":"posts/lesson/cs6.824-distributed-system/lesson5-7-raft.md","localizedDate":"2024年9月19日","excerpt":"<ul>\\n<li><a href=\\"#raft%E7%AE%97%E6%B3%95\\">raft算法</a>\\n<ul>\\n<li><a href=\\"#3-paxos%E7%9A%84%E9%97%AE%E9%A2%98\\">3. Paxos的问题</a></li>\\n<li><a href=\\"#4-%E9%9D%A2%E5%90%91%E5%8F%AF%E7%90%86%E8%A7%A3%E6%80%A7%E7%9A%84%E8%AE%BE%E8%AE%A1\\">4. 面向可理解性的设计</a></li>\\n<li><a href=\\"#5-raft%E4%B8%80%E8%87%B4%E6%80%A7%E7%AE%97%E6%B3%95\\">5. raft一致性算法</a>\\n<ul>\\n<li><a href=\\"#51-raft%E7%AE%97%E6%B3%95%E5%9F%BA%E7%A1%80\\">5.1 raft算法基础</a>\\n<ul>\\n<li><a href=\\"#511-raft%E7%8A%B6%E6%80%81%E6%9C%BA\\">5.1.1 raft状态机</a></li>\\n<li><a href=\\"#512-raft%E4%BB%BB%E6%9C%9F\\">5.1.2 raft任期</a></li>\\n<li><a href=\\"#513-raft%E8%8A%82%E7%82%B9%E9%80%9A%E8%AE%AF\\">5.1.3 raft节点通讯</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#52-leader%E9%80%89%E4%B8%BE\\">5.2 Leader选举</a>\\n<ul>\\n<li><a href=\\"#521-%E9%80%89%E4%B8%BE%E8%BF%87%E7%A8%8B\\">5.2.1 选举过程</a></li>\\n<li><a href=\\"#522-%E9%80%89%E4%B8%BE%E6%88%90%E5%8A%9F%E7%9A%84%E6%9D%A1%E4%BB%B6\\">5.2.2 选举成功的条件</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#523-%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E6%97%A0%E9%99%90%E5%BE%AA%E7%8E%AF%E7%9A%84%E6%8A%95%E7%A5%A8%E5%88%86%E8%A3%82\\">5.2.3 如何避免无限循环的投票分裂</a></li>\\n<li><a href=\\"#53-%E6%97%A5%E5%BF%97%E5%A4%8D%E5%88%B6\\">5.3 日志复制</a>\\n<ul>\\n<li><a href=\\"#531-%E5%A4%8D%E5%88%B6%E7%9A%84%E6%B5%81%E7%A8%8B\\">5.3.1 复制的流程</a></li>\\n<li><a href=\\"#532-%E6%97%A5%E5%BF%97%E7%9A%84%E7%BB%84%E7%BB%87%E6%96%B9%E5%BC%8F\\">5.3.2 日志的组织方式</a></li>\\n<li><a href=\\"#533-%E6%8F%90%E4%BA%A4%E6%97%A5%E5%BF%97\\">5.3.3 提交日志</a></li>\\n<li><a href=\\"#534-%E5%8C%B9%E9%85%8D%E6%97%A5%E5%BF%97\\">5.3.4 匹配日志</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#535-%E6%97%A5%E5%BF%97%E4%B8%8D%E4%B8%80%E8%87%B4%E7%9A%84%E5%9C%BA%E6%99%AF\\">5.3.5 日志不一致的场景</a>\\n<ul>\\n<li><a href=\\"#536-%E9%81%BF%E5%85%8D-log-%E4%B8%8D%E4%B8%80%E8%87%B4appendentries-%E4%B8%AD%E7%9A%84%E4%B8%80%E8%87%B4%E6%80%A7%E6%A3%80%E6%9F%A5\\">5.3.6 避免 log 不一致：AppendEntries 中的一致性检查</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#54-%E5%AE%89%E5%85%A8%E6%80%A7\\">5.4 安全性</a>\\n<ul>\\n<li><a href=\\"#541-%E9%99%90%E5%88%B6%E4%B8%80%E5%8C%85%E5%90%AB%E6%89%80%E6%9C%89%E5%B7%B2%E6%8F%90%E4%BA%A4-entry-%E7%9A%84%E8%8A%82%E7%82%B9%E6%89%8D%E8%83%BD%E8%A2%AB%E9%80%89%E4%B8%BA-leader\\">5.4.1 限制一：包含所有已提交 entry 的节点才能被选为 leader</a></li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E9%97%AE%E9%A2%98\\">问题</a>\\n<ul>\\n<li><a href=\\"#raft%E7%AE%97%E6%B3%95%E6%9C%89%E6%B2%A1%E6%9C%89%E5%8F%AF%E8%83%BD%E6%9C%89%E5%A4%9A%E4%B8%AAcandidate%E5%90%8C%E6%97%B6%E8%8E%B7%E5%BE%97%E4%BA%86%E5%A4%9A%E6%95%B0%E7%A5%A8\\">raft算法，有没有可能有多个candidate同时获得了多数票？</a></li>\\n<li><a href=\\"#raft%E7%AE%97%E6%B3%95%E4%B8%AD%E8%8A%82%E7%82%B9%E6%A0%B9%E6%8D%AE%E4%BB%80%E4%B9%88%E8%A7%84%E5%88%99%E6%8A%95%E7%A5%A8\\">raft算法中，节点根据什么规则投票?</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E8%B5%84%E6%BA%90\\">资源</a></li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
