import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},p=t(`<h1 id="gdb的使用" tabindex="-1"><a class="header-anchor" href="#gdb的使用" aria-hidden="true">#</a> gdb的使用</h1><p>gdb是c/c++程序的调试利器，在日常工作中，十分有利，本文就将总结其使用方法。</p><h2 id="gdb常用命令" tabindex="-1"><a class="header-anchor" href="#gdb常用命令" aria-hidden="true">#</a> gdb常用命令</h2><p>运行</p><table><thead><tr><th>命令名称</th><th>命令缩写</th><th>命令作用</th></tr></thead><tbody><tr><td>run</td><td>r</td><td>运行一个程序</td></tr><tr><td>continue</td><td>c</td><td>继续执行，到下一个断点处</td></tr><tr><td>next</td><td>n</td><td>单步调试，不进入函数体</td></tr><tr><td>step</td><td>s</td><td>单步调试，进入函数体</td></tr><tr><td>until</td><td></td><td>运行程序直到退出循环体</td></tr><tr><td>until + 行号</td><td></td><td>运行至某行</td></tr><tr><td>finish</td><td></td><td>运行程序，知道当前函数返回</td></tr><tr><td>call</td><td></td><td>调用程序中可见的函数并传递参数</td></tr><tr><td>quit</td><td>q</td><td>退出gdb</td></tr></tbody></table><p>断点</p><table><thead><tr><th>命令名称</th><th>命令缩写</th><th>命令作用</th></tr></thead><tbody><tr><td>break n(行号)</td><td>b n</td><td>在第n行出设置断点</td></tr><tr><td>delete n(断点号)</td><td>d n</td><td>删除第n个断点</td></tr><tr><td>disable n(断点号)</td><td></td><td>禁用第n个断点</td></tr><tr><td>enable n(断点号)</td><td></td><td>开启第n个断点</td></tr><tr><td>clear n(行号)</td><td></td><td>清除第n行的断点</td></tr><tr><td>info break</td><td>info b</td><td>显示当前程序的断点情况</td></tr><tr><td>delete breakpoints</td><td></td><td>清除所有断点</td></tr></tbody></table><p>查看源代码</p><table><thead><tr><th>命令名称</th><th>命令缩写</th><th>命令作用</th></tr></thead><tbody><tr><td>list</td><td>l</td><td>列出程序的原代码，默认每次显示10行</td></tr><tr><td>list n(行号)</td><td>l n</td><td>将显示当前文件以行号为中心的前后10行代码</td></tr><tr><td>list 函数名</td><td>l main</td><td>将显示函数名所在函数的源代码</td></tr></tbody></table><p>打印表达式</p><h2 id="gdb命令案例详解" tabindex="-1"><a class="header-anchor" href="#gdb命令案例详解" aria-hidden="true">#</a> gdb命令案例详解</h2><h3 id="run" tabindex="-1"><a class="header-anchor" href="#run" aria-hidden="true">#</a> run</h3><p>run命令用于启动一个程序，看下面的例子：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//main.cpp</span>
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
Missing separate debuginfos, use: dnf debuginfo-install glibc-2.34-60.el9.x86_64 libgcc-11.3.1-4.3.el9.x86_64 libstdc++-11.3.1-4.3.el9.x86_64
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,46),o=[p];function i(l,c){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","gdb_cmd.html.vue"]]);export{d as default};
