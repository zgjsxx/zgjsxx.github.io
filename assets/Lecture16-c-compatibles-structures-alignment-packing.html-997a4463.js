import{_ as e,V as i,W as d,X as n,Y as s,$ as t,a0 as c,F as l}from"./framework-9a29aaa0.js";const p={},o=c(`<ul><li><a href="#%E7%AC%AC%E5%8D%81%E5%85%AD%E8%AE%B2-%E7%BB%93%E6%9E%84%E4%BD%93%E5%92%8C%E7%BB%93%E6%9E%84%E4%BD%93%E5%AF%B9%E9%BD%90%E4%BF%A1%E5%8F%B7">第十六讲： 结构体和结构体对齐；信号</a><ul><li><a href="#%E6%B1%87%E7%BC%96%E8%AF%AD%E8%A8%80%E4%B8%AD%E7%9A%84%E7%BB%93%E6%9E%84%E4%BD%93">汇编语言中的结构体</a></li><li><a href="#%E4%BF%A1%E5%8F%B7%E5%A4%84%E7%90%86">信号处理</a><ul><li><a href="#%E4%BF%A1%E5%8F%B7">信号</a></li><li><a href="#%E6%8D%95%E6%8D%89%E4%BF%A1%E5%8F%B7">捕捉信号</a></li></ul></li><li><a href="#%E9%99%84%E5%BD%95">附录</a></li></ul></li></ul><h1 id="第十六讲-结构体和结构体对齐-信号" tabindex="-1"><a class="header-anchor" href="#第十六讲-结构体和结构体对齐-信号" aria-hidden="true">#</a> 第十六讲： 结构体和结构体对齐；信号</h1><p>C/C++结构体(<code>struct</code>)实际上只不过是按照一定的排列方式存储在内存中的多个数据。如果我们想要与使用结构体的C/C++程序进行交互，我们需要了解如何在汇编语言中构造出等效的内容。</p><p>一个简单的结构体的例子如下所示：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">struct</span> <span class="token class-name">thing</span> <span class="token punctuation">{</span> 
    <span class="token keyword">double</span> a<span class="token punctuation">;</span>  <span class="token comment">// 8 bytes</span>
    <span class="token keyword">char</span>   b<span class="token punctuation">;</span>  <span class="token comment">// 1 byte</span>
    <span class="token keyword">int</span>    c<span class="token punctuation">;</span>  <span class="token comment">// 4 bytes</span>
    <span class="token keyword">char</span><span class="token operator">*</span>  d<span class="token punctuation">;</span>  <span class="token comment">// 8 bytes    </span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们简单地将该结构中的每个元素占用大小相加，我们得到的总大小是21个字节。但是，如果编译此结构，然后 <code>cout &lt;&lt; sizeof(thing)</code> , 将打印出其大小为24字节。那么额外的3个字节是从哪里来的？</p><p>答案与结构体的布局有关，特别是结构体对齐和结构体打包。如果访问的地址是2的幂的倍数（通常为 32 或 64），CPU 可以更快地执行内存访问。为了使得内存的操作速度更快，结构体通常是对齐的，而不是紧密地排列在一起。这会导致使用一些额外的空间，以填充字节的形式添加到每个结构体中。</p><p>如果我们创建<code>thing</code>的一个实例，然后检查其成员的地址，我们可以推断出该结构的每个元素在这24个字节内的位置：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>thing x<span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">thing</span> <span class="token punctuation">{</span> 
    <span class="token keyword">double</span> a<span class="token punctuation">;</span>  <span class="token comment">// &amp;x.a == &amp;x</span>
    <span class="token keyword">char</span>   b<span class="token punctuation">;</span>  <span class="token comment">// &amp;x.b == &amp;x + 8</span>
    <span class="token keyword">int</span>    c<span class="token punctuation">;</span>  <span class="token comment">// &amp;x.c == &amp;x + 12</span>
    <span class="token keyword">char</span><span class="token operator">*</span>  d<span class="token punctuation">;</span>  <span class="token comment">// &amp;x.d == &amp;x + 16</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>首先，结构本身的地址只是其第一个成员的地址</li><li><code>b</code> 位于 <code>a</code> 之后 8 个字节</li><li><code>c</code> 不是位于 <code>b</code> 之后 1 个字节，而是位于 <code>b</code> 之后 4 个字节。<code>char b</code> 已扩展为 4 个字节（或者更确切地说，1 个字节后跟 3 个不可见的填充字节），以便将所有结构成员对齐到 4 字节的倍数。</li><li><code>d</code> 位于 <code>c</code> 之后 4 个字节，本身宽度为 8 个字节。</li></ul><p>在 C++ 中，这也适用，但仅适用于部分<code>struct</code>和<code>class</code>，即<code>POD</code>类型(纯数据类)。 <code>POD</code>类型有如下的特征：</p><ul><li>没有用户提供的默认构造函数（即使用编译器生成的默认构造函数)</li><li>没有用户提供的复制构造函数</li><li>没有用户提供的析构函数</li><li>仅具有公共数据成员（所有这些成员也必须是 POD）</li><li>没有引用类型数据成员</li><li>没有虚函数，也没有虚拟基类。</li></ul><p><code>POD</code>类型允许具有非虚的函数，也可以使用继承。 <code>POD</code>类型在 C++/C 之间完全兼容，并且在小心谨慎的情况下还可以与汇编完全兼容。</p><p>与往常一样，Sys V C ABI 定义了如何在内存中打包/对齐结构的元素。对齐规则实际上是根据数据类型指定的，并不特定于结构（即，内存中的每个 int 都应该对齐到 4 字节的倍数，而不仅仅是结构中的整数）。总结如下：</p><ul><li>将数据值与其大小的倍数（以字节为单位）对齐。在较小的数据成员之后添加填充字节，以便后续成员正确对齐。</li><li>整个结构在存储在内存中时，应与其任何成员的最大对齐方式对齐。例如，<code>thing</code>将与 64 位地址对齐（始终从其开始），因为它的最大成员是双精度型，这需要 64 位对齐。</li><li>整个结构应在末尾进行填充，使其大小是其对齐方式的倍数。 （如果你对齐正确，这就会自然发生。</li></ul><h2 id="汇编语言中的结构体" tabindex="-1"><a class="header-anchor" href="#汇编语言中的结构体" aria-hidden="true">#</a> 汇编语言中的结构体</h2><p>在汇编语言中，我们可以按照结构体在内存中的排列规则来构建一个结构体。例如，如果要在栈上构建一个结构体的实例，我们可以这样做:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>sub rsp, 24     ; 为实例对象创建空间
mov [rsp + 24], a
mov [rsp + 16], b
mov [rsp + 12], c
mov [rsp + 8],  d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该结构体的起始地址为<code>rsp + 24</code>。</p><p>这样构建结构体的实例显示很繁琐且容易出错。更好的选择是使用 <code>yasm</code> 的宏来构建结构体。</p><p>Yasm提供了<code>struc</code> 和 <code>endstruc</code>宏，使用这两个宏构建实例，我们可以这样做:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>struc thing
    a:      resq    1
    b:      resb    1
            resb    3 ; 3个填充字节
    c:      resd    1  
    d:      resq    1
endstruc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>res[b|w|d|q]</code> 指令分别保留一定数量的字节、字、双字或四字。</p><p>这通过 <code>equ</code> 隐式定义了六个常量：</p><ul><li>thing 被定义为 0，作为整个结构的地址相对于开头的偏移量。</li><li><code>a</code>被定义为0。</li><li><code>b</code> 定义为 8</li><li><code>c</code> 定义为 12</li><li><code>d</code> 定义为 16</li><li>thing结构的大小定义为 24</li></ul><p>需要注意的是这些是全局常量，这意味着名称 <code>a</code>、<code>thing</code> 等不能用于同一文件中其他任何位置的标签或其他常量。您可以使用本地标签 <code>.a</code>、<code>.b</code> 等作为成员名称来避免该问题。</p><p>我们还可以使用<code>alignb</code>来要求后续数据的特定对齐方式，而不是手动添加填充字节。 <code>alignb n</code> 将 0 字节添加到当前节，直到当前地址 $ 是 n 的倍数，因此我们将在元素之前添加alignb指令：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>struc thing
            alignb  8   ; Does nothing, already aligned
    a:      resq    1
            alignb  1   ; Does nothing, already aligned
    b:      resb    1
            alignb  4   ; Advance to multiple of 4
    c:      resd    1 
            alignb  8   ; Advance to multiple of 8 
    d:      resq    1
endstruc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个、第二个和第四个alignb根本不添加任何填充，因为成员d已经自然对齐到8的倍数。添加额外的alignb是安全的，因为除非需要，否则它们不会插入任何填充。</p><p>alignb 用 0 填充未使用的空间。</p><p>要实例化 <code>.data</code> 部分中的结构，请使用 <code>istruc</code>、<code>at</code> 和 <code>iend</code>：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>my_thing:   istruc thing
    at a,   dq      0.0     ; a = 0.0
    at b,   db      &#39;!&#39;     ; b = &#39;!&#39;
    at c,   dd      -12     ; c = -12
    at d,   dq      0       ; d = nullptr
iend
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>at</code> 宏前进到结构内的正确偏移量。 <code>istruc</code> 中的字段必须按照与原始结构中完全相同的顺序给出。</p><p>请注意，<code>istuc</code>/<code>iend</code> 只能用于在 <code>.data</code> 部分中声明实例，即作为全局变量。要在栈上创建实例，我们首先要保留正确的空间量：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>add rsp, thing_size
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后相对于 <code>rsp</code> 填充它:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov qword [rsp - thing_size + a], 0.0
mov byte  [rsp - thing_size + b], &#39;!&#39;
mov dword [rsp - thing_size + c], -12
mov qword [rsp - thing_size + d], 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>Stack offset</th><th>Member</th><th>Value</th></tr></thead><tbody><tr><td>rsp - 24</td><td>a</td><td>0.0</td></tr><tr><td>rsp - 16</td><td>b</td><td>&#39;!&#39;</td></tr><tr><td>(rsp - 15) to (rsp - 13)</td><td>padding bytes</td><td></td></tr><tr><td>rsp - 12</td><td>c</td><td></td></tr><tr><td>rsp - 8</td><td>d</td><td>0</td></tr><tr><td>rsp</td><td>top of stack</td><td></td></tr></tbody></table><h2 id="信号处理" tabindex="-1"><a class="header-anchor" href="#信号处理" aria-hidden="true">#</a> 信号处理</h2><p>如果我们在程序中除以0，那么程序会因为浮点异常而崩溃。为了避免这种情况，我们需要在程序中安装信号处理函数，以捕获除零错误产生的<code>sigfpe</code>信号。我们需要使用<code>sigaction</code>函数。</p><p>尝试从 <code>sigfpe</code> 恢复通常非常危险。</p><h3 id="信号" tabindex="-1"><a class="header-anchor" href="#信号" aria-hidden="true">#</a> 信号</h3><p>信号是基于Unix的操作系统与其上运行的进程进行通信的方式之一。信号可以分为那些可以被我们的进程捕获的信号和那些不可捕获的信号。</p><table><thead><tr><th>信号</th><th>是否可以捕获</th><th>默认的行为</th></tr></thead><tbody><tr><td>SIGINT(ctrl+C)</td><td>是</td><td>终止进程</td></tr><tr><td>SIGKILL</td><td>否</td><td>终止进程</td></tr><tr><td>SIGTERM</td><td>是</td><td>终止进程</td></tr><tr><td>SIGSGEV</td><td>是</td><td>终止进程</td></tr><tr><td>SIGFPE(除0)</td><td>是</td><td>终止进程</td></tr><tr><td>SIGHUP</td><td>是</td><td>终止进程</td></tr><tr><td>SIGWINCH</td><td>是</td><td>不做任何事情</td></tr></tbody></table><p>信号异步地发送到一个进程，这意味着，信号处理程序可以在任何地方触发。</p><p>信号处理程序的典型行为是设置一些全局变量，然后返回。如果是一些致命信号，唯一真正的选择是清理然后退出。</p><h3 id="捕捉信号" tabindex="-1"><a class="header-anchor" href="#捕捉信号" aria-hidden="true">#</a> 捕捉信号</h3><p>要捕获信号，我们可以使用以下两种机制之一：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;signal.h&gt;</span></span>

<span class="token keyword">int</span> window_resized <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">my_handler</span><span class="token punctuation">(</span><span class="token keyword">int</span> sig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    window_resized <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">signal</span><span class="token punctuation">(</span>SIGWINCH<span class="token punctuation">,</span> my_handler<span class="token punctuation">)</span> <span class="token operator">==</span> SIG_ERR<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// Handler could not be attached</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Wait for window resizes</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">if</span><span class="token punctuation">(</span>window_resized<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Window resized!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            window_resized <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>信号函数有两个参数：一个信号常量和一个指向处理函数的指针。每个处理函数都应该具有原型 <code>void handler(int sig)</code>，其中参数将是捕获的信号的序号。</p><p>信号函数的行为未完全指定，特别是在处理程序执行时捕获到信号时。因此，首选第二种方法，它使用 <code>sigaction</code> 结构和函数：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;signal.h&gt;</span></span>

<span class="token keyword">int</span> window_resized <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">my_handler</span><span class="token punctuation">(</span><span class="token keyword">int</span> sig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    window_resized <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">sigaction</span> act<span class="token punctuation">;</span>
    act<span class="token punctuation">.</span>sa_handler <span class="token operator">=</span> my_handler<span class="token punctuation">;</span>    <span class="token comment">// Handler function</span>
    <span class="token function">sigemptyset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>act<span class="token punctuation">.</span>sa_mask<span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// Signals to block while running handler</span>
    act<span class="token punctuation">.</span>sa_flags <span class="token operator">=</span> SA_RESTART<span class="token punctuation">;</span>      <span class="token comment">// Flags</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">sigaction</span><span class="token punctuation">(</span>SIGWINCH<span class="token punctuation">,</span> <span class="token operator">&amp;</span>act<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// Could not register handler</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Wait for window resizes</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">if</span><span class="token punctuation">(</span>window_resized<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Window resized!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            window_resized <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>signal.h</code> 中定义的 <code>sigaction</code> 结构如下所示：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">sigaction</span>
<span class="token punctuation">{</span>
    <span class="token class-name">handler_t</span> sa_handler<span class="token punctuation">;</span>           <span class="token comment">// Function pointer (8 bytes) </span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token keyword">int</span> sa_mask<span class="token punctuation">[</span><span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>  <span class="token comment">// Signal mask      (16*8 = 128 bytes)</span>
    <span class="token keyword">int</span> sa_flags<span class="token punctuation">;</span>                   <span class="token comment">// Flags            (4 bytes)</span>

    <span class="token comment">// ... Other members</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个结构的大小为 152 字节。</p><p>与此对应的装汇编语言的结构定义为：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>struc sigaction_t
    sa_handler:     resq 1
    sa_mask:        resq 16
    sa_flags:       resd 1
                    resb 12 ; Padding/other members
endstruc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>幸运的是，这里的结构体使用指针传递，因此我们不必考虑的结构体传递规则。我们可以分配该结构的全局实例并传递它的地址。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

SIGWINCH:       equ         28
SA_RESTART:     equ         268435456
msg:            db          &quot;Window resized!\\n&quot;, 0

window_resized: dq          0

action: istruc sigaction_t
    at sa_handler,  dq              my_handler
    at sa_mask,     times 16 dq     0
    at sa_flags,    dd              SA_RESTART
                    times 12 db     0 
iend
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>my_handler</code>必须是带有单个int参数的C兼容函数：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>my_handler:
    push rbp
    mov rbp, rsp

    mov qword [window_resized], 1

    pop rbp
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最复杂的部分是<code>main</code>，因为它必须设置信号处理程序，然后循环等待信号：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>extern sigaction
extern printf

main:
    push rbp
    mov rbp, rsp

    ; Install signal handler
    mov rdi, SIGWINCH
    mov rsi, action
    call sigaction

    cmp rax, 0
    je .continue

    ; Couldn&#39;t register handler, return 1
    mov rax, 1
    pop rbp
    ret

    ; Loop forever
.continue:

    cmp qword [window_resized], 1
    jne .continue

    mov rdi, msg
    call printf
    mov qword [window_resized], 0
    jmp .continue

    pop rbp
    mov rax, 0
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2>`,64),r={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-structures.html",target:"_blank",rel:"noopener noreferrer"};function u(v,m){const a=l("ExternalLinkIcon");return i(),d("div",null,[o,n("p",null,[s("原文连接："),n("a",r,[s("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-structures.html"),t(a)])])])}const k=e(p,[["render",u],["__file","Lecture16-c-compatibles-structures-alignment-packing.html.vue"]]);export{k as default};
