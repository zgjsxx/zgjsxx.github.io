const l=JSON.parse('{"key":"v-1e240f1d","path":"/posts/lesson/cs6.824-distributed-system/lesson5-7-raft.html","title":"raft算法","lang":"zh-CN","frontmatter":{"category":["分布式系统"],"tag":["分布式系统"],"description":"raft算法 1. 引言 2. 复制式状态机 3. Paxos的问题 4. 面向可理解性的设计 5. raft一致性算法 5.1 raft算法基础 5.1.1 raft状态机 5.1.2 raft任期 5.1.3 raft节点通讯 5.2 Leader选举 5.2.1 选举过程 5.2.2 选举成功的条件 5.2.3 如何避免无限循环的投票分裂 5.3 日志复制 5.3.1 复制的流程 5.3.2 日志的组织方式 5.3.3 提交日志 5.3.4 匹配日志 5.3.5 日志不一致的场景 5.3.6 避免 log 不一致：AppendEntries 中的一致性检查 5.4 安全性 5.4.1 限制一：包含所有已提交 entry 的节点才能被选为 leader 5.4.2 限制二： 5.4.3 安全性论证 5.5 Follower/candidate 故障 5.6 时序 6. 集群成员发生变更 7. 日志压缩 8. 客户端交互 8.1 如何寻找leader 8.2 线性化语义 8.3 只读操作 9. 实现和评估(非本文重点) 9.1 可理解性 9.2 正确性 9.3 性能 10. 相关工作 11. 结论 问题 raft算法，有没有可能有多个candidate同时获得了多数票？ raft算法中，节点根据什么规则投票? Raft 算法在 CAP 理论中属于哪种系统 raft理论只适用于k-v系统吗？是否适用于关系型数据库 资源","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/lesson/cs6.824-distributed-system/lesson5-7-raft.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"raft算法"}],["meta",{"property":"og:description","content":"raft算法 1. 引言 2. 复制式状态机 3. Paxos的问题 4. 面向可理解性的设计 5. raft一致性算法 5.1 raft算法基础 5.1.1 raft状态机 5.1.2 raft任期 5.1.3 raft节点通讯 5.2 Leader选举 5.2.1 选举过程 5.2.2 选举成功的条件 5.2.3 如何避免无限循环的投票分裂 5.3 日志复制 5.3.1 复制的流程 5.3.2 日志的组织方式 5.3.3 提交日志 5.3.4 匹配日志 5.3.5 日志不一致的场景 5.3.6 避免 log 不一致：AppendEntries 中的一致性检查 5.4 安全性 5.4.1 限制一：包含所有已提交 entry 的节点才能被选为 leader 5.4.2 限制二： 5.4.3 安全性论证 5.5 Follower/candidate 故障 5.6 时序 6. 集群成员发生变更 7. 日志压缩 8. 客户端交互 8.1 如何寻找leader 8.2 线性化语义 8.3 只读操作 9. 实现和评估(非本文重点) 9.1 可理解性 9.2 正确性 9.3 性能 10. 相关工作 11. 结论 问题 raft算法，有没有可能有多个candidate同时获得了多数票？ raft算法中，节点根据什么规则投票? Raft 算法在 CAP 理论中属于哪种系统 raft理论只适用于k-v系统吗？是否适用于关系型数据库 资源"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-26T06:26:49.000Z"}],["meta",{"property":"article:tag","content":"分布式系统"}],["meta",{"property":"article:modified_time","content":"2024-09-26T06:26:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"raft算法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-09-26T06:26:49.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 复制式状态机","slug":"_2-复制式状态机","link":"#_2-复制式状态机","children":[]},{"level":2,"title":"3. Paxos的问题","slug":"_3-paxos的问题","link":"#_3-paxos的问题","children":[]},{"level":2,"title":"4. 面向可理解性的设计","slug":"_4-面向可理解性的设计","link":"#_4-面向可理解性的设计","children":[]},{"level":2,"title":"5. raft一致性算法","slug":"_5-raft一致性算法","link":"#_5-raft一致性算法","children":[{"level":3,"title":"5.1 raft算法基础","slug":"_5-1-raft算法基础","link":"#_5-1-raft算法基础","children":[]},{"level":3,"title":"5.2 Leader选举","slug":"_5-2-leader选举","link":"#_5-2-leader选举","children":[]},{"level":3,"title":"5.3 日志复制","slug":"_5-3-日志复制","link":"#_5-3-日志复制","children":[]},{"level":3,"title":"5.4 安全性","slug":"_5-4-安全性","link":"#_5-4-安全性","children":[]},{"level":3,"title":"5.5 Follower/candidate 故障","slug":"_5-5-follower-candidate-故障","link":"#_5-5-follower-candidate-故障","children":[]},{"level":3,"title":"5.6 时序","slug":"_5-6-时序","link":"#_5-6-时序","children":[]}]},{"level":2,"title":"6. 集群成员发生变更","slug":"_6-集群成员发生变更","link":"#_6-集群成员发生变更","children":[]},{"level":2,"title":"7. 日志压缩","slug":"_7-日志压缩","link":"#_7-日志压缩","children":[]},{"level":2,"title":"8. 客户端交互","slug":"_8-客户端交互","link":"#_8-客户端交互","children":[{"level":3,"title":"8.1 如何寻找leader","slug":"_8-1-如何寻找leader","link":"#_8-1-如何寻找leader","children":[]},{"level":3,"title":"8.2 线性化语义","slug":"_8-2-线性化语义","link":"#_8-2-线性化语义","children":[]},{"level":3,"title":"8.3 只读操作","slug":"_8-3-只读操作","link":"#_8-3-只读操作","children":[]}]},{"level":2,"title":"9. 实现和评估(非本文重点)","slug":"_9-实现和评估-非本文重点","link":"#_9-实现和评估-非本文重点","children":[{"level":3,"title":"9.1 可理解性","slug":"_9-1-可理解性","link":"#_9-1-可理解性","children":[]},{"level":3,"title":"9.2 正确性","slug":"_9-2-正确性","link":"#_9-2-正确性","children":[]},{"level":3,"title":"9.3 性能","slug":"_9-3-性能","link":"#_9-3-性能","children":[]}]},{"level":2,"title":"10. 相关工作","slug":"_10-相关工作","link":"#_10-相关工作","children":[]},{"level":2,"title":"11. 结论","slug":"_11-结论","link":"#_11-结论","children":[]},{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[{"level":3,"title":"raft算法，有没有可能有多个candidate同时获得了多数票？","slug":"raft算法-有没有可能有多个candidate同时获得了多数票","link":"#raft算法-有没有可能有多个candidate同时获得了多数票","children":[]},{"level":3,"title":"raft算法中，节点根据什么规则投票?","slug":"raft算法中-节点根据什么规则投票","link":"#raft算法中-节点根据什么规则投票","children":[]},{"level":3,"title":"Raft 算法在 CAP 理论中属于哪种系统","slug":"raft-算法在-cap-理论中属于哪种系统","link":"#raft-算法在-cap-理论中属于哪种系统","children":[]},{"level":3,"title":"raft理论只适用于k-v系统吗？是否适用于关系型数据库","slug":"raft理论只适用于k-v系统吗-是否适用于关系型数据库","link":"#raft理论只适用于k-v系统吗-是否适用于关系型数据库","children":[]}]},{"level":2,"title":"资源","slug":"资源","link":"#资源","children":[]}],"git":{"createdTime":1726716009000,"updatedTime":1727332009000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":13}]},"readingTime":{"minutes":45.63,"words":13688},"filePathRelative":"posts/lesson/cs6.824-distributed-system/lesson5-7-raft.md","localizedDate":"2024年9月19日","excerpt":"<ul>\\n<li><a href=\\"#raft%E7%AE%97%E6%B3%95\\">raft算法</a>\\n<ul>\\n<li><a href=\\"#1-%E5%BC%95%E8%A8%80\\">1. 引言</a></li>\\n<li><a href=\\"#2-%E5%A4%8D%E5%88%B6%E5%BC%8F%E7%8A%B6%E6%80%81%E6%9C%BA\\">2. 复制式状态机</a></li>\\n<li><a href=\\"#3-paxos%E7%9A%84%E9%97%AE%E9%A2%98\\">3. Paxos的问题</a></li>\\n<li><a href=\\"#4-%E9%9D%A2%E5%90%91%E5%8F%AF%E7%90%86%E8%A7%A3%E6%80%A7%E7%9A%84%E8%AE%BE%E8%AE%A1\\">4. 面向可理解性的设计</a></li>\\n<li><a href=\\"#5-raft%E4%B8%80%E8%87%B4%E6%80%A7%E7%AE%97%E6%B3%95\\">5. raft一致性算法</a>\\n<ul>\\n<li><a href=\\"#51-raft%E7%AE%97%E6%B3%95%E5%9F%BA%E7%A1%80\\">5.1 raft算法基础</a>\\n<ul>\\n<li><a href=\\"#511-raft%E7%8A%B6%E6%80%81%E6%9C%BA\\">5.1.1 raft状态机</a></li>\\n<li><a href=\\"#512-raft%E4%BB%BB%E6%9C%9F\\">5.1.2 raft任期</a></li>\\n<li><a href=\\"#513-raft%E8%8A%82%E7%82%B9%E9%80%9A%E8%AE%AF\\">5.1.3 raft节点通讯</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#52-leader%E9%80%89%E4%B8%BE\\">5.2 Leader选举</a>\\n<ul>\\n<li><a href=\\"#521-%E9%80%89%E4%B8%BE%E8%BF%87%E7%A8%8B\\">5.2.1 选举过程</a></li>\\n<li><a href=\\"#522-%E9%80%89%E4%B8%BE%E6%88%90%E5%8A%9F%E7%9A%84%E6%9D%A1%E4%BB%B6\\">5.2.2 选举成功的条件</a></li>\\n<li><a href=\\"#523-%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D%E6%97%A0%E9%99%90%E5%BE%AA%E7%8E%AF%E7%9A%84%E6%8A%95%E7%A5%A8%E5%88%86%E8%A3%82\\">5.2.3 如何避免无限循环的投票分裂</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#53-%E6%97%A5%E5%BF%97%E5%A4%8D%E5%88%B6\\">5.3 日志复制</a>\\n<ul>\\n<li><a href=\\"#531-%E5%A4%8D%E5%88%B6%E7%9A%84%E6%B5%81%E7%A8%8B\\">5.3.1 复制的流程</a></li>\\n<li><a href=\\"#532-%E6%97%A5%E5%BF%97%E7%9A%84%E7%BB%84%E7%BB%87%E6%96%B9%E5%BC%8F\\">5.3.2 日志的组织方式</a></li>\\n<li><a href=\\"#533-%E6%8F%90%E4%BA%A4%E6%97%A5%E5%BF%97\\">5.3.3 提交日志</a></li>\\n<li><a href=\\"#534-%E5%8C%B9%E9%85%8D%E6%97%A5%E5%BF%97\\">5.3.4 匹配日志</a></li>\\n<li><a href=\\"#535-%E6%97%A5%E5%BF%97%E4%B8%8D%E4%B8%80%E8%87%B4%E7%9A%84%E5%9C%BA%E6%99%AF\\">5.3.5 日志不一致的场景</a></li>\\n<li><a href=\\"#536-%E9%81%BF%E5%85%8D-log-%E4%B8%8D%E4%B8%80%E8%87%B4appendentries-%E4%B8%AD%E7%9A%84%E4%B8%80%E8%87%B4%E6%80%A7%E6%A3%80%E6%9F%A5\\">5.3.6 避免 log 不一致：AppendEntries 中的一致性检查</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#54-%E5%AE%89%E5%85%A8%E6%80%A7\\">5.4 安全性</a>\\n<ul>\\n<li><a href=\\"#541-%E9%99%90%E5%88%B6%E4%B8%80%E5%8C%85%E5%90%AB%E6%89%80%E6%9C%89%E5%B7%B2%E6%8F%90%E4%BA%A4-entry-%E7%9A%84%E8%8A%82%E7%82%B9%E6%89%8D%E8%83%BD%E8%A2%AB%E9%80%89%E4%B8%BA-leader\\">5.4.1 限制一：包含所有已提交 entry 的节点才能被选为 leader</a></li>\\n<li><a href=\\"#542-%E9%99%90%E5%88%B6%E4%BA%8C\\">5.4.2 限制二：</a></li>\\n<li><a href=\\"#543-%E5%AE%89%E5%85%A8%E6%80%A7%E8%AE%BA%E8%AF%81\\">5.4.3 安全性论证</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#55-followercandidate-%E6%95%85%E9%9A%9C\\">5.5 Follower/candidate 故障</a></li>\\n<li><a href=\\"#56-%E6%97%B6%E5%BA%8F\\">5.6 时序</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#6-%E9%9B%86%E7%BE%A4%E6%88%90%E5%91%98%E5%8F%91%E7%94%9F%E5%8F%98%E6%9B%B4\\">6. 集群成员发生变更</a></li>\\n<li><a href=\\"#7-%E6%97%A5%E5%BF%97%E5%8E%8B%E7%BC%A9\\">7. 日志压缩</a></li>\\n<li><a href=\\"#8-%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%BA%A4%E4%BA%92\\">8. 客户端交互</a>\\n<ul>\\n<li><a href=\\"#81-%E5%A6%82%E4%BD%95%E5%AF%BB%E6%89%BEleader\\">8.1 如何寻找leader</a></li>\\n<li><a href=\\"#82-%E7%BA%BF%E6%80%A7%E5%8C%96%E8%AF%AD%E4%B9%89\\">8.2 线性化语义</a></li>\\n<li><a href=\\"#83-%E5%8F%AA%E8%AF%BB%E6%93%8D%E4%BD%9C\\">8.3 只读操作</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#9-%E5%AE%9E%E7%8E%B0%E5%92%8C%E8%AF%84%E4%BC%B0%E9%9D%9E%E6%9C%AC%E6%96%87%E9%87%8D%E7%82%B9\\">9. 实现和评估(非本文重点)</a>\\n<ul>\\n<li><a href=\\"#91-%E5%8F%AF%E7%90%86%E8%A7%A3%E6%80%A7\\">9.1 可理解性</a></li>\\n<li><a href=\\"#92-%E6%AD%A3%E7%A1%AE%E6%80%A7\\">9.2 正确性</a></li>\\n<li><a href=\\"#93-%E6%80%A7%E8%83%BD\\">9.3 性能</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#10-%E7%9B%B8%E5%85%B3%E5%B7%A5%E4%BD%9C\\">10. 相关工作</a></li>\\n<li><a href=\\"#11-%E7%BB%93%E8%AE%BA\\">11. 结论</a></li>\\n<li><a href=\\"#%E9%97%AE%E9%A2%98\\">问题</a>\\n<ul>\\n<li><a href=\\"#raft%E7%AE%97%E6%B3%95%E6%9C%89%E6%B2%A1%E6%9C%89%E5%8F%AF%E8%83%BD%E6%9C%89%E5%A4%9A%E4%B8%AAcandidate%E5%90%8C%E6%97%B6%E8%8E%B7%E5%BE%97%E4%BA%86%E5%A4%9A%E6%95%B0%E7%A5%A8\\">raft算法，有没有可能有多个candidate同时获得了多数票？</a></li>\\n<li><a href=\\"#raft%E7%AE%97%E6%B3%95%E4%B8%AD%E8%8A%82%E7%82%B9%E6%A0%B9%E6%8D%AE%E4%BB%80%E4%B9%88%E8%A7%84%E5%88%99%E6%8A%95%E7%A5%A8\\">raft算法中，节点根据什么规则投票?</a></li>\\n<li><a href=\\"#raft-%E7%AE%97%E6%B3%95%E5%9C%A8-cap-%E7%90%86%E8%AE%BA%E4%B8%AD%E5%B1%9E%E4%BA%8E%E5%93%AA%E7%A7%8D%E7%B3%BB%E7%BB%9F\\">Raft 算法在 CAP 理论中属于哪种系统</a></li>\\n<li><a href=\\"#raft%E7%90%86%E8%AE%BA%E5%8F%AA%E9%80%82%E7%94%A8%E4%BA%8Ek-v%E7%B3%BB%E7%BB%9F%E5%90%97%E6%98%AF%E5%90%A6%E9%80%82%E7%94%A8%E4%BA%8E%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93\\">raft理论只适用于k-v系统吗？是否适用于关系型数据库</a></li>\\n</ul>\\n</li>\\n<li><a href=\\"#%E8%B5%84%E6%BA%90\\">资源</a></li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{l as data};
