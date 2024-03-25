import{_ as e,V as a,W as s,a0 as d}from"./framework-9a29aaa0.js";const n={},i=d(`<ul><li><a href="#linux-011%E4%B8%AD%E7%9A%84%E6%B1%87%E7%BC%96">Linux-0.11中的汇编</a><ul><li><a href="#%E5%86%85%E5%B5%8C%E6%B1%87%E7%BC%96">内嵌汇编</a></li><li><a href="#movx">mov(x)</a></li><li><a href="#lea">lea</a></li><li><a href="#lds">lds</a></li><li><a href="#and">AND</a></li><li><a href="#std%E5%92%8Ccld">std和cld</a></li><li><a href="#test">TEST</a></li><li><a href="#jcc">jcc</a></li></ul></li></ul><h1 id="linux-0-11中的汇编" tabindex="-1"><a class="header-anchor" href="#linux-0-11中的汇编" aria-hidden="true">#</a> Linux-0.11中的汇编</h1><h2 id="内嵌汇编" tabindex="-1"><a class="header-anchor" href="#内嵌汇编" aria-hidden="true">#</a> 内嵌汇编</h2><p>基本的格式是：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">asm</span> <span class="token punctuation">(</span> <span class="token string">&quot;statements&quot;</span> 
    <span class="token operator">:</span> output_regs 
    <span class="token operator">:</span> input_regs 
    <span class="token operator">:</span> clobbered_regs
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中符号&quot;c&quot;(count)指示要把count的值放入ecx寄存器 类似的还有： a eax b ebx c ecx d edx S esi D edi I 常数值，(0 - 31) q,r 动态分配的寄存器 g eax,ebx,ecx,edx或内存变量 A 把eax和edx合成一个64位的寄存器(use long longs)</p><h2 id="mov-x" tabindex="-1"><a class="header-anchor" href="#mov-x" aria-hidden="true">#</a> mov(x)</h2><p>movb:复制8位数据(1个字节)</p><p>movw:复制16位数据(2个字节)</p><p>movl:复制32位数据(4个字节)</p><h2 id="lea" tabindex="-1"><a class="header-anchor" href="#lea" aria-hidden="true">#</a> lea</h2><p>lea = Load Effective Address, 即加载有效地址。</p><p><code>LEA Rt, [Rs1+a*Rs2+b] =&gt; Rt = Rs1 + a*Rs2 + b</code></p><h2 id="lds" tabindex="-1"><a class="header-anchor" href="#lds" aria-hidden="true">#</a> lds</h2><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>lds dest, src
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>把 <code>src</code> 指向的地址，高位存放在<code>DS</code>中，低位存放在<code>dest</code>中。</p><p>比如当前DS=1000H, BX=0100H。</p><p>当前内存:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>1000:0100 01
1000:0101 02
1000:0102 03
1000:0103 04
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而有一条指令:<code>LDS BX,[BX]</code><code>[BX]</code>指向<code>1000:0100</code>,执行后BX存低位的内容,也就是<code>BX=0201</code>H, 而DS则存高位的内容,也就是<code>[BX+2]</code>的内容,<code>DS=0403H</code></p><h2 id="and" tabindex="-1"><a class="header-anchor" href="#and" aria-hidden="true">#</a> AND</h2><p>调用格式：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>AND source destination
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对两个操作数对应位之间进行按位逻辑与操作，并将操作存放在目标操作数之中。</p><p>例如bootsect.s， 将dx和0x0100进行按位与，并将值放入到dx中。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>and	$0x0100, %dx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="std和cld" tabindex="-1"><a class="header-anchor" href="#std和cld" aria-hidden="true">#</a> std和cld</h2><p>CLD： 设置DF=0</p><p>STD： 设置DF=1</p><p>movb: if DF = 0: SI = SI + 1 , DI = DI + 1 ; else if DF = 1 SI = SI - 1 , DI = DI - 1 ;</p><p>movw: if DF = 0: SI = SI + 2 , DI = DI + 2 ; else if DF = 1: SI = SI - 2 , DI = DI - 2 ;</p><h2 id="test" tabindex="-1"><a class="header-anchor" href="#test" aria-hidden="true">#</a> TEST</h2><p><strong>功能</strong>: 执行BIT与BIT之间的<strong>逻辑与</strong>运算</p><p>TEST可以判断测试位是否为0。</p><h2 id="jcc" tabindex="-1"><a class="header-anchor" href="#jcc" aria-hidden="true">#</a> jcc</h2><p>JE JZ</p><p>JE和JZ的功能是相同的。</p><p>如果标志位ZF=1， 则进行跳转</p><p>如果标志位ZF=0， 则不进行跳转</p><p>JNE JNZ JNE和JNZ的作用是相同的。</p><p>如果标志位ZF=0， 则进行跳转</p><p>如果标志位ZF=1， 则不进行跳转</p>`,42),l=[i];function c(r,t){return a(),s("div",null,l)}const p=e(n,[["render",c],["__file","Linux-0.11-assemble-language.html.vue"]]);export{p as default};
