import{_ as s,V as n,W as a,a0 as e}from"./framework-9a29aaa0.js";const p={},l=e(`<ul><li><a href="#cs-6824%E7%AC%AC12%E8%AE%B2-%E5%88%86%E5%B8%83%E5%BC%8F%E4%BA%8B%E5%8A%A1">cs-6.824第12讲 分布式事务</a><ul><li><a href="#%E5%B9%B6%E5%8F%91%E6%8E%A7%E5%88%B6">并发控制</a></li><li><a href="#%E5%8E%9F%E5%AD%90%E6%8F%90%E4%BA%A4">原子提交</a></li></ul></li></ul><h1 id="cs-6-824第12讲-分布式事务" tabindex="-1"><a class="header-anchor" href="#cs-6-824第12讲-分布式事务" aria-hidden="true">#</a> cs-6.824第12讲 分布式事务</h1><p><strong>分布式事务</strong>之所以出现，是因为很多业务拥有大量的数据，这些数据最终会被分割或分片到不同的服务器上。</p><p>例如，你正在运行一家银行，那么可能一半客户的银行余额存储在一台服务器上，而另一半客户的银行余额则存储在另一台服务器上。这样做就可以<strong>分散负载</strong>，分散负载包含包括<strong>分散处理</strong>和<strong>分散存储</strong>两个点。再例如，如果你正在网站上记录文章的投票数，或者存在数以百万计的文章，其中一半的票数统计在一个服务器上，而另一半则分布在另一个服务器上。</p><p>但是有一些操作需要接触、修改或读取分布在不同服务器上的数据。以上面的银行的例子，如果执行一个客户到另一个客户的银行转账，那么他们的余额可能存储在不同的服务器上，因此为了实现平衡，我们必须对两个不同的服务器上的数据进行修改、读取和写入操作。</p><p>我们希望做到的是试图隐藏数据分散到多个服务器上，尽量不让应用程序开发者感知到。这就是分布式事务所产生的背景，所谓<strong>事务</strong>其实就是<strong>并发控制</strong>和<strong>原子提交</strong>。程序员拥有一系列不同的操作，可能针对数据库中的不同的记录进行，希望这些操作可以作为一个整体，不受故障或者其他活动影响而分割。 事务处理系统将要求程序员标记读写及更新操作序列的起始和结束，以便明确事务的起始和结束。</p><p>再次看银行的例子：</p><p>我们希望从用户x的账户向用户y的账户进行转账，现在他们双方的余额初始状态都是10。现在有两个事务：</p><ul><li>T1：一笔交易时从账户X向账户y转账一美元</li><li>T2：对该银行进行审计，以确保银行资金总量不变。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>x <span class="token operator">=</span> <span class="token number">10</span>  y <span class="token operator">=</span> <span class="token number">10</span>
T1：
BEGIN_X
    add<span class="token punctuation">(</span>x, <span class="token number">1</span><span class="token punctuation">)</span>
    add<span class="token punctuation">(</span>y, -1<span class="token punctuation">)</span>
END_X

T2:AUDIT
BEGIN_X
   t1 <span class="token operator">=</span> get<span class="token punctuation">(</span>x<span class="token punctuation">)</span>
   t2 <span class="token operator">=</span> get<span class="token punctuation">(</span>y<span class="token punctuation">)</span>
   print t1, t2
END_X
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在问题是，这两个事务的合法结果是什么?</p><p>再讨论这个之前，我们需要了解，什么样的结果是正确的。</p><p><strong>数据库事务</strong>通常具有一个称为ACID的正确性概念，缩写为ACID。</p><ul><li>原子性(A， atomic)，这意味着一个包含多个步骤的交易，可能涉及对多个不同记录的写入，若发生故障，无论何种故障，要么所有写入都完成，要么都不执行。(All or None on failure)</li><li>一致性(C， consistent)，数据库会执行应用程序所声明的不变量(不在本课讨论范围内)</li><li>隔离性(I，isolated)，两个同时运行的交易在完成之前是否能看到彼此变更的特性，期望值是不能看到。在技术层面，大多数人所指的隔离性，是指事务执行的<strong>可串行化</strong>（后续还会讲）。</li><li>持久性(D，durable)，在事务提交之后，事务的修改是持久的，它不会因为某些故障而被抹除。在实践中，这意味着数据必须被写入某种易失性戒指，如磁盘这样的持久存储设备。</li></ul><p>这里面比较有意思的是隔离性（串行化）。如果存在某种顺序，使得事务串行执行的结果和实际并行执行的结果相同，则代表可以串行化。</p><p>这里回到上面的银行转账的例子， 由于只有两个事务T1和T2，所以只有两种顺序，先执行T1，再执行T2。或者先执行T2，再执行T1。因此我们分别看两种顺序所产生的结果,如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>T1-<span class="token operator">&gt;</span>T2: 
<span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">11</span> <span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token number">9</span> <span class="token string">&quot;11,9&quot;</span>

T2-<span class="token operator">&gt;</span>T1:
<span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">11</span> <span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token number">9</span> <span class="token string">&quot;10,10&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只要事务不使用相同的数据，就允许真正的并行。在上面的例子中，我们使用了相同的数据x和y，因此不能并行。如果你有一个分片的系统，那么并行度可能会更高，因为数据分布在不同的机器上。一个事务完全在第一台机器的第一个分片上执行，而另一个事务则同时在第二个机器上并行。</p><p>事务可能由于某种原因，在执行过程中基本失败或决定失败，我们必须应对那些在执行中突然决定无法继续进行的事务的必要性。</p><h2 id="并发控制" tabindex="-1"><a class="header-anchor" href="#并发控制" aria-hidden="true">#</a> 并发控制</h2><p><strong>并发控制</strong>是用来提供<strong>隔离性</strong>和<strong>串行化</strong>的主要方法。</p><p>并发控制主要有以下两种：</p><ul><li>悲观并发控制</li><li>乐观并发控制</li></ul><p>悲观并发控制，通常依赖于锁机制。其含义是事务在使用任何数据之前，它需要获取该数据的锁。若其他事务已占该数据，锁将被保持，我们需等待以获取锁的释放，等待占有锁的事务完成。</p><p>乐观并发控制，核心思想是，你无需顾虑其他事务是否可能与你同时进行数据的读写操作，你只需直接执行你计划中的读写操作，只有在最后才去检查是否可能有其他事务可能产生干扰。如果此时，其他人在以冲突的方式修改同一数据，那么您就必须中止该事务并重试。(第14讲会涉及这个话题)。</p><p>如果冲突非常频繁，可能使用悲观并发控制更好。因为如果冲突非常频繁，乐观方案将会因为冲突而导致大量事务中止。</p><p>如果冲突不太常见，那么乐观控制可能更快，因为它完全避免了锁的开销。</p><p>今天主要讨论的是悲观并发控制。今天我们将探讨两阶段锁定(two-phase locking)，这是最常见的锁定类型。</p><p>两阶段锁定的思想是，</p><ul><li>一个事务将会使用一堆记录，例如例子中的x和y，在使用任何数据片段之前(无论是读还是写)，都必须先获取锁。</li><li>一个事务必须在提交或终止之后才能释放其所获取的任何锁。在事务执行的过程中，不允许中途释放锁。</li></ul><p>为了理解锁定在此处的作用，典型的锁定系统存在许多变种。通常，这些系统为数据库中的每条记录、每行和每张表分别关联一个独立的锁。回到上面的例子，当T1使用x时，必须在使用前获取x上的锁，并且可能等待。同理，对于y，也需要获取y上的锁，事务完成后才能释放这两个锁。</p><p>如果同时运行这两个事务，它们将竞争获取对x的锁定，无论哪个事务获取对x的锁定，它将得以继续执行并完成。于此同时，另一个未能获取到x锁的事务将在此等待，直到能够获取，它才可以对x进行操作。这里可以看到由于事务需要获取对x的锁定，实际上就实现了串行化。</p><p>接下来讨论一个问题，为什么你需要保持锁定直到事务全部完成才可以释放？</p><p>这里主要有两个原因：</p><ul><li>第一个原因可能会违背线性化的要求 假设T2在箭头处，释放了x的lock，那么T1就可以继续执行，这种交错是违背线性化的。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>T2:AUDIT
BEGIN_X
t1 <span class="token operator">=</span> get<span class="token punctuation">(</span>x<span class="token punctuation">)</span>
---<span class="token operator">&gt;</span>release x lock
t2 <span class="token operator">=</span> get<span class="token punctuation">(</span>y<span class="token punctuation">)</span>
print t1, t2
END_X
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，如果T1在完成对x加1操作后，释放了对x的锁定，这允许T2的所有操作在此处插入。这也会违背线性化。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>T1：
BEGIN_X
    add<span class="token punctuation">(</span>x, <span class="token number">1</span><span class="token punctuation">)</span>
---<span class="token operator">&gt;</span> release x lock
    add<span class="token punctuation">(</span>y, -1<span class="token punctuation">)</span>
END_X
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>第一个原因就是提前释放锁对于事务提前终止会产生问题。</li></ul><p>如果在<code>add(x， 1)</code>之后释放了锁，然后随后由于y的余额不足，而导致y扣款失败，那么事务将会终止，将会对撤销对于x的更新，以保持原子性。 这个时候，由于T2可能会提前执行，T2可能会看到一个&quot;幽灵&quot;的11，这个值11后续因为T1的终止而消失。</p><p>这里还需讨论关于锁定锁产生的死锁问题。</p><p>假设我们有两个事务，其中一个读取x，然后读取y，另一个事务读取y，再读取x，如果它们同时运行，就会死锁。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>T1：        T2:
Get<span class="token punctuation">(</span>x<span class="token punctuation">)</span>       Get<span class="token punctuation">(</span>y<span class="token punctuation">)</span>
Get<span class="token punctuation">(</span>y<span class="token punctuation">)</span>       Get<span class="token punctuation">(</span>x<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事务通常会采取追踪循环或设置超时，以便检测到它们已陷入某种状态。当发现异常时，将终止其中一个事务。</p><p>到目前为止，我们所提到的概念都是标准数据库的行为，在单机数据库中如此，在分布式系统中也是如此。接下来将聚焦于分布式环境中支持事务处理。</p><p>我们有两台服务器，一台服务器存储我们的银行记录x。我们还有服务器2，可能它存储了记录y。因此它们都具有初始值10。还是以转账为例，将x加1，y进行减1。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>    S1          S2  
<span class="token operator">|</span>--------<span class="token operator">|</span>  <span class="token operator">|</span>--------<span class="token operator">|</span>
<span class="token operator">|</span> x <span class="token operator">|</span> <span class="token number">10</span> <span class="token operator">|</span>  <span class="token operator">|</span> y <span class="token operator">|</span> <span class="token number">10</span> <span class="token operator">|</span>
<span class="token operator">|</span>   <span class="token operator">|</span>    <span class="token operator">|</span>  <span class="token operator">|</span>   <span class="token operator">|</span>    <span class="token operator">|</span>
<span class="token operator">|</span>--------<span class="token operator">|</span>  <span class="token operator">|</span>--------<span class="token operator">|</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们不够谨慎，可能会遇到一种情况，服务器1为x增加余额，但随后发生了故障，导致我们未能完成对y的更新。</p><p>另一种情况下，服务器1为x增加余额，s2并未发生故障，但是可能y的值提示余额不足，无法扣款，但是x余额已经进行增加。</p><p>数据库事务的原子性要求交易要么完全完整，要么都不执行。上面两个场景显然违背了。在下一节中将讨论原子提交的问题，</p><h2 id="原子提交" tabindex="-1"><a class="header-anchor" href="#原子提交" aria-hidden="true">#</a> 原子提交</h2><p>两阶段提交是一个原子提交协议，这个原理被很多分布式数据库采用，也被各种其他非传统数据库的分布式系统所应用。</p><p>我们假设有一个驱动事务的计算机，称为事务协调器。它可以向拥有不同数据片段的计算机发送消息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>            S1            
        <span class="token operator">|</span>--------<span class="token operator">|</span>  
        <span class="token operator">|</span> x <span class="token operator">|</span> <span class="token number">10</span> <span class="token operator">|</span>  
        <span class="token operator">|</span>   <span class="token operator">|</span>    <span class="token operator">|</span>  
        <span class="token operator">|</span>--------<span class="token operator">|</span>  
TC
        S2
        <span class="token operator">|</span>--------<span class="token operator">|</span>
        <span class="token operator">|</span> y <span class="token operator">|</span> <span class="token number">10</span> <span class="token operator">|</span>
        <span class="token operator">|</span>   <span class="token operator">|</span>    <span class="token operator">|</span>
        <span class="token operator">|</span>--------<span class="token operator">|</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事务协调器实际上会维护一个关于事务ID的表。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/lesson/6.824/lesson12/two-phase-commit.png" alt="两阶段提交" tabindex="0" loading="lazy"><figcaption>两阶段提交</figcaption></figure><p>为了遵守两阶段的锁定规则，每个参与者在执行事务的一部分时，都会锁定其读取的任何数据。可以想象在每个<strong>参与者</strong>的内部，都存在一张与该参与者存储的数据先关联的表。参与者们会在这些表格中锁定信息。</p><p>如果所有人都遵循此协议且无任何故障发生，那么两位参与者只在双方均承诺的情况下才会提交。若其中任何一方无法提交，则双方均会终止。因此我们得到了期望的结果，要么它们都执行，要么都不执行。</p><p>接下来我们考虑各种异常的场景，看看2PC是否解决了问题。</p><p>问题一： server B 崩溃，例如电源故障，B突然停止，然后电源恢复，它重新启动，并运行某种恢复软件。我们实际上可能要考虑两种情况。</p><p>一种情况是B可能在发送prepare确认消息之前就crash了，那么B就不会回复prepare ok的消息，因此事务协调器不可能提交，因为它需要等待所有参与者的肯定答复。</p><p>另一种情况是B可能在发送prepare确认消息之后crash。这种场景将会麻烦一些。这种场景下，事务协调器将发送提交事务的请求，因为A和B在prepare阶段都发送了同意。在B回复同意之前，</p><p>50：45</p>`,63),o=[l];function t(i,r){return n(),a("div",null,o)}const d=s(p,[["render",t],["__file","lesson12.html.vue"]]);export{d as default};