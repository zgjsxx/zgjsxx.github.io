import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const i={},p=e(`<h1 id="c-中的extern-c" tabindex="-1"><a class="header-anchor" href="#c-中的extern-c" aria-hidden="true">#</a> c++中的extern &quot;C&quot;</h1><p>在一些c语言的library库中，我们经常可以还看下面这样的结构</p><div class="language-h line-numbers-mode" data-ext="h"><pre class="language-h"><code>#ifndef __TEST_H
#define __TEST_H

#ifdef _cplusplus
extern &quot;C&quot; {
#endif

/*...*/

#ifdef _cplusplus
}
#endif
#endif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>#ifndef __TEST_H</code>这样的宏定义应该是非常常见了，其作用是为了避免重复包含。</p><p>往下看,如果定义了_cplusplus宏，则添加<code>extern &quot;C&quot;</code>的标记，那么这个标记的作用是什么呢？</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">_cplusplus</span></span>
<span class="token keyword">extern</span> <span class="token string">&quot;C&quot;</span> <span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里首先给出答案，这是为了c/c++程序可以相互调用。下面就看看<code>extern &quot;C&quot;</code>是如何做到的。我们分两个场景，第一个场景就是c语言写的库，c和c++程序去调用。第二个场景就是c++写的库，c和c++程序去调用。</p><h2 id="c写的库给c-c-调用" tabindex="-1"><a class="header-anchor" href="#c写的库给c-c-调用" aria-hidden="true">#</a> c写的库给c/c++调用</h2><p>我们看第一个例子，在这个例子中，我们使用c语言构建了一个add函数，并提供了其头文件。我们要将该实现提供给c和c++的程序调用。</p><p>下面是该例子的目录结构。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── add.c
├── add.h
├── main_c.c
├── main_cpp.cpp
└── makefile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>add.h</p><div class="language-h line-numbers-mode" data-ext="h"><pre class="language-h"><code>#ifndef C_EXAMPLE_H
#define C_EXAMPLE_H

#ifdef __cplusplus
extern &quot;C&quot;{
#endif

extern int add(int x,int y);

#ifdef __cplusplus
}
#endif

#endif

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>add.c</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;add.h&quot;</span></span>
<span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span> <span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main_cpp.cpp</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;add.h&quot;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main_c.c</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;add.h&quot;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>makefile</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">all</span><span class="token punctuation">:</span>main_cpp main_c

<span class="token target symbol">main_cpp</span><span class="token punctuation">:</span> main_cpp.o add.o
        <span class="token variable">$</span><span class="token punctuation">(</span>CXX<span class="token punctuation">)</span>  -o <span class="token variable">$@</span> <span class="token variable">$^</span>

<span class="token target symbol">main_c</span><span class="token punctuation">:</span> main_c.o add.o
        <span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -o <span class="token variable">$@</span> <span class="token variable">$^</span>

<span class="token target symbol">main.o</span><span class="token punctuation">:</span> main_cpp.cpp
        <span class="token variable">$</span><span class="token punctuation">(</span>CXX<span class="token punctuation">)</span> -c -o <span class="token variable">$@</span> <span class="token variable">$&lt;</span>

<span class="token target symbol">add.o</span><span class="token punctuation">:</span> add.c
        <span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span>  -c -o <span class="token variable">$@</span> <span class="token variable">$&lt;</span>

<span class="token target symbol">clean</span><span class="token punctuation">:</span>
        rm -f *.o main_cpp main_c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code>make</code>命令对上述模块进行构建。如果没有任何错误，那么恭喜你，add.o成功的被c和c++程序使用了。</p><p>我们知道c和c++编译器编译出来的符号名称是不同的，用c++的方式去寻找c语言的符号是无法寻找到的。<code>extern &quot;C&quot;</code>为何可以做到？</p><p>我们使用<code>readelf -s add.o</code>查看add.o的符号，可以看到add函数的名称就是add，这个就是典型c编译器编译出来的名字。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Symbol table <span class="token string">&#39;.symtab&#39;</span> contains <span class="token number">9</span> entries:
   Num:    Value          Size Type    Bind   Vis      Ndx Name
     <span class="token number">0</span>: 0000000000000000     <span class="token number">0</span> NOTYPE  LOCAL  DEFAULT  UND
     <span class="token number">1</span>: 0000000000000000     <span class="token number">0</span> FILE    LOCAL  DEFAULT  ABS add.c
     <span class="token number">2</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">1</span>
     <span class="token number">3</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">2</span>
     <span class="token number">4</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">3</span>
     <span class="token number">5</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">5</span>
     <span class="token number">6</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">6</span>
     <span class="token number">7</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">4</span>
     <span class="token number">8</span>: 0000000000000000    <span class="token number">20</span> FUNC    GLOBAL DEFAULT    <span class="token number">1</span> <span class="token function">add</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再次查看<code>readelf -s main_cpp.o | grep add</code>去查看一下main_cpp中的符号表:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>   <span class="token number">72</span><span class="token operator">:</span> <span class="token number">0000000000000000</span>     <span class="token number">0</span> FILE    LOCAL  DEFAULT  ABS add<span class="token punctuation">.</span>c
   <span class="token number">90</span><span class="token operator">:</span> <span class="token number">0000000000400570</span>    <span class="token number">20</span> FUNC    GLOBAL DEFAULT   <span class="token number">11</span> add
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到main_cpp中的符号表的名字也是add，因此main_cpp成功的找到了add函数。</p><p>但是我们知道c++的编译器在生成符号时，通常都会带上符号的参数类型（因为c++支持重载），例如下面的c++程序，编译之后，我们使用readelf查看符号表。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span> <span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其输出的结果如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">86</span>: 0000000000400556    <span class="token number">20</span> FUNC    GLOBAL DEFAULT   <span class="token number">11</span> _Z3addii
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到add生成符号是_Z3addii。</p><p>看到这里，聪明的你已经大概知道<code>extern &quot;C&quot;</code>的作用了，就是修改了符号表的生成方式，将c++符号的生成方式换成了c的生成方式。</p><p>c库中生成的符号是c编译器的符号， 因此c语言可以直接链接。而c++程序需要使用<code>extern &quot;C&quot;</code>让编译器使用c的符号命名方式去进行链接，这样才能找到对应的符号。</p><h2 id="c-写的库给c-c-调用" tabindex="-1"><a class="header-anchor" href="#c-写的库给c-c-调用" aria-hidden="true">#</a> c++写的库给c/c++调用</h2><p>下面这个例子，我们使用c++语言构建了一个add函数，并提供了其头文件。我们要将该实现提供给c和c++的程序调用。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── add.cpp
├── add.h
├── main_c.c
├── main_cpp.cpp
└── makefile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>add.h</p><div class="language-h line-numbers-mode" data-ext="h"><pre class="language-h"><code>#ifndef C_EXAMPLE_H
#define C_EXAMPLE_H

#ifdef __cplusplus
extern &quot;C&quot;{
#endif

extern int add(int x,int y);

#ifdef __cplusplus
}
#endif

#endif

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>add.cpp</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;add.h&quot;</span></span>
<span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span> <span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main_cpp.cpp</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;add.h&quot;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main_c.c</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;add.h&quot;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>makefile</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">all</span><span class="token punctuation">:</span>main_cpp main_c

<span class="token target symbol">main_cpp</span><span class="token punctuation">:</span> main_cpp.o add.o
        <span class="token variable">$</span><span class="token punctuation">(</span>CXX<span class="token punctuation">)</span>  -o <span class="token variable">$@</span> <span class="token variable">$^</span>

<span class="token target symbol">main_c</span><span class="token punctuation">:</span> main_c.o add.o
        <span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -o <span class="token variable">$@</span> <span class="token variable">$^</span>

<span class="token target symbol">main.o</span><span class="token punctuation">:</span> main_cpp.cpp
        <span class="token variable">$</span><span class="token punctuation">(</span>CXX<span class="token punctuation">)</span> -c -o <span class="token variable">$@</span> <span class="token variable">$&lt;</span>

<span class="token target symbol">add.o</span><span class="token punctuation">:</span> add.cpp
        <span class="token variable">$</span><span class="token punctuation">(</span>CXX<span class="token punctuation">)</span>  -c -o <span class="token variable">$@</span> <span class="token variable">$&lt;</span>

<span class="token target symbol">clean</span><span class="token punctuation">:</span>
        rm -f *.o main_cpp main_c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实这种场景和第一种场景是基本一致的。现在我们的库add.o是使用c++编译器生成的。</p><p>我们使用readelf查看其内容，可以看到其内容和之前c语言生成的库，add函数的符号是一样的。因此我们此时编译时使用了<code>extern &quot;C&quot;</code>,也就是说使用c语言的符号构建方式进行编译。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Symbol table <span class="token string">&#39;.symtab&#39;</span> contains <span class="token number">9</span> entries:
   Num:    Value          Size Type    Bind   Vis      Ndx Name
     <span class="token number">0</span>: 0000000000000000     <span class="token number">0</span> NOTYPE  LOCAL  DEFAULT  UND
     <span class="token number">1</span>: 0000000000000000     <span class="token number">0</span> FILE    LOCAL  DEFAULT  ABS add.c
     <span class="token number">2</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">1</span>
     <span class="token number">3</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">2</span>
     <span class="token number">4</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">3</span>
     <span class="token number">5</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">5</span>
     <span class="token number">6</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">6</span>
     <span class="token number">7</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">4</span>
     <span class="token number">8</span>: 0000000000000000    <span class="token number">20</span> FUNC    GLOBAL DEFAULT    <span class="token number">1</span> <span class="token function">add</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来链接的过程就和第一个场景一样了。</p><p>在本场景中，使用c++编写了一个包含add函数的模块，对其编译时，使用了c语言的符号构建方式。因此其符号表和c语言的库是相同的。最终链接时，由于加上了<code>extern &quot;C&quot;</code>， 链接过程也将使用c语言的方式去寻找符号。</p>`,53),c=[p];function l(d,t){return s(),a("div",null,c)}const u=n(i,[["render",l],["__file","cpp_externC.html.vue"]]);export{u as default};
