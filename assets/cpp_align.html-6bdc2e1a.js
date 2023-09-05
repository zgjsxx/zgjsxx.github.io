import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},o=t(`<h1 id="c-中的对齐问题" tabindex="-1"><a class="header-anchor" href="#c-中的对齐问题" aria-hidden="true">#</a> c++中的对齐问题</h1><h2 id="需要对齐的原因" tabindex="-1"><a class="header-anchor" href="#需要对齐的原因" aria-hidden="true">#</a> 需要对齐的原因</h2><p>尽管内存是以字节为单位，但是大部分处理器并不是按字节块来存取内存的.它一般会以双字节,四字节,8字节,16字节甚至32字节为单位来存取内存，我们将上述这些存取单位称为内存存取粒度.</p><p>现在考虑4字节存取粒度的处理器取int类型变量（32位系统），该处理器只能从地址为4的倍数的内存开始读取数据。</p><p>假如没有内存对齐机制，数据可以任意存放，现在一个int变量存放在从地址1开始的联系四个字节地址中，该处理器去取数据时，要先从0地址开始读取第一个4字节块,剔除不想要的字节（0地址）,然后从地址4开始读取下一个4字节块,同样剔除不要的数据（5，6，7地址）,最后留下的两块数据合并放入寄存器.这需要做很多工作.</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/cpp/cpp_align/bg1.png" alt="bg1" tabindex="0" loading="lazy"><figcaption>bg1</figcaption></figure><h2 id="对齐的规则" tabindex="-1"><a class="header-anchor" href="#对齐的规则" aria-hidden="true">#</a> 对齐的规则</h2><p><strong>有效对齐值</strong>：是 <code>#pragma pack(n)</code>和结构体中最长数据类型长度中较小的那个。有效对齐值也叫<strong>对齐单位</strong>。</p><p>注意： <code>#pragma pack(n)</code>中的n可以取(1 , 2 , 4 , 8 , 16)中的任意一值。</p><p>2）规则：</p><ul><li><p>结构体变量的首地址是有效对齐值（对齐单位）的整数倍。</p></li><li><p>结构体第一个成员的偏移量（offset）为0，以后每个成员相对于结构体首地址的 offset 都是该成员大小与有效对齐值中较小那个的整数倍，如有需要编译器会在成员之间加上填充字节。</p></li><li><p>结构体的总大小为有效对齐值的整数倍，如有需要编译器会在最末一个成员之后加上填充字节。</p></li><li><p>结构体内类型相同的连续元素将在连续的空间内，和数组一样。</p></li></ul><p>运用上面的规则，下面通过实际的例子进行计算。</p><p>例1：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">struct</span> <span class="token class-name">MyStruct</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> c<span class="token punctuation">;</span>
    <span class="token keyword">int</span> i<span class="token punctuation">;</span>
    <span class="token keyword">short</span> s<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MyStruct obj<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;start addr of obj = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>obj <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of c = &quot;</span>  <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>c<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of i = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>i<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of s = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>s<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;sizeof MyStruct = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>start of obj <span class="token operator">=</span> <span class="token number">0x7fff2e8d1e94</span>
offset of c <span class="token operator">=</span> <span class="token number">0</span>
offset of i <span class="token operator">=</span> <span class="token number">4</span>
offset of s <span class="token operator">=</span> <span class="token number">8</span>
<span class="token keyword">sizeof</span> MyStruct <span class="token operator">=</span> <span class="token number">12</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结构中最长的数据类型是int，长度也为4。因此结构体的有效对齐值是4。</p><p>对于c变量而言，没有悬念，将排在0偏移地址处。</p><p>对于变量i，类型为int，长度为4，int和有效对齐值的最小值为4，因此i需要排布在4的整数倍上，因此第一个符合要求的偏移量就是4。</p><p>对于变量s，类型为short，长度为2，short和有效对齐值二者中的最小值为2，第一个符合要求的地址为8。</p><p>到目前为止，使用的空间大小是10，而结构体大小需要满足有效对齐值的整数倍，因此需要2个填充，因此结构体最终大小是12。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/cpp/cpp_align/example1.png" alt="MyStruct分布" tabindex="0" loading="lazy"><figcaption>MyStruct分布</figcaption></figure><p>例2：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">pragma</span> <span class="token expression"><span class="token function">pack</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span></span></span>
<span class="token keyword">struct</span> <span class="token class-name">MyStruct</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> c<span class="token punctuation">;</span>
    <span class="token keyword">int</span> i<span class="token punctuation">;</span>
    <span class="token keyword">short</span> s<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MyStruct obj<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;start addr of obj = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>obj <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of c = &quot;</span>  <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>c<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of i = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>i<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of s = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>s<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;sizeof MyStruct = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>start addr of obj <span class="token operator">=</span> <span class="token number">0x7fff488e3418</span>
offset of c <span class="token operator">=</span> <span class="token number">0</span>
offset of i <span class="token operator">=</span> <span class="token number">2</span>
offset of s <span class="token operator">=</span> <span class="token number">6</span>
<span class="token keyword">sizeof</span> MyStruct <span class="token operator">=</span> <span class="token number">8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先<code>#pragma pack</code>设置的对齐值是2，结构中最长的数据类型是int，长度也为4。因此结构体的有效对齐值是2。</p><p>对于c变量而言，没有悬念，将排在0偏移地址处。</p><p>对于变量i，类型为int，长度为4，int和有效对齐值的最小值为2，因此i需要排布在2的整数倍上，因此第一个符合要求的偏移量就是2。</p><p>对于变量s，类型为short，长度为2，short和有效对齐值二者中的最小值为2，第一个符合要求的地址为6。</p><p>到目前为止，使用的空间大小是8，已经满足结构体大小是有效对齐值的整数倍的要求。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/cpp/cpp_align/example2.png" alt="MyStruct分布2" tabindex="0" loading="lazy"><figcaption>MyStruct分布2</figcaption></figure><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">pragma</span> <span class="token expression"><span class="token function">pack</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span></span>
<span class="token keyword">struct</span> <span class="token class-name">MyStruct</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> c<span class="token punctuation">;</span>
    <span class="token keyword">int</span> i<span class="token punctuation">;</span>
    <span class="token keyword">short</span> s<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MyStruct obj<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;start addr of obj = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>obj <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of c = &quot;</span>  <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>c<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of i = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>i<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of s = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>s<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;sizeof MyStruct = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>start addr of obj <span class="token operator">=</span> <span class="token number">0x7ffe96c067a9</span>
offset of c <span class="token operator">=</span> <span class="token number">0</span>
offset of i <span class="token operator">=</span> <span class="token number">1</span>
offset of s <span class="token operator">=</span> <span class="token number">5</span>
<span class="token keyword">sizeof</span> MyStruct <span class="token operator">=</span> <span class="token number">7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先<code>#pragma pack</code>设置的对齐值是1，结构中最长的数据类型是int，长度也为4。因此结构体的有效对齐值是1。</p><p>对于c变量而言，没有悬念，将排在0偏移地址处。</p><p>对于变量i，类型为int，长度为4，int和有效对齐值的最小值为，因此i需要排布在2的整数倍上，因此第一个符合要求的偏移量就是1。</p><p>对于变量s，类型为short，长度为2，short和有效对齐值二者中的最小值为2，第一个符合要求的地址为5。</p><p>到目前为止，使用的空间大小是7，已经满足结构体大小是有效对齐值的整数倍的要求。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/cpp/cpp_align/example3.png" alt="MyStruct分布3" tabindex="0" loading="lazy"><figcaption>MyStruct分布3</figcaption></figure><p>例4：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;emmintrin.h&gt;</span></span>

<span class="token keyword">struct</span> <span class="token class-name">MyStruct</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> c<span class="token punctuation">;</span>
    __m128i i<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MyStruct obj<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;start addr of obj = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>obj <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of c = &quot;</span>  <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>c<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of i = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>i<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;sizeof MyStruct = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>start addr of obj <span class="token operator">=</span> <span class="token number">0x7fff9d47cd90</span>
offset of c <span class="token operator">=</span> <span class="token number">0</span>
offset of i <span class="token operator">=</span> <span class="token number">16</span>
<span class="token keyword">sizeof</span> MyStruct <span class="token operator">=</span> <span class="token number">32</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，结构中最长的数据类型是__m128i，长度为16。因此结构体的有效对齐值是16。</p><p>对于c变量而言，没有悬念，将排在0偏移地址处。</p><p>对于变量i，类型为__m128i，长度为16，__m128i和有效对齐值的最小值为16，因此i需要排布在2的整数倍上，因此第一个符合要求的偏移量就是16。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/cpp/cpp_align/example4.png" alt="MyStruct分布4" tabindex="0" loading="lazy"><figcaption>MyStruct分布4</figcaption></figure><p>例5：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;emmintrin.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">pragma</span> <span class="token expression"><span class="token function">pack</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span></span></span>
<span class="token keyword">struct</span> <span class="token class-name">MyStruct</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> c<span class="token punctuation">;</span>
    __m128i i<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MyStruct obj<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;start addr of obj = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>obj <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of c = &quot;</span>  <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>c<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;offset of i = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">offsetof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">,</span>i<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;sizeof MyStruct = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>MyStruct<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>start addr of obj <span class="token operator">=</span> <span class="token number">0x7ffddbec2c40</span>
offset of c <span class="token operator">=</span> <span class="token number">0</span>
offset of i <span class="token operator">=</span> <span class="token number">8</span>
<span class="token keyword">sizeof</span> MyStruct <span class="token operator">=</span> <span class="token number">24</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先<code>#pragma pack</code>设置的对齐值是8，结构中最长的数据类型是__m128i，长度为16。因此结构体的有效对齐值是8。</p><p>对于c变量而言，没有悬念，将排在0偏移地址处。</p><p>对于变量i，类型为__m128i，长度为16，__m128i和有效对齐值的最小值为8，因此i需要排布在2的整数倍上，因此第一个符合要求的偏移量就是8。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/cpp/cpp_align/example5.png" alt="MyStruct分布5" tabindex="0" loading="lazy"><figcaption>MyStruct分布5</figcaption></figure>`,57),e=[o];function c(l,i){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","cpp_align.html.vue"]]);export{r as default};