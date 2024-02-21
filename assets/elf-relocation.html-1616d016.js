import{_ as d,V as l,W as i,X as n,Y as s,$ as e,a0 as a,F as c}from"./framework-9a29aaa0.js";const o={},r=a(`<h1 id="链接-重定位" tabindex="-1"><a class="header-anchor" href="#链接-重定位" aria-hidden="true">#</a> 链接 - 重定位</h1><p>重定位的元素(Entries)的定义如下所示，英文中使用entries来表示表中的一行记录。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Elf32_Addr   r_offset<span class="token punctuation">;</span>
    ELF32_Word   r_info<span class="token punctuation">;</span>
<span class="token punctuation">}</span> Elf32_Rel<span class="token punctuation">;</span>

<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Elf32_Addr   r_offset<span class="token punctuation">;</span>
    ELF32_Word   r_info<span class="token punctuation">;</span>
    Elf32_Sword  r_addend<span class="token punctuation">;</span>
<span class="token punctuation">}</span> Elf32_Rela<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个成员的含义如下：</p><ul><li>r_offset：给出了需要进行重定位的元素的位置。</li><li>r_info：</li><li>r_addend: 给出了一个数字，用于计算重定位后的位置是加上该数字</li></ul><table><thead><tr><th>名称</th><th>值</th><th>域</th><th>计算方式</th></tr></thead><tbody><tr><td>R_386_NONE</td><td>0</td><td>none</td><td>none</td></tr></tbody></table><p>R_386_GOT32: 该重定位类型计算符号的全局偏移表的条目到全局偏移表(GOT)的其实位置的距离。它会提示链接器构建全局偏移表(GOT)。个人理解这里指的就是动态链接的全局变量的重定位。</p><p>R_386_PLT32: 该重定位类型计算了符号的过程链接表(PLT)条目的地址，它指示链接器构建过程链接表(PLT)。个人理解这里指的就是动态链接的函数的重定位。</p><p>R_386_COPY：</p>`,9),p={href:"https://gitlab.com/x86-psABIs/x86-64-ABI/-/jobs/artifacts/master/raw/x86-64-ABI/abi.pdf?job=build",target:"_blank",rel:"noopener noreferrer"},u=a(`<p>A： 代表用于计算relocation 位置的加数 L： 代表PLT表中条目的位置 P： 代表被重定位的元素的位置(使用r_offset进行计算)</p><table><thead><tr><th>Name</th><th>Value</th><th>Field</th><th>Calculation</th></tr></thead><tbody><tr><td>R_X86_64_NONE</td><td>0</td><td>none</td><td>none</td></tr><tr><td>R_X86_64_64</td><td>1</td><td>word64</td><td>S + A</td></tr><tr><td>R_X86_64_PC32</td><td>2</td><td>word32</td><td>S + A -P</td></tr><tr><td>R_X86_64_PLT32</td><td>4</td><td>word32</td><td>L + A - P</td></tr><tr><td>R_X86_64_32</td><td>10</td><td>word32</td><td>S + A</td></tr><tr><td>R_X86_64_16</td><td>12</td><td>word16</td><td>S + A</td></tr><tr><td>R_X86_64_PC16</td><td>13</td><td>word32</td><td>S + A -P</td></tr><tr><td>R_X86_64_8</td><td>14</td><td>word8</td><td>S + A</td></tr><tr><td>R_X86_64_PC8</td><td>15</td><td>word8</td><td>S + A -P</td></tr><tr><td>R_X86_64_PC64</td><td>24</td><td>word64</td><td>S + A -P</td></tr><tr><td>R_X86_64_GOTPCRELX</td><td>41</td><td>word32</td><td>G + GOT + A -P</td></tr><tr><td>R_X86_64_REX_GOTPCRELX</td><td>42</td><td>word32</td><td>G + GOT + A -P</td></tr><tr><td>R_X86_64_CODE_4_GOTPCRELX</td><td>43</td><td>word32</td><td>G + GOT + A -P</td></tr><tr><td>R_X86_64_CODE_5_GOTPCRELX</td><td>46</td><td>word32</td><td>G + GOT + A -P</td></tr><tr><td>R_X86_64_CODE_6_GOTPCRELX</td><td>49</td><td>word32</td><td>G + GOT + A -P</td></tr></tbody></table><p>R_X86_64_* 系列代表使用绝对位置进行地址修正。 R_X86_64_PC* 系列用于表示依照相对于PC指针的偏移进行地址修正。 R_X86_64_PLT32 代表使用PLT表中元素的位置进行地址修正。</p><p>R_X86_64_GOTPCRELX* 系列相对复杂，这里首先需要了解x86-64的RIP-relative寻址。</p><p>x86-64的rip相对数据寻址之前系统不支持数据的相对寻址,不能像指令寻址的方式一样,获取变量i= 1只需要一个偏移量然后赋值就可以了,获取数据地址需要call拿到指令地址，再加上偏移地址来获得变量的地址代码举例</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token keyword">static</span> <span class="token keyword">int</span> i<span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
     i<span class="token operator">=</span><span class="token number">110</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着进行编译：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gcc <span class="token parameter variable">-fPIC</span> <span class="token parameter variable">-shared</span> <span class="token parameter variable">-m32</span> hello.c  <span class="token parameter variable">-o</span>  test32.so
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>反汇编可以看出,先call 3e6 &lt;__i686.get_pc_thunk.cx&gt;,再添加偏移量,最后再加上0x1c然后将110给这个地址(变量i)</p><div class="language-s line-numbers-mode" data-ext="s"><pre class="language-s"><code>000003cc &lt;test&gt;:
 3cc:	55                   	push   %ebp
 3cd:	89 e5                	mov    %esp,%ebp
 3cf:	e8 12 00 00 00       	call   3e6 &lt;__i686.get_pc_thunk.cx&gt;//获取pc地址
 3d4:	81 c1 58 11 00 00    	add    $0x1158,%ecx //添加偏移量
 3da:	c7 81 1c 00 00 00 6e 	movl   $0x6e,0x1c(%ecx)//在加0x1c偏移量,最后拿到1这个值
 3e1:	00 00 00 
 3e4:	5d                   	pop    %ebp
 3e5:	c3                   	ret    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),v={href:"http://test64.so",target:"_blank",rel:"noopener noreferrer"},_=a(`<div class="language-s line-numbers-mode" data-ext="s"><pre class="language-s"><code>000000000000052c &lt;test&gt;:
 52c:	55                   	push   %rbp
 52d:	48 89 e5             	mov    %rsp,%rbp
 530:	c7 05 9e 02 20 00 6e 	movl   $0x6e,0x20029e(%rip)        # 2007d8 &lt;i&gt;
 537:	00 00 00 
 53a:	c9                   	leaveq 
 53b:	c3                   	retq   
 53c:	90                   	nop
 53d:	90                   	nop
 53e:	90                   	nop
 53f:	90                   	nop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),m={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-instruction-format.html",target:"_blank",rel:"noopener noreferrer"},b=a(`<p>R_X86_64_GOTPCRELX：汇编指令在重定位的偏移量之前的2个字节处。 R_X86_64_REX_GOTPCRELX：汇编指令在重定位的偏移量之前的3个字节处。 R_X86_64_CODE_4_GOTPCRELX：汇编指令在重定位的偏移量之前的4个字节处。 R_X86_64_CODE_5_GOTPCRELX：汇编指令在重定位的偏移量之前的5个字节处。 R_X86_64_CODE_6_GOTPCRELX：汇编指令在重定位的偏移量之前的6个字节处。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># cat test.cpp</span>
<span class="token comment">#include&lt;stdio.h&gt;</span>
extern int i<span class="token punctuation">;</span>
void <span class="token function-name function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
     i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># g++ -c -fPIC test.cpp</span>
<span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># objdump -d test.o</span>

test.o:     <span class="token function">file</span> <span class="token function">format</span> elf64-x86-64


Disassembly of section .text:

0000000000000000 <span class="token operator">&lt;</span>_Z4testv<span class="token operator">&gt;</span>:
   <span class="token number">0</span>:   <span class="token number">55</span>                      push   %rbp
   <span class="token number">1</span>:   <span class="token number">48</span> <span class="token number">89</span> e5                mov    %rsp,%rbp
   <span class="token number">4</span>:   <span class="token number">48</span> 8b 05 00 00 00 00    mov    0x0<span class="token punctuation">(</span>%rip<span class="token punctuation">)</span>,%rax        <span class="token comment"># b &lt;_Z4testv+0xb&gt;</span>
   b:   c7 00 02 00 00 00       movl   <span class="token variable">$0x2</span>,<span class="token punctuation">(</span>%rax<span class="token punctuation">)</span>
  <span class="token number">11</span>:   <span class="token number">90</span>                      nop
  <span class="token number">12</span>:   5d                      pop    %rbp
  <span class="token number">13</span>:   c3                      retq
<span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># objdump -r test.o</span>

test.o:     <span class="token function">file</span> <span class="token function">format</span> elf64-x86-64

RELOCATION RECORDS FOR <span class="token punctuation">[</span>.text<span class="token punctuation">]</span>:
OFFSET           TYPE              VALUE
0000000000000007 R_X86_64_REX_GOTPCRELX  i-0x0000000000000004


RELOCATION RECORDS FOR <span class="token punctuation">[</span>.eh_frame<span class="token punctuation">]</span>:
OFFSET           TYPE              VALUE
0000000000000020 R_X86_64_PC32     .text

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如这里的offset是7， 指令开始的位置是4，指令在offset前面的3个字节。因此重定位类型是<code>R_X86_64_REX_GOTPCRELX</code>。</p>`,3),k={href:"https://staffwww.fullcoll.edu/aclifton/courses/cs241/syllabus-21842-mw-sp23.html",target:"_blank",rel:"noopener noreferrer"},h=n("h1",{id:"参考文献",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考文献","aria-hidden":"true"},"#"),s(" 参考文献")],-1),f={href:"https://www.zhihu.com/question/270485830",target:"_blank",rel:"noopener noreferrer"},R={href:"https://staffwww.fullcoll.edu/aclifton/courses",target:"_blank",rel:"noopener noreferrer"};function w(E,g){const t=c("ExternalLinkIcon");return l(),i("div",null,[r,n("p",null,[s("关于relocation的类型，可以在"),n("a",p,[s("amd64 ABI"),e(t)]),s("中找到所有的定义。")]),u,n("p",null,[s("现在x86-64有rip了就直接可以通过偏移得到数据地址,由代码看出movl $0x6e,0x20029e(%rip) 就可以将110送入变量i的地址了,少了一次call跟偏移相加gcc -fPIC -shared hello.c -o "),n("a",v,[s("test64.so"),e(t)])]),_,n("p",null,[s("其次还需要理解REX "),n("a",m,[s("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-instruction-format.html"),e(t)])]),b,n("p",null,[n("a",k,[s("https://staffwww.fullcoll.edu/aclifton/courses/cs241/syllabus-21842-mw-sp23.html"),e(t)])]),h,n("ul",null,[n("li",null,[s("RIP相对寻址 "),n("a",f,[s("https://www.zhihu.com/question/270485830"),e(t)])])]),n("p",null,[n("a",R,[s("https://staffwww.fullcoll.edu/aclifton/courses"),e(t)]),s(" 课程")])])}const X=d(o,[["render",w],["__file","elf-relocation.html.vue"]]);export{X as default};
