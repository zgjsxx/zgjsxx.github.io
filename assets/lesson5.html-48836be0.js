import{_ as e,V as o,W as c,X as n,Y as s,$ as t,a0 as a,F as i}from"./framework-9a29aaa0.js";const l={},u=a('<ul><li><a href="#cs-6824%E7%AC%AC5%E8%AE%B2-gothreads-and-raft">cs-6.824第5讲 Go，Threads and Raft</a><ul><li><a href="#%E5%8A%A9%E6%95%991">助教1：</a><ul><li><a href="#%E5%8D%8F%E7%A8%8B">协程</a></li><li><a href="#%E9%97%AD%E5%8C%851">闭包1</a></li><li><a href="#%E9%97%AD%E5%8C%852">闭包2</a></li><li><a href="#%E5%91%A8%E6%9C%9F%E6%80%A7%E6%89%A7%E8%A1%8C%E7%A8%8B%E5%BA%8F">周期性执行程序</a></li><li><a href="#%E5%91%A8%E6%9C%9F%E6%80%A7%E6%89%A7%E8%A1%8C%E7%A8%8B%E5%BA%8F2">周期性执行程序2</a></li><li><a href="#%E4%BA%92%E6%96%A5%E9%94%81">互斥锁</a></li><li><a href="#%E4%BA%92%E6%96%A5%E9%94%812">互斥锁2</a></li><li><a href="#"></a></li><li><a href="#%E6%9D%A1%E4%BB%B6%E5%8F%98%E9%87%8F">条件变量</a></li></ul></li></ul></li></ul><h1 id="cs-6-824第5讲-go-threads-and-raft" tabindex="-1"><a class="header-anchor" href="#cs-6-824第5讲-go-threads-and-raft" aria-hidden="true">#</a> cs-6.824第5讲 Go，Threads and Raft</h1>',2),k={href:"https://github.com/b055/books-1/blob/master/Concurrency%20in%20Go.pdf",target:"_blank",rel:"noopener noreferrer"},r=a(`<h2 id="助教1" tabindex="-1"><a class="header-anchor" href="#助教1" aria-hidden="true">#</a> 助教1：</h2><p>在完成实验2时，写出易于理解的代码，使用大锁来保护大型临界区，不必过分担心CPU性能层面的表现。</p><h3 id="协程" tabindex="-1"><a class="header-anchor" href="#协程" aria-hidden="true">#</a> 协程</h3><h3 id="闭包1" tabindex="-1"><a class="header-anchor" href="#闭包1" aria-hidden="true">#</a> 闭包1</h3><p>首先提到了<strong>闭包</strong>的概念，闭包在很多编程语言中都存在，闭包可以简单理解为<strong>函数加上其捕获的外部变量</strong>。</p><p>闭包通常有下面一些特性：</p><ul><li>函数嵌套：通常，闭包是在一个函数内部定义的另一个函数（嵌套函数）。</li><li>捕获变量：闭包捕获外部函数中的局部变量，使得这些变量的生命周期延长，直到闭包本身被销毁。</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token builtin">string</span>
    <span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
    wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        a <span class="token operator">=</span> <span class="token string">&quot;hello world&quot;</span>
        wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子的主要功能是声明了一系列变量，然后通过go关键字启动go协程。这里定义了一个匿名的函数。这里其实就是一个闭包，其捕获了外部定义的字符串变量a，并且在闭包的内部修改了a的内容。</p><h3 id="闭包2" tabindex="-1"><a class="header-anchor" href="#闭包2" aria-hidden="true">#</a> 闭包2</h3><p>下面的这个例子和闭包1中的例子类似，只不过创建了更多的协程同时执行。并行发送RPC请求就是这样的场景。例如在实验二中，候选者(candidate)请求投票的过程是同时向所有的跟随着发送投票请求，而不是逐一发送。因为RPC请求是阻塞操作，耗时较长。同样，领导者可能会同时向所有的跟随着发送附加条目的请求，而不是串行执行。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">sendRPC</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
            wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">sendRPC</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子，需要注意的是不能直接捕获外部变量i，因为i在外部是会变化的，因此这里需要将i作为函数参数进行传递。</p><h3 id="周期性执行程序" tabindex="-1"><a class="header-anchor" href="#周期性执行程序" aria-hidden="true">#</a> 周期性执行程序</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;time&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;started&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">go</span> <span class="token function">periodic</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">5</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token comment">// wait for a while so we can observe what ticker does</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">periodic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;tick&quot;</span><span class="token punctuation">)</span>
        time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="周期性执行程序2" tabindex="-1"><a class="header-anchor" href="#周期性执行程序2" aria-hidden="true">#</a> 周期性执行程序2</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;time&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>
<span class="token keyword">var</span> done <span class="token builtin">bool</span>
<span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>Mutex
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;started&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">go</span> <span class="token function">periodic</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">5</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token comment">// wait for a while so we can observe what ticker does</span>
    mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    done <span class="token operator">=</span> <span class="token boolean">true</span>
    mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;cancelled&quot;</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">periodic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;tick&quot;</span><span class="token punctuation">)</span>
        time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
        mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> done <span class="token punctuation">{</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>学生提问</strong>：</p><p>为什么27行没有进行<code>Unlock()</code>？</p><p><strong>助教回答</strong>：</p><p>这里其实<code>return</code>之后，程序就会退出了，没有<code>Unlock</code>也不会有什么影响。不过最好还是在return之前进行<code>Unlock</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> done <span class="token punctuation">{</span>
    mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="互斥锁" tabindex="-1"><a class="header-anchor" href="#互斥锁" aria-hidden="true">#</a> 互斥锁</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;time&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    counter <span class="token operator">:=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            counter <span class="token operator">=</span> counter <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),d={href:"https://www.programiz.com/online-compiler/4I99lR5loblTn",target:"_blank",rel:"noopener noreferrer"},v=a(`<p>在这个例子中，它声明了一个计数器，并随后启动了一个goroutine，实际上启动了1000个goroutines，每个goroutines都会将计数器的值递增1。你可能希望程序可以打印出1000，但是实际上程序打印出的值往往小于1000。</p><p>解决该问题也很简单，只需要添加上锁，锁住临界区即可。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;time&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    counter <span class="token operator">:=</span> <span class="token number">0</span>
    <span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>Mutex
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">defer</span> mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            counter <span class="token operator">=</span> counter <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span>
    mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Raft的实验中，RPC处理程序通常会操作RAFT结构上进行读取或者写入数据，这些更新应该要与其他并发进行的更新保持同步。因此在RPC处理程序的场景模式是：获取锁，延迟解锁，然后在内部执行一些工作。</p><h3 id="互斥锁2" tabindex="-1"><a class="header-anchor" href="#互斥锁2" aria-hidden="true">#</a> 互斥锁2</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;time&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    alice <span class="token operator">:=</span> <span class="token number">10000</span>
    bob <span class="token operator">:=</span> <span class="token number">10000</span>
    <span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>Mutex

    total <span class="token operator">:=</span> alice <span class="token operator">+</span> bob
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
            mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            alice <span class="token operator">-=</span> <span class="token number">1</span>
            mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            bob <span class="token operator">+=</span> <span class="token number">1</span>
            mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
            mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            bob <span class="token operator">-=</span> <span class="token number">1</span>
            mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            alice <span class="token operator">+=</span> <span class="token number">1</span>
            mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> time<span class="token punctuation">.</span><span class="token function">Since</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token operator">*</span>time<span class="token punctuation">.</span>Second <span class="token punctuation">{</span>
        mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> alice<span class="token operator">+</span>bob <span class="token operator">!=</span> total <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;observed violation, alice = %v, bob = %v, sum = %v\\n&quot;</span><span class="token punctuation">,</span>alice<span class="token punctuation">,</span>bob<span class="token punctuation">,</span>alice<span class="token operator">+</span>bob<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子所要演示的内容是，递增和递减两个操作应该要以原子方式发生。而上面的例子是原子递增加原子递减。</p><p>这个例子希望对于锁的理解是可以保护一些不变性，而不是只作用于变量。例如这里alice+bob的总数值应该是20000。</p><p>在高层次上理解锁，在访问共享数据时，需要进行加锁。另一个重要的规则时，锁会保护一些&quot;不变量&quot;。</p><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    count <span class="token operator">:=</span> <span class="token number">0</span>
    finished <span class="token operator">:=</span> <span class="token number">0</span>

    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            vote <span class="token operator">:=</span> <span class="token function">requestVote</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> vote <span class="token punctuation">{</span>
                count<span class="token operator">++</span>
            <span class="token punctuation">}</span>
            finished<span class="token operator">++</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> count <span class="token operator">&lt;</span> <span class="token number">5</span> <span class="token operator">&amp;&amp;</span> finished <span class="token operator">!=</span> <span class="token number">10</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> count <span class="token operator">&gt;=</span> <span class="token number">5</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;received 5+ votes!&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;lost&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">requestVote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;time&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;math/rand&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    count <span class="token operator">:=</span> <span class="token number">0</span>
    finished <span class="token operator">:=</span> <span class="token number">0</span>
    <span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>Mutex

    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            vote <span class="token operator">:=</span> <span class="token function">requestVote</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">defer</span> mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> vote <span class="token punctuation">{</span>
                count<span class="token operator">++</span>
            <span class="token punctuation">}</span>
            finished<span class="token operator">++</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> count <span class="token operator">&gt;=</span> <span class="token number">5</span> <span class="token operator">&amp;&amp;</span> finished <span class="token operator">==</span> <span class="token number">10</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
        mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> count <span class="token operator">&gt;=</span> <span class="token number">5</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;received 5+ votes!&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;lost&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">requestVote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码的问题：</p><p>下面的代码会造成CPU 100%</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> count <span class="token operator">&gt;=</span> <span class="token number">5</span> <span class="token operator">&amp;&amp;</span> finished <span class="token operator">==</span> <span class="token number">10</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
        mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> count <span class="token operator">&gt;=</span> <span class="token number">5</span> <span class="token operator">&amp;&amp;</span> finished <span class="token operator">==</span> <span class="token number">10</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
        mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">50</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="条件变量" tabindex="-1"><a class="header-anchor" href="#条件变量" aria-hidden="true">#</a> 条件变量</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;sync&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;time&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;math/rand&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    count <span class="token operator">:=</span> <span class="token number">0</span>
    finished <span class="token operator">:=</span> <span class="token number">0</span>
    <span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>Mutex
    cond <span class="token operator">:=</span> sync<span class="token punctuation">.</span><span class="token function">NewCond</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mu<span class="token punctuation">)</span>

    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            vote <span class="token operator">:=</span> <span class="token function">requestVote</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">defer</span> mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> vote <span class="token punctuation">{</span>
                count<span class="token operator">++</span>
            <span class="token punctuation">}</span>
            finished<span class="token operator">++</span>
            cond<span class="token punctuation">.</span><span class="token function">Broadcast</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> count <span class="token operator">&lt;</span> <span class="token number">5</span> <span class="token operator">&amp;&amp;</span> finished <span class="token operator">!=</span> <span class="token number">10</span><span class="token punctuation">{</span>
        cond<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> count <span class="token operator">&gt;=</span> <span class="token number">5</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;received 5+ votes!&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;lost&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">requestVote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>条件变量使用的范式如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cond<span class="token punctuation">.</span><span class="token function">Broadcast</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token operator">--</span><span class="token operator">-</span>

mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
while condition <span class="token operator">==</span> <span class="token boolean">false</span> <span class="token punctuation">{</span>
    cond<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20);function m(b,f){const p=i("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[s("在该讲中，助教推荐阅读"),n("a",k,[s("concurrency in Go"),t(p)]),s("这本书。")]),r,n("p",null,[n("a",d,[s("在线运行"),t(p)])]),v])}const w=e(l,[["render",m],["__file","lesson5.html.vue"]]);export{w as default};
