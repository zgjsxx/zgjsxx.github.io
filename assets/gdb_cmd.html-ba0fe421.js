import{_ as a,V as t,W as p,X as n,Y as e,$ as o,a0 as i,F as l}from"./framework-9a29aaa0.js";const c={},u=i(`<h1 id="gdb的基础命令使用" tabindex="-1"><a class="header-anchor" href="#gdb的基础命令使用" aria-hidden="true">#</a> gdb的基础命令使用</h1><p>gdb是c/c++程序的调试利器，在日常工作中，十分有利，本文就将总结其基础命令的使用。</p><ul><li><a href="#gdb%E7%9A%84%E5%9F%BA%E7%A1%80%E5%91%BD%E4%BB%A4%E4%BD%BF%E7%94%A8">gdb的基础命令使用</a><ul><li><a href="#gdb%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4">gdb常用命令</a></li><li><a href="#gdb%E5%91%BD%E4%BB%A4%E6%A1%88%E4%BE%8B%E8%AF%A6%E8%A7%A3">gdb命令案例详解</a><ul><li><a href="#run">run</a></li><li><a href="#continue">continue</a></li><li><a href="#next">next</a></li><li><a href="#step">step</a></li><li><a href="#until">until</a></li><li><a href="#finish">finish</a></li><li><a href="#call">call</a></li><li><a href="#break">break</a></li><li><a href="#watch">watch</a></li><li><a href="#print">print</a></li><li><a href="#backtrace">backtrace</a></li><li><a href="#info">info</a></li></ul></li></ul></li></ul><h2 id="gdb常用命令" tabindex="-1"><a class="header-anchor" href="#gdb常用命令" aria-hidden="true">#</a> gdb常用命令</h2><p>运行</p><table><thead><tr><th>命令名称</th><th>命令缩写</th><th>命令作用</th></tr></thead><tbody><tr><td>run</td><td>r</td><td>运行一个程序</td></tr><tr><td>continue</td><td>c</td><td>继续执行，到下一个断点处</td></tr><tr><td>next</td><td>n</td><td>单步调试，不进入函数体</td></tr><tr><td>step</td><td>s</td><td>单步调试，进入函数体</td></tr><tr><td>until</td><td></td><td>运行程序直到退出循环体</td></tr><tr><td>until + 行号</td><td></td><td>运行至某行</td></tr><tr><td>finish</td><td></td><td>运行程序，知道当前函数返回</td></tr><tr><td>call</td><td></td><td>调用程序中可见的函数并传递参数</td></tr><tr><td>quit</td><td>q</td><td>退出gdb</td></tr></tbody></table><p>断点</p><table><thead><tr><th>命令名称</th><th>命令缩写</th><th>命令作用</th></tr></thead><tbody><tr><td>break n(行号)</td><td>b n</td><td>在第n行出设置断点</td></tr><tr><td>delete n(断点号)</td><td>d n</td><td>删除第n个断点</td></tr><tr><td>disable n(断点号)</td><td></td><td>禁用第n个断点</td></tr><tr><td>enable n(断点号)</td><td></td><td>开启第n个断点</td></tr><tr><td>clear n(行号)</td><td></td><td>清除第n行的断点</td></tr><tr><td>info break</td><td>info b</td><td>显示当前程序的断点情况</td></tr><tr><td>delete breakpoints</td><td></td><td>清除所有断点</td></tr></tbody></table><p>查看源代码</p><table><thead><tr><th>命令名称</th><th>命令缩写</th><th>命令作用</th></tr></thead><tbody><tr><td>list</td><td>l</td><td>列出程序的原代码，默认每次显示10行</td></tr><tr><td>list n(行号)</td><td>l n</td><td>将显示当前文件以行号为中心的前后10行代码</td></tr><tr><td>list 函数名</td><td>l main</td><td>将显示函数名所在函数的源代码</td></tr></tbody></table><p>打印表达式</p><table><thead><tr><th>命令名称</th><th>命令缩写</th><th>命令作用</th></tr></thead><tbody><tr><td>print var</td><td>p</td><td>打印变量</td></tr><tr><td>watch var</td><td></td><td>设置一个监控点，一旦被监视的表达式的值改变了</td></tr><tr><td>info locals</td><td></td><td>查看当前堆栈页的所有变量</td></tr><tr><td>info function</td><td></td><td>查询函数</td></tr></tbody></table><p>查询运行信息</p><table><thead><tr><th>命令名称</th><th>命令缩写</th><th>命令作用</th></tr></thead><tbody><tr><td>where/bt</td><td></td><td>当前运行的堆栈列表；</td></tr><tr><td>bt backtrace</td><td></td><td>显示当前调用堆栈</td></tr><tr><td>up/down</td><td></td><td>改变堆栈显示的深度</td></tr><tr><td>set args</td><td></td><td>参数:指定运行时的参数</td></tr><tr><td>show args</td><td></td><td>查看设置好的参数</td></tr><tr><td>info program</td><td></td><td>来查看程序的是否在运行，进程号，被暂停的原因。</td></tr></tbody></table><h2 id="gdb命令案例详解" tabindex="-1"><a class="header-anchor" href="#gdb命令案例详解" aria-hidden="true">#</a> gdb命令案例详解</h2><h3 id="run" tabindex="-1"><a class="header-anchor" href="#run" aria-hidden="true">#</a> run</h3><p>run命令用于启动一个程序，看下面的例子：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//main.cpp</span>
<span class="token comment">//g++ main.cpp -g</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> sum <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，我们使用run命令运行该程序，由于没有任何断点，程序一直运行到了结束。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> run
Starting program: /home/work/cpp_proj/test1/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>
i <span class="token operator">=</span> <span class="token number">0</span>
i <span class="token operator">=</span> <span class="token number">1</span>
i <span class="token operator">=</span> <span class="token number">2</span>
i <span class="token operator">=</span> <span class="token number">3</span>
i <span class="token operator">=</span> <span class="token number">4</span>
i <span class="token operator">=</span> <span class="token number">5</span>
i <span class="token operator">=</span> <span class="token number">6</span>
i <span class="token operator">=</span> <span class="token number">7</span>
i <span class="token operator">=</span> <span class="token number">8</span>
i <span class="token operator">=</span> <span class="token number">9</span>
<span class="token number">45</span>
<span class="token punctuation">[</span>Inferior <span class="token number">1</span> <span class="token punctuation">(</span>process <span class="token number">25956</span><span class="token punctuation">)</span> exited normally<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="continue" tabindex="-1"><a class="header-anchor" href="#continue" aria-hidden="true">#</a> continue</h3><p>continue用于继续执行，直到下一个断点处。需要和break结合使用。看下面的例子：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//main.cpp</span>
<span class="token comment">//g++ main.cpp -g</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> sum <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，我们在main.cpp的第5行和第7行下了断点，使用run命令启动程序后将在第一处断点暂停，使用continue命令将使程序继续执行，在第二处断点处暂停。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:5
Breakpoint <span class="token number">1</span> at 0x40118e: <span class="token function">file</span> demo.cpp, line <span class="token number">5</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:7
Breakpoint <span class="token number">2</span> at 0x40119e: <span class="token function">file</span> demo.cpp, line <span class="token number">7</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test1/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Breakpoint <span class="token number">1</span>, func <span class="token punctuation">(</span><span class="token punctuation">)</span> at demo.cpp:5
warning: Source <span class="token function">file</span> is <span class="token function">more</span> recent than executable.
<span class="token number">5</span>           int <span class="token function">sum</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
Missing separate debuginfos, use: dnf debuginfo-install glibc-2.34-60.el9.x86_64 libgcc-11.3.1-4.3.el9.x86_64 libstdc++-11.3.1-4.3.el9.x86_64
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> <span class="token builtin class-name">continue</span>
Continuing.

Breakpoint <span class="token number">2</span>, func <span class="token punctuation">(</span><span class="token punctuation">)</span> at demo.cpp:7
<span class="token number">7</span>               std::cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std::endl<span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="next" tabindex="-1"><a class="header-anchor" href="#next" aria-hidden="true">#</a> next</h3><p>next命令用于单步调试，对于用户定义的函数，next不会进入函数中执行，看下面这个例子：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
    <span class="token keyword">return</span> c<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;c = &quot;</span> <span class="token operator">&lt;&lt;</span> c <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，在main函数第12行下了断点,接着使用next指令一直单步执行，当执行到add函数时，直接返回了结果，并不会进入函数体。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:10
Breakpoint <span class="token number">1</span> at 0x401204: <span class="token function">file</span> main.cpp, line <span class="token number">10</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test1/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Breakpoint <span class="token number">1</span>, main <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:10
<span class="token number">12</span>          int a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> next
<span class="token number">13</span>          int b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> next
<span class="token number">14</span>          int c <span class="token operator">=</span> add<span class="token punctuation">(</span><span class="token number">1</span>, b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> next
<span class="token number">15</span>          std::cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;c = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token string">c<span class="token bash punctuation"> <span class="token operator">&lt;&lt;</span> std::endl<span class="token punctuation">;</span></span>
(gdb) next
c</span> <span class="token operator">=</span> <span class="token number">3</span>
<span class="token number">16</span>      <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step" tabindex="-1"><a class="header-anchor" href="#step" aria-hidden="true">#</a> step</h3><p>next命令也用于单步调试，对于用户定义的函数，next会进入函数中执行，这一点和next是不同的，平时使用时根据需求进行选择。看下面这个例子：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
    <span class="token keyword">return</span> c<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;c = &quot;</span> <span class="token operator">&lt;&lt;</span> c <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，在main函数第10行下了断点,接着使用step指令一直单步执行，当执行到add函数时，进入了add函数的函数体内单步执行。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># gdb a.out  -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:10
Breakpoint <span class="token number">1</span> at 0x4011a8: <span class="token function">file</span> main.cpp, line <span class="token number">10</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test1/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Breakpoint <span class="token number">1</span>, main <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:10
<span class="token number">10</span>          int a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
Missing separate debuginfos, use: dnf debuginfo-install glibc-2.34-60.el9.x86_64 libgcc-11.3.1-4.3.el9.x86_64 libstdc++-11.3.1-4.3.el9.x86_64
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> step
<span class="token number">11</span>          int b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> step
<span class="token number">12</span>          int c <span class="token operator">=</span> add<span class="token punctuation">(</span><span class="token number">1</span>, b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> step
<span class="token function">add</span> <span class="token punctuation">(</span>a<span class="token operator">=</span><span class="token number">1</span>, <span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span> at main.cpp:5
<span class="token number">5</span>           int c <span class="token operator">=</span> a + b<span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> step
<span class="token number">6</span>           <span class="token builtin class-name">return</span> c<span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> step
<span class="token number">7</span>       <span class="token punctuation">}</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> step
main <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:13
<span class="token number">13</span>          std::cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;c = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token string">c<span class="token bash punctuation"> <span class="token operator">&lt;&lt;</span> std::endl<span class="token punctuation">;</span></span>
(gdb) step
c</span> <span class="token operator">=</span> <span class="token number">3</span>
<span class="token number">14</span>      <span class="token punctuation">}</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> step
0x00007ffff783feb0 <span class="token keyword">in</span> __libc_start_call_main <span class="token punctuation">(</span><span class="token punctuation">)</span> from /lib64/libc.so.6
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> step
Single stepping <span class="token keyword">until</span> <span class="token builtin class-name">exit</span> from <span class="token keyword">function</span> __libc_start_call_main,
<span class="token function">which</span> has no line number information.
<span class="token punctuation">[</span>Inferior <span class="token number">1</span> <span class="token punctuation">(</span>process <span class="token number">34464</span><span class="token punctuation">)</span> exited normally<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="until" tabindex="-1"><a class="header-anchor" href="#until" aria-hidden="true">#</a> until</h3><p>until可以用于跳出循环，或者执行到某一行。</p><ul><li>until用于跳出循环</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> sum <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，我们在循环之前下了断点，然后使用next单步进入了循环体，随后使用until跳出了循环。（我这边测试，如果已进入循环就until并不能跳出循环，到第二轮循环时使用until可以跳出循环）。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:5
Breakpoint <span class="token number">1</span> at 0x40118e: <span class="token function">file</span> main.cpp, line <span class="token number">5</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test1/a.out
n<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Breakpoint <span class="token number">1</span>, func <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:5
<span class="token number">5</span>           int <span class="token function">sum</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
<span class="token number">6</span>           for<span class="token punctuation">(</span>int i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> ++i<span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
<span class="token number">7</span>               std::cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token string">i<span class="token bash punctuation"> <span class="token operator">&lt;&lt;</span> std::endl<span class="token punctuation">;</span></span>
(gdb) n
i</span> <span class="token operator">=</span> <span class="token number">0</span>
<span class="token number">8</span>               <span class="token function">sum</span> <span class="token operator">+=</span> i<span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
<span class="token number">6</span>           for<span class="token punctuation">(</span>int i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> ++i<span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> <span class="token keyword">until</span>
i <span class="token operator">=</span> <span class="token number">1</span>
i <span class="token operator">=</span> <span class="token number">2</span>
i <span class="token operator">=</span> <span class="token number">3</span>
i <span class="token operator">=</span> <span class="token number">4</span>
i <span class="token operator">=</span> <span class="token number">5</span>
i <span class="token operator">=</span> <span class="token number">6</span>
i <span class="token operator">=</span> <span class="token number">7</span>
i <span class="token operator">=</span> <span class="token number">8</span>
i <span class="token operator">=</span> <span class="token number">9</span>
<span class="token number">11</span>          std::cout <span class="token operator">&lt;&lt;</span> <span class="token function">sum</span> <span class="token operator">&lt;&lt;</span> std::endl<span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>until用于执行到某一行</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> sum <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，我使用了until + 行号的方法，使得程序直接运行到了我所指定的地点。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:5
Breakpoint <span class="token number">1</span> at 0x40118e: <span class="token function">file</span> main.cpp, line <span class="token number">5</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test1/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Breakpoint <span class="token number">1</span>, func <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:5
<span class="token number">5</span>           int <span class="token function">sum</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
<span class="token number">6</span>           for<span class="token punctuation">(</span>int i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> ++i<span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
<span class="token number">7</span>               std::cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token string">i<span class="token bash punctuation"> <span class="token operator">&lt;&lt;</span> std::endl<span class="token punctuation">;</span></span>
(gdb) until main.cpp:11
i</span> <span class="token operator">=</span> <span class="token number">0</span>
i <span class="token operator">=</span> <span class="token number">1</span>
i <span class="token operator">=</span> <span class="token number">2</span>
i <span class="token operator">=</span> <span class="token number">3</span>
i <span class="token operator">=</span> <span class="token number">4</span>
i <span class="token operator">=</span> <span class="token number">5</span>
i <span class="token operator">=</span> <span class="token number">6</span>
i <span class="token operator">=</span> <span class="token number">7</span>
i <span class="token operator">=</span> <span class="token number">8</span>
i <span class="token operator">=</span> <span class="token number">9</span>
func <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:11
<span class="token number">11</span>          std::cout <span class="token operator">&lt;&lt;</span> <span class="token function">sum</span> <span class="token operator">&lt;&lt;</span> std::endl<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="finish" tabindex="-1"><a class="header-anchor" href="#finish" aria-hidden="true">#</a> finish</h3><p>finish命令的作用是将当前的函数执行完毕，返回上一层调用。有时我们不小心使用了step进入了函数内部，却发现不关心该函数内部的过程，就可以使用finish将该函数执行完毕。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> sum <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;finish&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，我在main.cp的第5行下了断点，该断点位于func函数中，这个时候我想跳出func函数，于是就使用了finish结束该函数。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:5
Breakpoint <span class="token number">1</span> at 0x40118e: <span class="token function">file</span> main.cpp, line <span class="token number">5</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test1/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Breakpoint <span class="token number">1</span>, func <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:5
<span class="token number">5</span>           int <span class="token function">sum</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> finish
Run till <span class="token builtin class-name">exit</span> from <span class="token comment">#0  func () at main.cpp:5</span>
i <span class="token operator">=</span> <span class="token number">0</span>
i <span class="token operator">=</span> <span class="token number">1</span>
i <span class="token operator">=</span> <span class="token number">2</span>
i <span class="token operator">=</span> <span class="token number">3</span>
i <span class="token operator">=</span> <span class="token number">4</span>
i <span class="token operator">=</span> <span class="token number">5</span>
i <span class="token operator">=</span> <span class="token number">6</span>
i <span class="token operator">=</span> <span class="token number">7</span>
i <span class="token operator">=</span> <span class="token number">8</span>
i <span class="token operator">=</span> <span class="token number">9</span>
<span class="token number">45</span>
main <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:18
<span class="token number">18</span>          std::cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;finish&quot;<span class="token bash punctuation"> <span class="token operator">&lt;&lt;</span> std::endl<span class="token punctuation">;</span></span>
(gdb) next
finish</span>
<span class="token number">19</span>      <span class="token punctuation">}</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> next
0x00007ffff783feb0 <span class="token keyword">in</span> __libc_start_call_main <span class="token punctuation">(</span><span class="token punctuation">)</span> from /lib64/libc.so.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="call" tabindex="-1"><a class="header-anchor" href="#call" aria-hidden="true">#</a> call</h3><p>call命令可以使得我们在程序运行时去调用某一个方法。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
    <span class="token keyword">return</span> c<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;c = &quot;</span> <span class="token operator">&lt;&lt;</span> c <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，我们在main函数下了一个断点，接着使用call命令调用了方法，并打印出了返回值。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:11
Breakpoint <span class="token number">1</span> at 0x4011af: <span class="token function">file</span> main.cpp, line <span class="token number">11</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test1/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Breakpoint <span class="token number">1</span>, main <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:11
<span class="token number">11</span>          int b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> call add<span class="token punctuation">(</span><span class="token number">1,2</span><span class="token punctuation">)</span>
<span class="token variable">$1</span> <span class="token operator">=</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="break" tabindex="-1"><a class="header-anchor" href="#break" aria-hidden="true">#</a> break</h3><p>break用于设置一个断点</p><p>普通断点的设置在上面已经提到过，这里看看其他的用法</p><ul><li>条件断点</li></ul><p>条件断点在条件成立的时候才会触发</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> sum <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;finish&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，在循环体内设置了条件断点，只有当i=5的时候，断点才会生效。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:7 <span class="token keyword">if</span> i <span class="token operator">=</span> <span class="token number">5</span>
Breakpoint <span class="token number">1</span> at 0x40119e: <span class="token function">file</span> main.cpp, line <span class="token number">7</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info b
Num     Type           Disp Enb Address            What
<span class="token number">1</span>       breakpoint     keep y   0x000000000040119e <span class="token keyword">in</span> func<span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:7
        stop only <span class="token keyword">if</span> i <span class="token operator">=</span> <span class="token number">5</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test1/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Breakpoint <span class="token number">1</span>, func <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:7
<span class="token number">7</span>               std::cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std::endl<span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> p i
<span class="token variable">$1</span> <span class="token operator">=</span> <span class="token number">5</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>临时断点</li></ul><p>在使用gdb时，如果想让断点只生效一次，可以使用tbreak命令(缩写为tb)。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> sum <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;finish&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试中，在循环的内部使用tb创建了一个断点，当使用continue命令时，不再会停止在该断点处。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> tb main.cpp:7
Temporary breakpoint <span class="token number">1</span> at 0x40119e: <span class="token function">file</span> main.cpp, line <span class="token number">7</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info <span class="token builtin class-name">break</span>
Num     Type           Disp Enb Address            What
<span class="token number">1</span>       breakpoint     del  y   0x000000000040119e <span class="token keyword">in</span> func<span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:7
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test1/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Temporary breakpoint <span class="token number">1</span>, func <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:7
<span class="token number">7</span>               std::cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token string">i<span class="token bash punctuation"> <span class="token operator">&lt;&lt;</span> std::endl<span class="token punctuation">;</span></span>
Missing separate debuginfos, use: dnf debuginfo-install glibc-2.34-60.el9.x86_64 libgcc-11.3.1-4.3.el9.x86_64 libstdc++-11.3.1-4.3.el9.x86_64
(gdb) c
Continuing.
i</span> <span class="token operator">=</span> <span class="token number">0</span>
i <span class="token operator">=</span> <span class="token number">1</span>
i <span class="token operator">=</span> <span class="token number">2</span>
i <span class="token operator">=</span> <span class="token number">3</span>
i <span class="token operator">=</span> <span class="token number">4</span>
i <span class="token operator">=</span> <span class="token number">5</span>
i <span class="token operator">=</span> <span class="token number">6</span>
i <span class="token operator">=</span> <span class="token number">7</span>
i <span class="token operator">=</span> <span class="token number">8</span>
i <span class="token operator">=</span> <span class="token number">9</span>
<span class="token number">45</span>
finish
<span class="token punctuation">[</span>Inferior <span class="token number">1</span> <span class="token punctuation">(</span>process <span class="token number">81491</span><span class="token punctuation">)</span> exited normally<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>保存断点</li></ul><p>使用save breakpoints和source命令可以导出和导入断点数据。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> sum <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;finish&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，我首先在main.cpp中设置了三个断点，随后将三个断点导出到了文件中。接着删除所有的断点，然后再通过save导入之前所有的断点。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># gdb a.out  -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:4
Breakpoint <span class="token number">1</span> at 0x40118e: <span class="token function">file</span> main.cpp, line <span class="token number">5</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:5
Note: breakpoint <span class="token number">1</span> also <span class="token builtin class-name">set</span> at pc 0x40118e.
Breakpoint <span class="token number">2</span> at 0x40118e: <span class="token function">file</span> main.cpp, line <span class="token number">5</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:6
Breakpoint <span class="token number">3</span> at 0x401195: <span class="token function">file</span> main.cpp, line <span class="token number">6</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info b
Num     Type           Disp Enb Address            What
<span class="token number">1</span>       breakpoint     keep y   0x000000000040118e <span class="token keyword">in</span> func<span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:5
<span class="token number">2</span>       breakpoint     keep y   0x000000000040118e <span class="token keyword">in</span> func<span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:5
<span class="token number">3</span>       breakpoint     keep y   0x0000000000401195 <span class="token keyword">in</span> func<span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:6
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> save b main.brk
Saved to <span class="token function">file</span> <span class="token string">&#39;main.brk&#39;</span><span class="token builtin class-name">.</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> delete breakpoints
Delete all breakpoints? <span class="token punctuation">(</span>y or n<span class="token punctuation">)</span> y
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info <span class="token builtin class-name">break</span>
No breakpoints or watchpoints.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> <span class="token builtin class-name">source</span> main.brk
Breakpoint <span class="token number">4</span> at 0x40118e: <span class="token function">file</span> main.cpp, line <span class="token number">5</span>.
Breakpoint <span class="token number">5</span> at 0x40118e: <span class="token function">file</span> main.cpp, line <span class="token number">5</span>.
Breakpoint <span class="token number">6</span> at 0x401195: <span class="token function">file</span> main.cpp, line <span class="token number">6</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info <span class="token builtin class-name">break</span>
Num     Type           Disp Enb Address            What
<span class="token number">4</span>       breakpoint     keep y   0x000000000040118e <span class="token keyword">in</span> func<span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:5
<span class="token number">5</span>       breakpoint     keep y   0x000000000040118e <span class="token keyword">in</span> func<span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:5
<span class="token number">6</span>       breakpoint     keep y   0x0000000000401195 <span class="token keyword">in</span> func<span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> watch</h3><p>watch命令用于监控一个变量，通过前后值的变化判断程序是否存在bug。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> sum <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;finish&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，我在func函数上下了一个断点。随后监控sum变量的变化。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span># gdb a<span class="token punctuation">.</span>out <span class="token operator">-</span>q
Reading symbols from a<span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b func
Breakpoint <span class="token number">1</span> at <span class="token number">0x40118e</span><span class="token operator">:</span> file main<span class="token punctuation">.</span>cpp<span class="token punctuation">,</span> line <span class="token number">5.</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program<span class="token operator">:</span> <span class="token operator">/</span>home<span class="token operator">/</span>work<span class="token operator">/</span>cpp_proj<span class="token operator">/</span>test<span class="token operator">/</span>a<span class="token punctuation">.</span>out
<span class="token punctuation">[</span>Thread debugging <span class="token keyword">using</span> libthread_db enabled<span class="token punctuation">]</span>
Using host libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token punctuation">.</span>

Breakpoint <span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">func</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> at main<span class="token punctuation">.</span>cpp<span class="token operator">:</span><span class="token number">5</span>
warning<span class="token operator">:</span> Source file is more recent than executable<span class="token punctuation">.</span>
<span class="token number">5</span>           <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
<span class="token number">6</span>           <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info locals
i <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">135593542</span>
sum <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> watch sum
Hardware watchpoint <span class="token number">2</span><span class="token operator">:</span> <span class="token function">sum</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info watch
Num     Type           Disp Enb Address            What
<span class="token number">2</span>       hw watchpoint  keep y                      <span class="token function">sum</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
<span class="token number">7</span>               std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
i <span class="token operator">=</span> <span class="token number">0</span>
<span class="token number">8</span>               sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
<span class="token number">6</span>           <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
<span class="token number">7</span>               std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;i = &quot;</span> <span class="token operator">&lt;&lt;</span> i <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
i <span class="token operator">=</span> <span class="token number">1</span>
<span class="token number">8</span>               sum <span class="token operator">+=</span> i<span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n

Hardware watchpoint <span class="token number">2</span><span class="token operator">:</span> sum

Old value <span class="token operator">=</span> <span class="token number">0</span>
New value <span class="token operator">=</span> <span class="token number">1</span>
<span class="token function">func</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> at main<span class="token punctuation">.</span>cpp<span class="token operator">:</span><span class="token number">6</span>
<span class="token number">6</span>           <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="print" tabindex="-1"><a class="header-anchor" href="#print" aria-hidden="true">#</a> print</h3><p>print用于打印程序中变量的值。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的例子中，我使用了print命令分别以十六进制，十进制，八进制和二进制打印了变量的值。</p><p>p/x: 十六进制</p><p>p/d: 十进制</p><p>p/o: 八进制</p><p>p/t: 二进制</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:5
Breakpoint <span class="token number">1</span> at 0x40114a: <span class="token function">file</span> main.cpp, line <span class="token number">5</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Breakpoint <span class="token number">1</span>, main <span class="token punctuation">(</span><span class="token punctuation">)</span> at main.cpp:5
<span class="token number">5</span>           int a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
Missing separate debuginfos, use: dnf debuginfo-install glibc-2.34-28.el9_0.2.x86_64 libgcc-11.2.1-9.4.el9.x86_64 libstdc++-11.2.1-9.4.el9.x86_64
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> n
<span class="token number">6</span>           <span class="token builtin class-name">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> p a
<span class="token variable">$1</span> <span class="token operator">=</span> <span class="token number">20</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> p/x a
<span class="token variable">$2</span> <span class="token operator">=</span> 0x14
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> p/d a
<span class="token variable">$3</span> <span class="token operator">=</span> <span class="token number">20</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> p/o a
<span class="token variable">$4</span> <span class="token operator">=</span> 024
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> p/t a
<span class="token variable">$5</span> <span class="token operator">=</span> <span class="token number">10100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="backtrace" tabindex="-1"><a class="header-anchor" href="#backtrace" aria-hidden="true">#</a> backtrace</h3><p>backtrace用于查看函数堆栈，通常和up/down/frame等命令配合使用。</p><p>其中bt full可以打印完整的堆栈。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> b<span class="token operator">*</span>a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">int</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> b<span class="token operator">*</span><span class="token function">func1</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">func3</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> b<span class="token operator">*</span><span class="token function">func2</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token function">func3</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，我们在最底层的调用函数func1中设置了断点，然后使用了bt命令查看了函数堆栈。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b main.cpp:5
Breakpoint <span class="token number">1</span> at 0x40114d: <span class="token function">file</span> main.cpp, line <span class="token number">5</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Breakpoint <span class="token number">1</span>, func1 <span class="token punctuation">(</span>a<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">)</span> at main.cpp:5
<span class="token number">5</span>           int b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
Missing separate debuginfos, use: dnf debuginfo-install glibc-2.34-28.el9_0.2.x86_64 libgcc-11.2.1-9.4.el9.x86_64 libstdc++-11.2.1-9.4.el9.x86_64
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> bt
<span class="token comment">#0  func1 (a=20) at main.cpp:5</span>
<span class="token comment">#1  0x0000000000401179 in func2 (a=20) at main.cpp:13</span>
<span class="token comment">#2  0x000000000040119b in func3 (a=20) at main.cpp:19</span>
<span class="token comment">#3  0x00000000004011ba in main () at main.cpp:24</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> bt full
<span class="token comment">#0  func1 (a=20) at main.cpp:5</span>
        b <span class="token operator">=</span> <span class="token number">32767</span>
<span class="token comment">#1  0x0000000000401179 in func2 (a=20) at main.cpp:13</span>
        b <span class="token operator">=</span> <span class="token number">2</span>
<span class="token comment">#2  0x000000000040119b in func3 (a=20) at main.cpp:19</span>
        b <span class="token operator">=</span> <span class="token number">3</span>
<span class="token comment">#3  0x00000000004011ba in main () at main.cpp:24</span>
        a <span class="token operator">=</span> <span class="token number">20</span>
        c <span class="token operator">=</span> <span class="token parameter variable">-134517304</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用up/down/frame切换堆栈</li></ul><p>例子和上面一样，这里还是贴一下。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> b<span class="token operator">*</span>a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">int</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> b<span class="token operator">*</span><span class="token function">func1</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">func3</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> b<span class="token operator">*</span><span class="token function">func2</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token function">func3</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，我使用了up命令向上切换函数栈，使用down向上切换函数栈，使用frame选择函数栈。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span><span class="token comment"># gdb a.out -q</span>
Reading symbols from a.out<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b func1
Breakpoint <span class="token number">1</span> at 0x40114d: <span class="token function">file</span> main.cpp, line <span class="token number">5</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/cpp_proj/test/a.out
<span class="token punctuation">[</span>Thread debugging using libthread_db enabled<span class="token punctuation">]</span>
Using <span class="token function">host</span> libthread_db library <span class="token string">&quot;/lib64/libthread_db.so.1&quot;</span><span class="token builtin class-name">.</span>

Breakpoint <span class="token number">1</span>, func1 <span class="token punctuation">(</span>a<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">)</span> at main.cpp:5
<span class="token number">5</span>           int b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
Missing separate debuginfos, use: dnf debuginfo-install glibc-2.34-28.el9_0.2.x86_64 libgcc-11.2.1-9.4.el9.x86_64 libstdc++-11.2.1-9.4.el9.x86_64
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> bt
<span class="token comment">#0  func1 (a=20) at main.cpp:5</span>
<span class="token comment">#1  0x0000000000401179 in func2 (a=20) at main.cpp:13</span>
<span class="token comment">#2  0x000000000040119b in func3 (a=20) at main.cpp:19</span>
<span class="token comment">#3  0x00000000004011ba in main () at main.cpp:24</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> frame
<span class="token comment">#0  func1 (a=20) at main.cpp:5</span>
<span class="token number">5</span>           int b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> up <span class="token number">1</span>
<span class="token comment">#1  0x0000000000401179 in func2 (a=20) at main.cpp:13</span>
<span class="token number">13</span>          <span class="token builtin class-name">return</span> b*func1<span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> up <span class="token number">1</span>
<span class="token comment">#2  0x000000000040119b in func3 (a=20) at main.cpp:19</span>
<span class="token number">19</span>          <span class="token builtin class-name">return</span> b*func2<span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> down <span class="token number">1</span>
<span class="token comment">#1  0x0000000000401179 in func2 (a=20) at main.cpp:13</span>
<span class="token number">13</span>          <span class="token builtin class-name">return</span> b*func1<span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> down <span class="token number">1</span>
<span class="token comment">#0  func1 (a=20) at main.cpp:5</span>
<span class="token number">5</span>           int b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> frame <span class="token number">2</span>
<span class="token comment">#2  0x000000000040119b in func3 (a=20) at main.cpp:19</span>
<span class="token number">19</span>          <span class="token builtin class-name">return</span> b*func2<span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="info" tabindex="-1"><a class="header-anchor" href="#info" aria-hidden="true">#</a> info</h3><p>info命令用于查看一些信息 常用的有</p><table><thead><tr><th>命令</th><th>含义</th></tr></thead><tbody><tr><td>info break</td><td>查看所有的断点</td></tr><tr><td>info args</td><td>查看程序启动参数</td></tr><tr><td>info locals</td><td>查看当前栈上的变量</td></tr><tr><td>info watchpoints</td><td>查看观察点</td></tr><tr><td>info register</td><td>查看寄存器</td></tr></tbody></table><ul><li>info break</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> b<span class="token operator">*</span>a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">int</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> b<span class="token operator">*</span><span class="token function">func1</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">func3</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> b<span class="token operator">*</span><span class="token function">func2</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token function">func3</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下面的调试过程中，我下了三个断点，使用info b查看了这三个断点</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token punctuation">[</span>root@localhost test<span class="token punctuation">]</span># gdb a<span class="token punctuation">.</span>out <span class="token operator">-</span>q
Reading symbols from a<span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b func1
Breakpoint <span class="token number">1</span> at <span class="token number">0x40114d</span><span class="token operator">:</span> file main<span class="token punctuation">.</span>cpp<span class="token punctuation">,</span> line <span class="token number">5.</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b func2
Breakpoint <span class="token number">2</span> at <span class="token number">0x401168</span><span class="token operator">:</span> file main<span class="token punctuation">.</span>cpp<span class="token punctuation">,</span> line <span class="token number">12.</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b func3
Breakpoint <span class="token number">3</span> at <span class="token number">0x40118a</span><span class="token operator">:</span> file main<span class="token punctuation">.</span>cpp<span class="token punctuation">,</span> line <span class="token number">18.</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info b
Num     Type           Disp Enb Address            What
<span class="token number">1</span>       breakpoint     keep y   <span class="token number">0x000000000040114d</span> in <span class="token function">func1</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> at main<span class="token punctuation">.</span>cpp<span class="token operator">:</span><span class="token number">5</span>
<span class="token number">2</span>       breakpoint     keep y   <span class="token number">0x0000000000401168</span> in <span class="token function">func2</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> at main<span class="token punctuation">.</span>cpp<span class="token operator">:</span><span class="token number">12</span>
<span class="token number">3</span>       breakpoint     keep y   <span class="token number">0x000000000040118a</span> in <span class="token function">func3</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> at main<span class="token punctuation">.</span>cpp<span class="token operator">:</span><span class="token number">18</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考文献</p>`,106),d={href:"https://github.com/hellogcc/100-gdb-tips/blob/master/src/index.md",target:"_blank",rel:"noopener noreferrer"};function r(k,b){const s=l("ExternalLinkIcon");return t(),p("div",null,[u,n("p",null,[n("a",d,[e("https://github.com/hellogcc/100-gdb-tips/blob/master/src/index.md"),o(s)])])])}const m=a(c,[["render",r],["__file","gdb_cmd.html.vue"]]);export{m as default};
