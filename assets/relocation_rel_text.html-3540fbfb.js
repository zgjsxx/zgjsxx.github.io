import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const l={},i=e(`<h1 id="elf文件函数重定位" tabindex="-1"><a class="header-anchor" href="#elf文件函数重定位" aria-hidden="true">#</a> ELF文件函数重定位</h1><h2 id="文件准备" tabindex="-1"><a class="header-anchor" href="#文件准备" aria-hidden="true">#</a> 文件准备</h2><p>代码结构如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.
├── main.c
├── foo.c
├── makefile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main.c的内容如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">extern</span> <span class="token keyword">void</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>foo.c</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;foo\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>makefile内容如下：</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">all</span><span class="token punctuation">:</span> main

<span class="token target symbol">main</span><span class="token punctuation">:</span> main.o foo.o
        <span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -m32 -o <span class="token variable">$@</span> <span class="token variable">$^</span>

<span class="token target symbol">main.o</span><span class="token punctuation">:</span> main.c
        <span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -m32 -c -o <span class="token variable">$@</span> <span class="token variable">$&lt;</span>

<span class="token target symbol">foo.o</span><span class="token punctuation">:</span> foo.c
        <span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> -m32 -c -o <span class="token variable">$@</span> <span class="token variable">$&lt;</span>

<span class="token target symbol">clean</span><span class="token punctuation">:</span>
        rm -f main main.o x.o

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用make进行编译。</p><p>这个时候我们使用<code>objdump -d main.o</code>查看obj1.o中的内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>00000000 <span class="token operator">&lt;</span>main<span class="token operator">&gt;</span>:
   <span class="token number">0</span>:   <span class="token number">55</span>                      push   %ebp
   <span class="token number">1</span>:   <span class="token number">89</span> e5                   mov    %esp,%ebp
   <span class="token number">3</span>:   <span class="token number">83</span> e4 f0                and    <span class="token variable">$0xfffffff0</span>,%esp
   <span class="token number">6</span>:   e8 fc ff ff ff          call   <span class="token number">7</span> <span class="token operator">&lt;</span>main+0x<span class="token operator"><span class="token file-descriptor important">7</span>&gt;</span>
   b:   b8 00 00 00 00          mov    <span class="token variable">$0x0</span>,%eax
  <span class="token number">10</span>:   c9                      leave
  <span class="token number">11</span>:   c3                      ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意下面这一行，这行其实就是去调用foo的地址，然而这个时候foo地址还不知道。e8就是call指令，foo是外部函数，无法得知foo的地址，所以使用了0xfffffffc这个假地址做代替，等连接时确定foo函数的地址后，再替换这个假地址。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>   <span class="token number">6</span>:   e8 fc ff ff ff          call   <span class="token number">7</span> <span class="token operator">&lt;</span>main+0x<span class="token operator"><span class="token file-descriptor important">7</span>&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个时候我们使用<code>readelf -r main.o</code>去查看相关信息， 我门可以知道， foo函数所在位置00000007需要进行重定位。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Relocation section <span class="token string">&#39;.rel.text&#39;</span> at offset 0x160 contains <span class="token number">1</span> entry:
 Offset     Info    Type            Sym.Value  Sym. Name
00000007  00000902 R_386_PC32        00000000   foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>.rel.text对应的数据结构如下所示：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">elf32_rel</span> <span class="token punctuation">{</span>
  Elf32_Addr	r_offset<span class="token punctuation">;</span>
  Elf32_Word	r_info<span class="token punctuation">;</span>
<span class="token punctuation">}</span> Elf32_Rel<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>r_offset，重定位入口的偏移，对于.o来说，是需要修正的位置的第一个字节相对于段起始的偏移；对于.so和可执行程序来说，是需要修正的位置的第一个字节的虚拟地址。</p><p>r_info，重定位入口的类型和符号，前三个字节是该入口的符号在符号表中的下标；后一个字节，表示重定位的类型，比如R_386_32、R_386_PC32。</p><p>这个时候我们使用<code>objdump -d main</code>查看main的内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>080484ad <span class="token operator">&lt;</span>main<span class="token operator">&gt;</span>:
 80484ad:       <span class="token number">55</span>                      push   %ebp
 80484ae:       <span class="token number">89</span> e5                   mov    %esp,%ebp
 80484b0:       <span class="token number">83</span> e4 f0                and    <span class="token variable">$0xfffffff0</span>,%esp
 80484b3:       e8 07 00 00 00          call   80484bf <span class="token operator">&lt;</span>foo<span class="token operator">&gt;</span>
 80484b8:       b8 00 00 00 00          mov    <span class="token variable">$0x0</span>,%eax
 80484bd:       c9                      leave
 80484be:       c3                      ret

080484bf <span class="token operator">&lt;</span>foo<span class="token operator">&gt;</span>:
 80484bf:       <span class="token number">55</span>                      push   %ebp
 80484c0:       <span class="token number">89</span> e5                   mov    %esp,%ebp
 80484c2:       <span class="token number">83</span> ec 08                sub    <span class="token variable">$0x8</span>,%esp
 80484c5:       <span class="token number">83</span> ec 0c                sub    <span class="token variable">$0xc</span>,%esp
 80484c8:       <span class="token number">68</span> 6c <span class="token number">85</span> 04 08          push   <span class="token variable">$0x804856c</span>
 80484cd:       e8 7e fe ff ff          call   <span class="token number">8048350</span> <span class="token operator">&lt;</span>puts@plt<span class="token operator">&gt;</span>
 80484d2:       <span class="token number">83</span> c4 <span class="token number">10</span>                <span class="token function">add</span>    <span class="token variable">$0x10</span>,%esp
 80484d5:       <span class="token number">90</span>                      nop
 80484d6:       c9                      leave
 80484d7:       c3                      ret
 80484d8:       <span class="token number">66</span> <span class="token number">90</span>                   xchg   %ax,%ax
 80484da:       <span class="token number">66</span> <span class="token number">90</span>                   xchg   %ax,%ax
 80484dc:       <span class="token number">66</span> <span class="token number">90</span>                   xchg   %ax,%ax
 80484de:       <span class="token number">66</span> <span class="token number">90</span>                   xchg   %ax,%ax

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出，原本在main.o中无法定位的地址，现在已经有了明确的地址了：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> 80484b3:       e8 07 00 00 00          call   80484bf <span class="token operator">&lt;</span>foo<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>按照R_386_PC32的计算公式，其表示相对寻址修正S+A-P。</p><p>S = foo的地址，这里是080484bf</p><p>A = 保存在被修正位置的值。被修正位置为0x00000007，这个位置的值是0xfffffffc，所以A为0xfffffffc，即A为-4。</p><p>P = 被修正的位置，（相对于段开始的位置或者虚拟地址），可以通过r_offset计算得到。这里是080484ad + 7 = 80484b4</p><p>080484bf - 4 - 80484b4 = 07</p><p>这个计算结果和 我们上面通过objdump的结果是一致的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>80484b3:       e8 07 00 00 00          call   80484bf <span class="token operator">&lt;</span>foo<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,32),p=[i];function c(o,t){return s(),a("div",null,p)}const r=n(l,[["render",c],["__file","relocation_rel_text.html.vue"]]);export{r as default};
