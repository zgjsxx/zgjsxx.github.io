import{_ as p,V as d,W as c,X as n,Y as s,$ as t,a0 as e,F as o}from"./framework-9a29aaa0.js";const i={},l=e(`<h1 id="第十八讲-c字符串" tabindex="-1"><a class="header-anchor" href="#第十八讲-c字符串" aria-hidden="true">#</a> 第十八讲 c字符串</h1><p>C 风格字符串是一个字节数组，其中最后一个字节等于 0。这使得我们可以计算出字符串的长度，而不用取存储它。计算方法是遍历字符串直到找到 0 字节。在 C/C++ 中，这看起来像这样：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">size_t</span> <span class="token function">strlen</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">size_t</span> l <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">*</span>s <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token operator">++</span>l<span class="token punctuation">;</span>
        <span class="token operator">++</span>s<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> l<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意<code>0</code>和字符常量<code>\\0</code>是完全相同的。</p><p>计算字符串的长度是所有操作的基础。复制、追加、字符串搜索等依赖于字符串的长度。因此，我们希望使此操作尽可能快。我们将看到的其他字符串操作是:</p><ul><li><p>strcpy – 将一个字符串复制到另一个字符串。</p></li><li><p>strcat – 将两个字符串连接成第三个字符串。</p></li><li><p>strstr – 在字符串中搜索子字符串</p></li></ul><p>上面的汇编的第一个翻译可能如下所示</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>strlen:
    ; rdi = char* s
    ; rax = returned length
    xor rax, rax

.while:
    cmp byte [rdi], 0
    je .return
    inc rdi
    inc rax
    jmp .while

.return:
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是汇编函数的一个示例，它比其原始 C 版本长不了多少，然而，一次访问一个字节的内存并不是实现这一点的最有效方法。在本讲座中，我们将介绍多种不同的方法来执行此操作，从使用带有<code>rep</code>前缀的特定于字符串的指令，到一次加载多个字节，再到使用XMM寄存器并行化进程的高级方法。</p><p>strcpy 只是将字节从一个字符串复制到另一个字符串的问题。我们假设目标字符串有足够的空间。在C中这是</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">strcpy</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> dest<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">*</span>src <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token operator">*</span>dest <span class="token operator">=</span> <span class="token operator">*</span>src<span class="token punctuation">;</span>
        <span class="token operator">++</span>dest<span class="token punctuation">;</span>
        <span class="token operator">++</span>src<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token operator">*</span>dest <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// Copy terminating nul</span>
    <span class="token keyword">return</span> dest<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（我们返回 dest 中最后一个终止 0 的地址，因为它在下面实现 strcat 时很有用。)</p><p>在汇编中：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>strcpy:
    ; rdi = char* dest
    ; rsi = char* src

.while:
    cmp byte [rsi], 0
    je .done
    movsb     ; See string instructions below
    inc rsi
    inc rdi
    jmp .while

.done:
    mov byte [rdi], 0
    mov rax, rdi
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了连接两个字符串，我们必须将第一个字符串复制到目标中，然后是第二个字符串，最后是终止符 0。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">strcat</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span>dest<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> a<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dest <span class="token operator">=</span> <span class="token function">strcpy</span><span class="token punctuation">(</span>dest<span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">strcpy</span><span class="token punctuation">(</span>dest<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>strcat:
  ; rdi = char* dest
  ; rsi = char* a
  ; rdx = char* b
  push rbp
  mov rbp, rsp

  call strcpy

  mov rdi, rax
  mov rsi, rdx
  call strcpy

  pop rbp
  ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>strstr是最有趣的。实现子字符串搜索的自然方法是使用嵌套循环：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">strstr</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> ptn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">size_t</span> tl <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">size_t</span> pl <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>ptn<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> tl <span class="token operator">-</span> pl<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bool matches <span class="token operator">=</span> true<span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> pl<span class="token punctuation">;</span> <span class="token operator">++</span>j<span class="token punctuation">)</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>i <span class="token operator">+</span> j<span class="token punctuation">]</span> <span class="token operator">!=</span> ptn<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        matches <span class="token operator">=</span> false<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>matches<span class="token punctuation">)</span>
      <span class="token keyword">return</span> src <span class="token operator">+</span> i<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// Not found, null pointer</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种实现方式的时间复杂度是<code>O(mn)</code>，这里<code>m</code>是源字符串的长度， <code>n</code>是搜索字符串的长度。有更快的算法，但它们依赖于模式 ptn 的各种跳过表的预计算。</p><p>为了将其转化为汇编，我们需要进行一些修改。首先，我们要消除对 strlen 的调用。应该可以检测循环中搜索字符串和模式的结尾：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">strstr</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> ptn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bool matches <span class="token operator">=</span> true<span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> ptn<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token operator">++</span>j<span class="token punctuation">)</span> <span class="token punctuation">{</span>

      <span class="token keyword">if</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>i <span class="token operator">+</span> j<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>

      <span class="token keyword">if</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>i <span class="token operator">+</span> j<span class="token punctuation">]</span> <span class="token operator">!=</span> ptn<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        matches <span class="token operator">=</span> false<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>matches<span class="token punctuation">)</span>
      <span class="token keyword">return</span> src <span class="token operator">+</span> i<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// Not found</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二个调整是要注意，在函数内部，除了 <code>src + i</code> 之外，我们从不使用 <code>src</code>。因此我们可以用基于指针的循环替换外部整数循环：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">strstr</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> ptn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> <span class="token operator">++</span>src<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bool matches <span class="token operator">=</span> true<span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> ptn<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token operator">++</span>j<span class="token punctuation">)</span> <span class="token punctuation">{</span>

      <span class="token keyword">if</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>

      <span class="token keyword">if</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">!=</span> ptn<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        matches <span class="token operator">=</span> false<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>matches<span class="token punctuation">)</span>
      <span class="token keyword">return</span> src<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// Not found</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以类似地替换内部循环，只要我们保存原始的 ptn，这样我们就可以从头开始：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">strstr</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> ptn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> <span class="token operator">++</span>src<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bool matches <span class="token operator">=</span> true<span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> p <span class="token operator">=</span> ptn<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> s <span class="token operator">=</span> src<span class="token punctuation">;</span> <span class="token operator">*</span>p <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">*</span>s <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token operator">++</span>p<span class="token punctuation">,</span> <span class="token operator">++</span>s<span class="token punctuation">)</span> 
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">*</span>s <span class="token operator">!=</span> <span class="token operator">*</span>p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        matches <span class="token operator">=</span> false<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>matches<span class="token punctuation">)</span>
      <span class="token keyword">return</span> src<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// Not found</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为内循环中的字符串结束条件位于开始处，所以我们可以将其折叠到循环条件中。最后，请注意，我们实际上不需要存储变量 matches 的值。对于内循环中的每次比较，如果两个字节不相等，则跳转到外循环的更新步骤。另一方面，如果内部循环正常完成，这意味着所有字节都相等，我们可以返回。在这种情况下，程序集跳转到任意标签的能力实际上允许我们简化代码，删除标志变量。</p><p>这个函数很简单，我们可以将它翻译成汇编。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>strstr:
  ; rdi = char* src
  ; rsi = char* ptn
  ; rax = returned char*

  ; rsi = s
  ; rdi = p
  ; rax = src
  ; r11 = ptn

  mov rax, rdi
  mov r11, rsi

.src_loop:
  mov rdi, r11       ; p = ptn
  mov rsi, rax       ; s = src

.ptn_loop:
  cmp byte [rdi], 0
  je .end_ptn_loop
  cmp byte [r11], 0
  je .end_ptn_loop

  cmpsb               ; [rdi] != [rsi]
  jne .cont_ptn_loop
  ret                 ; return src

.cont_ptn_loop:
  inc rdi
  inc rsi
  jmp .ptn_loop

.cont_src_loop:
  inc rax
  jmp .src_loop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了进行字节 [rdi] 与字节 [rsi] 的实际比较，我们使用字符串指令 cmpsb，它允许我们比较两个内存操作数，这是我们通常无法做到的。 cmps 是一系列字符串指令之一，所有这些指令都隐式使用 rdi/rsi 作为读取地址。</p><h2 id="字符串指令" tabindex="-1"><a class="header-anchor" href="#字符串指令" aria-hidden="true">#</a> 字符串指令</h2><p>有许多特定于字符串的指令，全部以 s 结尾，它们具有几个共同的特征：</p><ul><li>它们都隐式使用 <code>rdi</code> 和 <code>rsi</code> 寄存器作为地址。它们要么用作两个源操作数（例如，用于字符串比较 cmps），要么用作类似传输操作的源（rsi）和目标（rdi）。</li><li>它们每次都会隐式增加 rdi 和 rsi（如果使用的话）。当重复最终终止时，rdi 和 rsi 保留在其最终位置。</li><li>全部接受rep前缀，这会导致处理器本身重复指令，而我们不会进行任何循环/分支。</li><li>从技术上讲，它们允许字节、单词、双字或 qword 的字符串，但我们只会使用字节变体。</li></ul><h3 id="rep前缀" tabindex="-1"><a class="header-anchor" href="#rep前缀" aria-hidden="true">#</a> <code>rep</code>前缀</h3><p><code>rep</code> 前缀是修饰符，可应用于少数指令，告诉 CPU 在内部重复它们（即不需要比较/分支！），直到满足某些条件。可用的前缀有</p><ul><li><code>rep</code> – 重复 <code>rcx</code> 次，就像<code>loop</code>指令一样，重复执行直到 <code>rcx == 0</code>。所有其他<code>rep</code>前缀也隐式使用此条件；也就是说，<code>repe</code>的停止条件是如果 <code>[rdi] != [rsi]</code> 或 <code>rcx == 0</code>。</li><li><code>repe</code> – 重复直到 <code>[rdi] != [rsi]</code> 或在某些情况下，直到 <code>[rdi] != rax</code>。这基本上循环直到设置零标志。 <code>repz</code> 是此前缀的别名。</li><li><code>repne</code> – 重复直到 <code>[rdi] == [rsi]</code> 或在某些情况下，直到 <code>[rsi] == rax</code>。这基本上循环直到零标志被清除。 <code>repnz</code> 是此前缀的别名。</li></ul><p><code>rep</code> 前缀可以与字符串指令 <code>movs、lods、stos</code> 一起使用。 <code>repe</code>/<code>repne</code> 前缀可与字符串指令 <code>cmps</code> 和 <code>scas</code> 一起使用。</p><p>请注意，无论使用什么前缀，重复都会在 <code>rcx == 0</code> 时终止。</p><p>因此，如果您不希望 <code>rcx</code> 对指令重复次数产生任何影响，请将其设置为可能的最大无符号 qword 值：</p><p><code>mov rcx, -1</code></p><h3 id="传输指令-lods、stos-和-movs" tabindex="-1"><a class="header-anchor" href="#传输指令-lods、stos-和-movs" aria-hidden="true">#</a> 传输指令：lods、stos 和 movs</h3><p>存在从内存到al、从al到内存以及从内存到内存传输数据的三个指令。这些是 <code>lod</code>、<code>stos</code> 和 <code>movs</code>：</p><table><thead><tr><th>指令</th><th>描述</th></tr></thead><tbody><tr><td><code>lodsb</code></td><td>将 <code>[rdi]</code>处的一个字节加载到 <code>al</code></td></tr><tr><td><code>stosb</code></td><td>将 <code>al</code> 中的字节写入字节 <code>[rdi]</code></td></tr><tr><td><code>movsb</code></td><td>将字节从 <code>[rsi]</code> 复制到 <code>[rdi]</code></td></tr></tbody></table><p><code>rep</code> 前缀使这些操作运行 <code>rcx</code> 次。其他前缀不能与它们一起使用，因此，必须提前知道输入字符串的长度。尽管如此，<code>stosb</code> 仍可用于用常量字节填充内存数组，而 <code>movsb</code> 则可用于将一个字符串复制到另一个字符串中。<code>rep lodsb</code> 并不是特别有用，因为它会重复地将字节加载到 al 中，但随后不会对它们执行任何操作。</p><h2 id="比较指令-cmps-和-scas" tabindex="-1"><a class="header-anchor" href="#比较指令-cmps-和-scas" aria-hidden="true">#</a> 比较指令：<code>cmps</code> 和 <code>scas</code></h2><p><code>cmpsb</code> 将 <code>[rdi]</code> 处的字节与 <code>[rsi]</code> 处的字节进行比较，并相应地更新标志。由于 <code>repe</code>/<code>repne</code> 前缀使用 <code>ZF</code>，因此可用于按字节比较一对字符串，在相等/不相等的第一对字节处停止。</p><p><code>scas</code> 将字节 <code>[rdi]</code> 与 <code>al</code> 进行比较并相应地更新标志。因此，虽然 <code>cmps</code> 对应于按字节比较两个字符串，但 <code>scas</code> 对应于在字符串中搜索存储在 <code>al</code> 中的特定字符。同样，<code>repe</code>/<code>repne</code> 可用于搜索第一次出现等于/不等于 <code>al</code> 的字节。</p><p>问题：我们可以使用repe前缀来简化上面strstr的实现吗？</p><p>就我个人而言，我不这么认为，因为我们的终止条件比仅仅 !=; 更复杂。我们还必须检查任一列表中的终止 \\0，但我很高兴被证明是错误的！</p><h2 id="字符串操作-strlen" tabindex="-1"><a class="header-anchor" href="#字符串操作-strlen" aria-hidden="true">#</a> 字符串操作 strlen</h2><p>我们可以使用 scas 来实现 strlen 的支持rep的版本</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>strlen:
    ; rdi = char*
    ; rax = return length

    mov rcx, -1     ; Max 64-bit unsigned value
    mov r11, rdi    ; Save original rdi
    xor al, al      ; al = &#39;\\0&#39;
    repne scasb
    ; Now rdi points to the 0 byte

    sub rdi, rax
    mov rdi, r11    ;restore rdi?(原文错了)
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="并行化strlen" tabindex="-1"><a class="header-anchor" href="#并行化strlen" aria-hidden="true">#</a> 并行化strlen</h2><p>我们当前版本的 <code>strlen</code> 一次仅加载一个字节。通过使用 64 位寄存器的全宽度，我们可以在相同的时间内加载 8 个字节，但是我们会遇到在这 8 个字节内的任何位置检测到单个 0 字节的问题。最简单的方法是重复移位并检查寄存器的低/高字节部分：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code> mov rbx, qword [rdi]
  cmp bl, 0
  je .low
  cmp bh, 0
  je .high

  ; Check next word
  shr rbx, 16
  add rdi, 2
  cmp bl, 0
  ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为有四个字，所以我们需要执行四次移位/比较过程（如果我们手动将它们全部写出来，而不是使用循环，速度会更快）。主要的问题是我们使用通用寄存器（rbx），就像它是一个 8 字节的向量寄存器一样，但事实并非如此。如果我们改用 xmm 寄存器，我们就有更多的指令可供使用，可以平等地对待所有字节。</p>`,56),r={href:"https://www.agner.org/optimize/#asmlib",target:"_blank",rel:"noopener noreferrer"},u=e(`<div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>    ; rdi = char* s

    pxor     xmm0, xmm0            ; set to zero
    mov      rax,  rdi
    sub      rax,  10H             ; rax = rdi - 16

    ; Main loop, search 16 bytes at a time
L1: add      rax,  10H             ; increment pointer by 16
    movq     xmm1, [rax]           ; read 16 bytes 
    pcmpeqb  xmm1, xmm0            ; compare 16 bytes with zero
    pmovmskb edx,  xmm1            ; get one bit for each byte result
    bsf      edx,  edx             ; find first 1-bit
    jz       L1                    ; loop if not found  


    ; Zero-byte found. Compute string length        
    sub      rax,  rdi             ; subtract start address
    add      rax,  rdx             ; add byte index
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该算法的基本思想是：</p><ul><li>从地址 rax 加载 16 个字节到 <code>xmm1</code></li><li>将每个字节分别与0进行比较（xmm0用0填充）。请记住，向量比较的结果不是更改标志寄存器，而是在比较为真时将每个字节设置为 1，如果不是，则将每个字节设置为 0。</li><li>将 <code>xmm1</code> 中每个字节的 1 位（真/假比较结果）复制到 <code>edx</code> 中。</li><li>如果未设置位，则重复。</li><li>否则，添加设置位的索引，加上 rax 距字符串开头的偏移量，以获得长度。</li></ul><p><code>movq</code> 指令将一个四字从内存加载到 <code>xmm</code> 寄存器中（或将一个四字从 xmm 寄存器写入内存）。 <code>movq</code> 有点慢，因为它允许未对齐的读取； Fog最初的实现使用movdqa，它要求地址是16的倍数；未对齐的字符串通过在进入主循环之前首先检查未对齐的部分进行特殊处理。</p><p><code>pcmpeqb</code> 指令（Compare Packed Equal Bytes 的缩写）按字节比较两个 xmm 寄存器是否相等，如果为 true，则将目标中的每个字节设置为全 1，如果为 false，则将目标中的每个字节设置为全 0。</p><p><code>pmovmskb</code> 指令（移动掩码字节）获取 xmm 寄存器的每个字节组件的高位，并将它们复制到通用寄存器的位中。这实际上为我们提供了相同的 0 或 1 比较结果，但打包到 edx 的位中，而不是分散到 xmm1 上。</p><p>bsf 指令（位扫描向前）指令搜索已设置的第一个（最低）位。</p><ul><li>如果设置了一个位，则将 edx 设置为该位的索引，并清除零标志。</li><li>如果没有设置任何位，则设置零标志</li></ul><p>如果 edx 中没有设置位，那么我们加载的 16 个字节中没有一个字节是 0，因此我们还没有到达字符串的末尾。否则，edx 是我们加载的 16 字节内字符串结尾字节的偏移量。</p><p>让我们看一个例子来看看它是如何工作的：我们想要找到字符串“The Quick Brown Fox Jumped over the Lazy Dog.”的长度。该字符串有 45 个字符：</p><table><thead><tr><th>T</th><th>h</th><th>e</th><th>␣</th><th>q</th><th>u</th><th>i</th><th>c</th><th>k</th><th>␣</th><th>b</th><th>r</th><th>o</th><th>w</th><th>n</th><th>␣</th><th>f</th><th>o</th><th>x</th><th>␣</th><th>j</th><th>u</th><th>m</th><th>p</th><th>e</th><th>d</th><th>␣</th><th>o</th><th>v</th><th>e</th><th>r</th><th>␣</th><th>t</th><th>h</th><th>e</th><th>␣</th><th>L</th><th>a</th><th>z</th><th>y</th><th>␣</th><th>D</th><th>o</th><th>g</th><th>.</th><th>\\0</th></tr></thead><tbody><tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td>32</td><td>33</td><td>34</td><td>35</td><td>36</td><td>37</td><td>38</td><td>39</td><td>40</td><td>41</td><td>42</td><td>43</td><td>44</td><td>45</td></tr></tbody></table><p>我们预加载 xmm0 全 0：</p><table><thead><tr><th>xmm0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th></tr></thead><tbody><tr><td>Byte</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr></tbody></table><p>循环的第一次迭代会将 Quick Brown 加载到 xmm1 中。</p><table><thead><tr><th>xmm1</th><th>T</th><th>h</th><th>e</th><th>␣</th><th>q</th><th>u</th><th>i</th><th>c</th><th>k</th><th>␣</th><th>b</th><th>r</th><th>o</th><th>w</th><th>n</th><th>␣</th></tr></thead><tbody><tr><td>Byte</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr></tbody></table><p>由于这些字节都不是 \\0，因此比较会将 xmm1 中的所有内容设置为 0：</p><table><thead><tr><th>xmm0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th></tr></thead><tbody><tr><td>Byte</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr></tbody></table><p>然后我们将其作为单个位复制到 edx 中：edx = 0000000000000000b。</p><p>由于没有设置任何位，bsf 将设置零标志 ZF = 1，导致跳转到 L1。</p><p>下一个循环，rax = 16，所以我们将加载fox跳转到xmm1。由于这里也不存在零字节，因此该过程会重复。</p><table><thead><tr><th>xmm1</th><th>t</th><th>h</th><th>e</th><th>␣</th><th>l</th><th>a</th><th>z</th><th>y</th><th>␣</th><th>d</th><th>o</th><th>g</th><th>.</th><th>\\0</th><th></th><th></th></tr></thead><tbody><tr><td>Byte</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr></tbody></table><p>比较后，我们将<code>xmm1</code>设置为:</p><table><thead><tr><th>xmm0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th><th>1</th><th>0</th><th>0</th></tr></thead><tbody><tr><td>Byte</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr></tbody></table><p>然后将其复制到 edx 中，格式为 0010000000000000b。 bsf 将把 edx 设置为 13，即设置位的索引，同时还设置 ZF = 0。这将终止循环。</p><p>正如预期的那样，字符串的最终长度为 32 (rax) 加 13（位索引）= 45。</p><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2>`,26),v={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-string-operations.html",target:"_blank",rel:"noopener noreferrer"};function m(k,h){const a=o("ExternalLinkIcon");return d(),c("div",null,[l,n("p",null,[s("这是来自 Abner Fog 的"),n("a",r,[s("快速汇编"),t(a)]),s(" C 例程库的优化 strlen 的一部分：")]),u,n("p",null,[n("a",v,[s("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-string-operations.html"),t(a)])])])}const x=p(i,[["render",m],["__file","Lecture18-c-styles-strings.html.vue"]]);export{x as default};
