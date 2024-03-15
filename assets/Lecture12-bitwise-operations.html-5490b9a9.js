import{_ as i,V as t,W as l,X as s,Y as a,$ as d,a0 as e,F as r}from"./framework-9a29aaa0.js";const c={},o=e(`<h1 id="第十二讲-按位运算" tabindex="-1"><a class="header-anchor" href="#第十二讲-按位运算" aria-hidden="true">#</a> 第十二讲：按位运算</h1><h2 id="按位运算" tabindex="-1"><a class="header-anchor" href="#按位运算" aria-hidden="true">#</a> 按位运算</h2><p>位运算在汇编语言中很重要。我们已经学习了<code>xor</code>（异或），这里我们将学习其他操作<code>or</code>、<code>and</code>、<code>not</code>、<code>andn</code>（与非），以及<strong>移位</strong>和<strong>旋转</strong>操作。除了这些在 C/C++ 也有的位运算之外，汇编语言还支持 C/C++ 语言没有的一些位运算。<code>test</code>操作是按位进行比较的运算符，在条件跳转时可能会用它来构建跳转的状态位。</p><h3 id="and-or-not-and-not位运算" tabindex="-1"><a class="header-anchor" href="#and-or-not-and-not位运算" aria-hidden="true">#</a> AND，OR，NOT，AND-NOT位运算</h3><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>not  dest         ; dest = ~dest
and  dest, src    ; dest = dest &amp; src
or   dest, src    ; dest = dest | src
andn dest, src    ; dest = dest &amp; ~src
xor  dest, src    ; dest = dest ^ src
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的指令通常的限制如下：</p><ul><li>两个操作数必须具有相同的大小，<code>dest</code>和<code>src</code>不能都在内存中，并且只有源操作数(<code>src</code>)可以是立即数。</li><li><code>not</code> 可以与寄存器或内存位置一起使用。</li></ul><p>这些操作的真值表如下所示：</p><ul><li><p>如果 a 为 0，则 ~a 为 1；如果 a 为 1，则 ~a 为 0：</p><table><thead><tr><th>a</th><th>~a</th></tr></thead><tbody><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td></tr></tbody></table></li><li><p>只有当a和b都为1时a和b才为1，否则为0。</p><table><thead><tr><th>a</th><th>b</th><th>a &amp; b</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></tbody></table></li><li><p>如果 a 或 b 为 1，则 a | b 为 1；只有当 a 或 b 均为 0 时，a | b 才为 0。</p><table><thead><tr><th>a</th><th>b</th><th>a or b</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></tbody></table></li><li><p><code>a&amp;~b</code>，只有当a = 1且b = 0时， 结果才为1。</p><table><thead><tr><th>a</th><th>b</th><th>a &amp; ~b</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></tbody></table></li><li><p><code>a^b</code>，当a和b有一个值为1时，结果为1。</p><table><thead><tr><th>a</th><th>b</th><th>a ^ b</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></tbody></table></li></ul><p>真值表反应的是单个比特位运算的计算方法。当应用于二进制数字，则将每个比特位执行相应的运算。例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>   01101101
 <span class="token operator">&amp;</span> <span class="token number">11101110</span>
------------ 
   01101100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置-取消比特位-翻转比特位" tabindex="-1"><a class="header-anchor" href="#设置-取消比特位-翻转比特位" aria-hidden="true">#</a> 设置/取消比特位， 翻转比特位</h3><p>对一个比特位的常见操作有三种:</p><ul><li>设置比特位(设置值为1)</li><li>取消比特位(设置值为0)</li><li>翻转比特位(原值为0，设置为1，原值为1，设置为0)</li></ul><p>这些操作的第一个步骤是构造一个位掩码，我们希望操作的位的值为 1，其他位置的值为 0。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>bitmask:   EQU   10000000b    ; Manipulate bit 7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果位置不是恒定的，那么我们可以使用移位（见下文）来动态构造掩码。</p><p>要设置一个位，同时保持所有其他位不变，我们使用<code>or</code>。 <code>x or 0 == x</code>，因此掩码中未设置的位将保持不变，但 <code>x or 1 == 1</code>，因此掩码中已设置的位将被强制为 1。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>or  rax, bitmask 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了取消比特位，我们需要一个按位运算 OP，它满足 <code>x OP 0 == x</code> 和 <code>x OP 1 == 0</code>。查看上面的真值表，我们发现与非运算就是我们想要的。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>andn rax, bitmask
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了翻转一个比特位，我们需要一个操作 <code>OP</code>，其中 <code>x OP 0 == x</code> 但 <code>x OP 1 == ~x</code>。同样，从表中我们可以看到 <code>xor</code> 就是我们想要的：</p><div class="language-x868asm line-numbers-mode" data-ext="x868asm"><pre class="language-x868asm"><code>xor rax, bitmask
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果需要一次性操作多个比特位，则需要一个设置了多个位的掩码，这样就可以一次性设置/清除/翻转多个位。</p><h2 id="符号位的延伸" tabindex="-1"><a class="header-anchor" href="#符号位的延伸" aria-hidden="true">#</a> 符号位的延伸</h2><p>上面，汇编器负责将位掩码的值扩展为 64 位（<code>rax</code> 的大小），以便大小匹配。实际上，位运算可以用在长度小于目标的立即数与目标数上。我们可以通过为立即数掩码显式指定大小来强制执行此行为：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rax, 0
or  rax, byte bitmask ; What bit(s) does this set?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当立即数的值（显式）小于目标值时，将符号扩展为目标值的大小。</p><p>现在我们想将其扩展到 16 位。如果我们简单地添加 0，那么我们有</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>0000000011111111b <span class="token operator">=</span> <span class="token number">127</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请记住，如果未设置高位，则该值为正！相反，我们将 11111111b 的最高位复制到我们添加的新位中：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>1111111111111111b <span class="token operator">=</span> <span class="token parameter variable">-1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每当我们扩展一个有符号值时，我们都需要执行符号扩展。相反，如果我们扩展一个无符号值，那么我们一定不能执行符号扩展，因为它会给出错误的结果。为了扩展无符号值，我们执行零扩展，用零填充高位。</p><p>这两种转换的区别就是 <code>movsx</code> 和 <code>movzx</code> 操作的区别：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>movsx dest, src      ; Sign-extend src into dest
movzx dest, src      ; Zero-extent src into dest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="移位和旋转" tabindex="-1"><a class="header-anchor" href="#移位和旋转" aria-hidden="true">#</a> 移位和旋转</h2><p>在 C/C++ 中，我们有 <code>&lt;&lt;</code> 和 <code>&gt;&gt;</code> 运算符，它们执行<strong>左移位</strong>和<strong>右移位</strong>。它们通常用作乘/除2的便捷方式。要了解其原理，请考虑二进制值 3：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>00000011    <span class="token operator">=</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们将位向左移动，则 1 值位变为 2，而 2 值位变为 4，得到</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>00000110    <span class="token operator">=</span> <span class="token number">6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,40),p=s("p",null,[a("数字的低位会以0填充未占用的位置。左移一位乘以 2。左移 n 位乘以 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msup",null,[s("mn",null,"2"),s("mi",null,"n")])]),s("annotation",{encoding:"application/x-tex"},"{2}^{n}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6644em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.6644em"}},[s("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"n")])])])])])])])])])])]),a("。")],-1),u=s("p",null,[a("另外，将 6 右移一位得到 3，因此右移相当于除以 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msup",null,[s("mn",null,"2"),s("mi",null,"n")])]),s("annotation",{encoding:"application/x-tex"},"{2}^{n}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6644em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.6644em"}},[s("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"n")])])])])])])])])])])]),a("（向下舍入）。在高位位置填充 0。")],-1),v=e(`<p>对于无符号值，移位的工作方式与上述完全相同。</p><p>当移动有符号值时，我们需要小心负值。例如，-6 = 11111010b。如果我们将其向右移动，同时用 0 填充高位，我们得到</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>01111101 <span class="token operator">=</span> <span class="token number">125</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当右移有符号值时，我们不想用零填充高位。相反，我们希望将现有的高位复制到其中，以便保留符号：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">11111101</span> <span class="token operator">=</span> <span class="token parameter variable">-3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>保留符号右移称为算术移位，而补零移位称为逻辑移位。大会两者都有。请注意，这种区别仅适用于右移；对于左移，我们总是用 0 填充低位。</p><p>对于移位操作的汇编指令如下所示：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>shl dest, a    ; Logical shift left
sal dest, a    ; Arithmetical shift left
shr dest, a    ; Logical shift right
sar dest, a    ; Arithmetical shift right
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然汇编有<code>shl</code>和<code>sal</code>指令，但它们执行相同的操作：左移，用0填充低位。操作数 a（要移位的位数）受到严格限制：它必须是 8 位立即数或 cl 寄存器（rcx 的低 8 位）。最大移位值为 63。</p><ul><li>移位时，移走的高/低位被放入进位标志CF中。多位移位的行为就像按顺序执行多个 1 位移位一样。 （即，移出的最后一位将被放置在 CF 中。）</li><li>对于 1 位移位，如果符号已更改，则设置 OF 标志。</li></ul><h2 id="使用位移来构造掩码" tabindex="-1"><a class="header-anchor" href="#使用位移来构造掩码" aria-hidden="true">#</a> 使用位移来构造掩码</h2><p>我们可以使用移位指令来构造掩码，而不是直接硬编码创建掩码。例如，我们要构造掩码<code>00000000011001000b</code>。该掩码设置了第3位，第6位和第7位。为了创建这个，我们首先构建一个掩码，其中 0 位位置为 1，然后将其向上移动所需的量：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rax, 0  ; bitmask
mov rbx, 1

shl rbx, 3    ; Bit 3 of rbx is set 
or  rax, rbx  ; Bit 3 of rax is set
shl rbx, 3    ; Bit 6 of rbx is set
or  rax, rbx  ; Bits 3 and 6 of rax are set
shl rbx, 1    ; Bit 7 of rbx is set
or  rax, rbs  ; Bits 3, 6, and 7 are set
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="旋转" tabindex="-1"><a class="header-anchor" href="#旋转" aria-hidden="true">#</a> 旋转</h2><p>除了移位之外，汇编语言还能够向左或向右旋转位；将移位操作中被丢弃高/低位移动到另一端，以填充未占用的位位置。旋转没有直接的数学模拟，因此不如移位有用。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>原数字：01101010

向左循环移动3位：01010011
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>ror  dest, a        ; Rotate dest a bits to the right    
rol  dest, a        ; Rotate dest a bits to the left
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>与位移位一样，数量 a 必须是立即数或 cl 寄存器，并且必须在 0 到 63 的范围内。 CF 标志设置为要从一端“移动”的最后一位的副本到另一个。</p><h2 id="test指令" tabindex="-1"><a class="header-anchor" href="#test指令" aria-hidden="true">#</a> <code>test</code>指令</h2><p>测试指令执行按位与，然后相应地设置 SF 和 ZF 标志。这可以与掩码一起使用来测试单个位（或一组位）是否打开：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>test rax, 00010000b
jnz target              ; Jump if bit 4 is set in rax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>它还可以用来测试一个值是否为0：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>test rax, rax 
; If ZF == 1 then rax == 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>并测试一个值的符号：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>test rax, rax
; If SF == 1 then rax &lt; 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试特定位的更简单方法是使用 <code>bt</code> 指令：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>bt a, b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>bt</code> 将 a 中第 b 位的值复制到进位标志 CF 中。因此，如果 a 中设置了位 b，则 CF == 1，否则等于 0。a 可以是寄存器或内存，b 可以是寄存器或立即数。因此，测试 <code>rax</code> 的第 4 位的另一种方法是</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>bt rax, 4
jc target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>位测试指令有多种变体，它们不仅将位复制到 CF，还同时设置、取消设置（“重置”）和翻转（补码）该位：</p><h2 id="搜索位" tabindex="-1"><a class="header-anchor" href="#搜索位" aria-hidden="true">#</a> 搜索位</h2><p>有时我们需要扫描一个值并找到已设置的低端或高端的第一位。例如，在</p><p>00111000</p><p>第一个最低位组位于位置 3，而第一个最高位位于位置 5。指令 bsf（“位扫描正向”）和 bsr（“位扫描反向”）为我们提供了以下信息：</p><p>bsf 目标、源</p><p>bsr 目标、源</p><p>它们扫描源（寄存器/内存）并将位位置写入目标（寄存器）。</p><p>最后，还有许多奇数位指令，它们在翻转其他位等的同时搜索位。这些是 blsi、bzhi、blsr、blsmask、bextr 和其他一些。如果您对他们所做的事情感兴趣，请查找他们。</p><h2 id="应用-伪随机数生成" tabindex="-1"><a class="header-anchor" href="#应用-伪随机数生成" aria-hidden="true">#</a> 应用：伪随机数生成</h2><p>纯粹通过算法在计算机上生成真正的随机数是不可能的。算法是一系列步骤，因此如果您完全重复这些步骤，您将得到相同的结果。相反，我们寻求“伪随机性”，即一系列看似随机的值，如果您忽略我们可以通过重新运行算法来重复它们的事实。有多种生成伪随机数的算法。其中大多数都维持某种内部状态，从一个数字持续到下一个数字。生成的数字源自状态，通常仅由状态的高 n 位组成，但有时使用更多复杂的变换。</p><p>最古老和最简单的是线性同余发生器，其基本形式:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>state <span class="token operator">=</span> <span class="token punctuation">(</span>state * A + B<span class="token punctuation">)</span> % m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中 A 和 B 是必须仔细选择的常数。现代生成器经常利用按位运算，因为这允许状态中的位进行更多混合。 Java 8 中使用的 SplitMix 生成器使用 64 位状态以及右移和 XOR，在 C/C++ 中如下所示：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token class-name">uint64_t</span> x <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">;</span> <span class="token comment">// Seed/state</span>

<span class="token class-name">uint64_t</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint64_t</span> z <span class="token operator">=</span> <span class="token punctuation">(</span>x <span class="token operator">+=</span> <span class="token number">0x9e3779b97f4a7c15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    z <span class="token operator">=</span> <span class="token punctuation">(</span>z <span class="token operator">^</span> <span class="token punctuation">(</span>z <span class="token operator">&gt;&gt;</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0xbf58476d1ce4e5b9</span><span class="token punctuation">;</span>
    z <span class="token operator">=</span> <span class="token punctuation">(</span>z <span class="token operator">^</span> <span class="token punctuation">(</span>z <span class="token operator">&gt;&gt;</span> <span class="token number">27</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0x94d049bb133111eb</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> z <span class="token operator">^</span> <span class="token punctuation">(</span>z <span class="token operator">&gt;&gt;</span> <span class="token number">31</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,44),m={href:"http://xoshiro.di.unimi.it/splitmix64.c",target:"_blank",rel:"noopener noreferrer"},b=e(`<p>请注意，返回的值不是内部状态 x，而是它的变体 z。状态 x 的前进非常简单，增加一个常数。</p><p>为了在汇编中实现这一点，我们将状态存储在内存中，然后编写一个函数来推进它并返回下一个随机值。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

state:      dq      137546  ; Seed value

section .text

next:
    push rbp
    mov rbp, rsp

    ; Constants
    mov r8,  0xbf58476d1ce4e5b9
    mov r9,  0x94d049bb133111eb
    mov r10, 0x9e3779b97f4a7c15 

    ; Update state
    add qword [state], r10
    mov rax, qword [state]

    ; z = (z ^ (z &gt;&gt; 30)) * 0xbf58476d1ce4e5b9
    mov rbx, rax
    shr rbx, 30
    xor rax, rbx
    mul r8

    ; z = (z ^ (z &gt;&gt; 27)) * 0x94d049bb133111eb
    mov rbx, rax
    shr rbx, 27
    xor rax, rbx
    mul r9

    ; return z ^ (z &gt;&gt; 31)
    mov rbx, rax
    shr rbx, 31
    xor rax, rbx

    pop rbp
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过编写一个 <code>main</code> 来测试这一点，该 <code>main</code> 打印出生成的随机字节（注意：不是随机数，而是原始字节值），然后将它们提供给 PractRand 测试套件。这是该程序的其余部分：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

state:      dq      137546  ; Seed value

buffer:     dq      0            

section .text

global _start
_start:

    push rbp
    mov rbp, rsp

.loop:

    call next
    mov [buffer], rax

    mov rax, 1          ; Write syscall
    mov rdi, 1          ; Stdout
    mov rsi, buffer     ; Address 
    mov rdx, 8          ; Length
    syscall

    jmp .loop

    pop rbp

    mov rax, 60
    mov rdi, 0
    syscall

next: 
    ... ; Remainder of next function
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后使用下面的命令进行测试：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./splitmix <span class="token operator">|</span> RNG_测试标准输入
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这基本上让 splitmix 永远运行，不断地吐出随机数据，由 RNG_test 消耗。 RNG_test 对收到的数据运行一系列统计测试，并针对越来越大的数据块报告任何问题。</p><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2>`,9),h={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-bitwise-operations.html",target:"_blank",rel:"noopener noreferrer"};function x(g,k){const n=r("ExternalLinkIcon");return t(),l("div",null,[o,p,u,v,s("p",null,[s("a",m,[a("源码"),d(n)])]),b,s("p",null,[a("原文连接："),s("a",h,[a("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-bitwise-operations.html"),d(n)])])])}const _=i(c,[["render",x],["__file","Lecture12-bitwise-operations.html.vue"]]);export{_ as default};
