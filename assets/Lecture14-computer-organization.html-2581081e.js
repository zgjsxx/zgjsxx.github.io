import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const p={},t=e(`<h2 id="十四讲-计算机组织架构" tabindex="-1"><a class="header-anchor" href="#十四讲-计算机组织架构" aria-hidden="true">#</a> 十四讲 计算机组织架构</h2><p>计算机仍然是一个抽象概念。即使使用汇编语言工作，我们编写的内容与实际发生的情况之间仍然存在多层&quot;魔力&quot;！</p><h3 id="冯诺依曼架构" tabindex="-1"><a class="header-anchor" href="#冯诺依曼架构" aria-hidden="true">#</a> 冯诺依曼架构</h3><p>大多数现代计算机都属于<strong>冯·诺依曼架构</strong>。冯·诺依曼架构的基本要素是：</p><ul><li><p>一个处理器（正式的描述将其分为处理单元和控制单元，但我们可以将它们视为一个）</p></li><li><p>存储程序和数据的单个存储器。</p></li></ul><p>也就是说，冯·诺依曼架构下处理器与存储器是分开的。并且与哈佛架构机器不同，哈佛架构机器有两个独立的内存，一个用于程序，一个用于数据。还有其他架构， 例如连接机架构，两个存储器都直接在处理器上，而不是分开的。</p><h3 id="测量内存访问速度" tabindex="-1"><a class="header-anchor" href="#测量内存访问速度" aria-hidden="true">#</a> 测量内存访问速度</h3><p>由于处理器和内存是不同的功能单元，因此数据从内存到 CPU 需要一些时间，反之亦然。CPU 和内存通过总线连接（总线也连接到系统上的其他设备）。测量内存访问速度的常用方法是吞吐量、每秒字节数（或位）。然而，这一措施可能具有欺骗性。就吞吐量而言，以下哪项是将数据从南加州传输到纽约的最佳方式：</p><ul><li>(1)通过互联网发送。</li><li>(2)通过专用连接发送。</li><li>(3)在一辆小型货车上装满 USB 驱动器并驾驶越野。</li></ul><p>就吞吐量而言，选项（3）是最好的！尽管事实上需要两天的时间才能开车过去。吞吐量作为一种衡量标准具有欺骗性，因为它混淆了两个不同的概念：</p><ul><li>正在传输多少数据</li><li>传输数据需要多长时间</li></ul><p>第一个称为&quot;带宽&quot;，第二个称为&quot;延迟&quot;。吞吐量就是带宽除以延迟。 装有USB的小型货车的延迟非常严重（两天），但这被其巨大的带宽所掩盖。</p><p>带宽是可以&quot;一次性&quot;传输的最大数据量。例如，如果我们有一个 64 位总线（8 字节），那么我们可以一次性向 CPU 传输 8 个字节，或者从 CPU 传输 8 个字节。这也意味着，如果我们传输少于 8 个字节，则所花费的时间与传输完整 8 个字节所花费的时间相同。示例：假设我们有一个 64 位总线，延迟为 1ns。传输39个字节需要多长时间？39/8 四舍五入为 5, 5ns。我们必须向上舍入，因为 7 个字节的部分传输，无论是在开头还是结尾完成，仍然需要 1ns。最坏的情况是 41 个字节，四舍五入为 6 ns。 1 个额外字节仍然需要完整的 1ns 周期来传输。</p><p>考虑两种内存架构：</p><table><thead><tr><th></th><th>架构1</th><th>架构2</th></tr></thead><tbody><tr><td>延迟</td><td>100ms</td><td>10ms</td></tr><tr><td>带宽</td><td>100KB</td><td>1KB</td></tr></tbody></table><p>哪台计算机更快？如果我们只看延迟，就会出现拱形。 架构2更快，因为它访问内存的速度比架构1快10倍。 但架构1每个请求可以加载 100 倍以上的数据！</p><h3 id="冯诺依曼架构的瓶颈" tabindex="-1"><a class="header-anchor" href="#冯诺依曼架构的瓶颈" aria-hidden="true">#</a> 冯诺依曼架构的瓶颈</h3><p>在最早的计算机中，时钟速度足够慢，访问内存所需的时间与在 CPU 上执行操作所需的时间大致相当。因此，“内存访问”只是另一种 CPU 操作，性能与其他操作相同。然而，CPU 时钟频率急剧增加，虽然我们可用的内存大小也增加了，但内存访问的延迟却没有跟上。现在访问主内存比在 CPU 上执行操作慢很多倍。这种速度差异被称为冯·诺依曼瓶颈。</p><p>作为瓶颈后果的一个示例，请考虑需要实时执行三角运算的任务（例如，游戏中的旋转）。从历史上看，最快的方法是预先计算一个 sin 值表并将它们存储在内存中；当您需要计算 sin(x) 时，您只需在表中查找 x 即可。然而，现在这种方法太慢了：实际上，在 CPU 上计算 sin 的泰勒级数近似中的前十几项比在内存中往返要快！</p><p>我们在内存方面面临的主要权衡是：</p><ul><li><p>如果我们把内存做得很小，那么（因为它不占用太多物理空间）我们可以将其放置在靠近 CPU 的位置，甚至可能放在 CPU 本身上。这会减少延迟。</p></li><li><p>如果我们想要一个大内存（因为它在物理上也很大），我们必须将其放置在距离 CPU 更远的地方，从而增加延迟。</p></li></ul><p>换句话说，小内存=快，大内存=慢。</p><p>为了尝试两全其美，现代计算机体系结构使用缓存。高速缓存是位于 CPU 和主内存之间的较小内存，用于存储主内存的常用子集。例如，主内存的大小可能为 8GB，而缓存的大小可能为 64KB。由于高速缓存较小，因此它在物理上可以更靠近 CPU，因此高速缓存“中”的内存访问（“高速缓存命中”）速度更快。不在高速缓存“中”的内存访问（“高速缓存未命中”）同样慢，但是当发生未命中时，我们将其视为该地址或该地址附近的其他地址将在不久的将来再次访问的暗示，并且将其加载到缓存中。因此，对内存地址的第一次访问将是未命中（且缓慢），但后续访问将是命中（且快速）。</p><p>缓存基于这样的想法：程序通常不会不可预测地访问内存，而是以可预测的模式访问内存。特别是，如果我们要观察程序单次运行的内存访问模式，我们会注意到两件事：</p><ul><li>空间局部性：如果程序访问内存地址 x，它可能也会访问地址 x+1 或 x-1。换句话说，对某个地址的访问意味着该地址附近的其他地址也将被访问。</li><li>时间局部性：如果程序访问内存地址 x，它可能会在不久的将来再次访问 x。</li></ul><p>例如，考虑这个程序，它将一对 1024-int 数组中的值相乘，然后将所有乘数相加（这称为“乘积和”，并且在几何和信号处理应用程序中使用相当多）频繁地）：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">add_arrays</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">*</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">*</span> b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1024</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
    sum <span class="token operator">+=</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">*</span> b<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该程序具有空间和时间局部性：</p><ul><li>我们首先访问a[0]和b[0]，但下一次循环时，我们将访问a[1]、b[1]。这在整个循环中都成立：访问 a[i], b[i] 意味着我们很快也将访问 a[i+1], b[i+1]。</li><li>变量 sum 必须位于内存中的某个位置，并且由于它不是数组，因此它的地址在循环中不会更改。因此，在给定时间（循环迭代）访问 sum 表明我们需要在不久的将来再次访问 sum。</li></ul><p>您可能想知道我们如何能够将大量数据从主内存加载到缓存中，而不需要花费大量时间。例如，如果我们想要将 1024 字节加载到缓存中，那么这是否会花费单次内存访问时间的 1024 倍，从而消除使用缓存的任何好处？这个问题的答案来自另一个主内存性能变量，即带宽。）</p><p>这就回答了我们如何能够将合理数量的数据加载到缓存中的问题：由于内存带宽较宽，尽管内存请求很慢，但它可以具有相对较大的有效负载。</p><p>现代内存架构通常不仅有一个，而是有两个或三个缓存，其大小不断增加（并且速度越来越慢）。如果我们将基于磁盘的存储作为一种“内存”（甚至比主内存慢），我们会得到内存层次结构，从左边最小/最快，到右边最大/最慢：</p><p>离CPU越远，存储设备就越大，但访问速度就越慢。</p><h2 id="缓存的架构" tabindex="-1"><a class="header-anchor" href="#缓存的架构" aria-hidden="true">#</a> 缓存的架构</h2><p>高速缓存被组织成行和组。例如，16KB 的缓存可能有 16 组，每组有一行，这意味着每行为 1KB。每行可以存储主存的一个缓存区域。缓存使用多个集合/行，以便可以缓存独立的内存访问。例如，考虑一个循环读取两个数组的程序。如果高速缓存一次只能保存一个内存区域，那么高速缓存将不断在两个阵列之间切换，并且每次内存访问都将是高速缓存未命中。如果缓存总共至少有两行，那么在前两次访问之后，两个数组都有望加载到缓存中，并且所有后续访问都将是缓存命中。例如，在上面的示例中，数组 a 和 b 将被加载到单独的高速缓存行中，假设它们在内存中足够大/相距足够远，以至于不能同时放入一行中。</p><p>行的地址是其包含的内存区域的起始地址。这始终是缓存行大小的倍数。例如，如果行大小为 1KB，则起始地址为 0x000400 的行将包含内存地址 0x000400 到 0x0007ff。</p><p>如果缓存有多个集合，我们如何知道将内存访问放入哪个集合？缓存组是根据地址除以行大小并以组数为模自动选择的。例如，如果缓存有 16 个大小为 1kB 的集合，则内存的前 kB（地址 0x0 到 0x3ff）将进入第 0 行，地址 0x400 到 0x7ff 将进入第 1 行，依此类推。最终，随着地址变高，足够了，它们将返回到设置 0。</p><p>单集缓存没有很好的性能，因为它替换行太频繁。缓存需要更智能地了解它所替换的行。为了实现这一目标，我们在每个集合中放置多于一行，并允许缓存在替换集合中的哪一行方面具有一定的灵活性。虽然缓存中的集合仍然是自动选择的（按地址、除以行大小、模行/集合），但可以以更智能的方式选择集合中的行，即缓存替换策略：</p><p>假设我们有一个2路关联缓存；这意味着每组都有 2 行。我们的缓存的行大小为 1KB（1024 字节），并且有 2 组。因此，总缓存大小为</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1024</span>       ×     <span class="token number">2</span>     ×    <span class="token number">2</span>      <span class="token operator">=</span>    4KB
line size       sets       assoc.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>假设我们访问以下内存地址（记住1024是十六进制的0x400）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>0x400    <span class="token operator">=</span> <span class="token number">1024</span>
0x800    <span class="token operator">=</span> <span class="token number">2048</span>
0xc07    <span class="token operator">=</span> <span class="token number">3079</span>
0x401    <span class="token operator">=</span> <span class="token number">1025</span>
0x801    <span class="token operator">=</span> <span class="token number">2049</span>
0xc07    <span class="token operator">=</span> <span class="token number">3079</span>
0x402    <span class="token operator">=</span> <span class="token number">1026</span>
0x802    <span class="token operator">=</span> <span class="token number">2050</span>
0xc07    <span class="token operator">=</span> <span class="token number">3079</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（这基本上是上面示例中的内存访问模式：数组 a 从地址 0x400 开始，b 从地址 0x800 开始，sum 位于地址 0xc07 处。）</p><p>为了“模拟”缓存，我们实际上不需要存储内存中的值，我们只需要跟踪每行的两条信息</p><ul><li><p>它存储的内存地址范围是多少？ （因为所有行的大小相同，所以我们可以只存储每行的起始地址。）</p></li><li><p>几岁了？最旧的线路是“最近最少使用的”线路，因此将在需要时被选择进行替换。</p></li></ul>`,45),i=[t];function l(o,r){return s(),a("div",null,i)}const u=n(p,[["render",l],["__file","Lecture14-computer-organization.html.vue"]]);export{u as default};