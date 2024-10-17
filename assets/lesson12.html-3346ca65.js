import{_ as e,V as a,W as n,a0 as p}from"./framework-9a29aaa0.js";const s={},c=p('<ul><li><a href="#cs-6824%E7%AC%AC12%E8%AE%B2-spanner">cs-6.824第12讲 Spanner</a></li></ul><h1 id="cs-6-824第12讲-spanner" tabindex="-1"><a class="header-anchor" href="#cs-6-824第12讲-spanner" aria-hidden="true">#</a> cs-6.824第12讲 Spanner</h1><p>一个系统如何在数据广泛分散的情况下提供分布式事务。这些数据可能散布在互联网及不同的数据中心中。</p><p>将数据分布在整个网络中也非常可取，这既是为例容错，也是为了数据可以就近存在。</p><p>在实现这一目标的过程中，Spanner至少采用了两个巧妙地设计理念.</p><p>其中一点是它们运行两阶段提交，但实际上是通过paxos复制者参与者来执行地，以此来规避两阶段提交因协调器崩溃导致所有人阻塞地问题。</p><p>另一个有趣的思路是，他们利用同步时间来实现非常高效的只读事务。</p><p>这个系统在google内部被很广泛的使用。开源项目cockroachDB就是采用了这个设计。</p><p>最早促使他们开始设计Spanner的原因是因为他们在Google内部已经拥有大型数据库系统，尤其是广告系统，其数据被分散存储在众多独立的mysql和bigtable数据库中。而维护这种数据分片，确是一个笨拙又费时且需要人工操作的过程。此外，他们之前的广告数据库系统不支持跨越一个基本服务器的事务，但他们确实希望能够在更广泛的范围内分散数据以提高性能，并能在数据的多个分片上进行事务处理。</p><p>对于他们的广告数据库，显示工作负载主要是只读事务。论文的图6可以看到这一现象，其中包含了数十亿次的只读交易和仅数百万次的读写交易。因此他们对仅执行读操作的只读事务的性能非常感兴趣。</p><p>显然，他们还需要强一致性，即特性事务的一致性，他们希望事务是可串行化的，并且也希望外部一致性。如果一个事务提交了，在该事务提交完成后另一个事务开始，第二个事务需要看到第一个事务所做的任何修改。</p><p>6:53</p>',12),r=[c];function o(t,l){return a(),n("div",null,r)}const i=e(s,[["render",o],["__file","lesson12.html.vue"]]);export{i as default};
