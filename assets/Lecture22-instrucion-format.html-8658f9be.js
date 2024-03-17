import{_ as l,V as r,W as n,X as t,Y as d,$ as a,a0 as s,F as i}from"./framework-9a29aaa0.js";const h={},o=s('<ul><li><a href="#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%BA%8C%E8%AE%B2-%E6%8C%87%E4%BB%A4%E6%A0%BC%E5%BC%8F">第二十二讲 指令格式</a><ul><li><a href="#mips32%E6%8C%87%E4%BB%A4%E6%A0%BC%E5%BC%8F">MIPS32指令格式</a><ul><li><a href="#rregister%E6%8C%87%E4%BB%A4%E6%A0%BC%E5%BC%8F">R(Register)指令格式</a></li><li><a href="#iimediate%E6%8C%87%E4%BB%A4%E6%A0%BC%E5%BC%8F">I(Imediate)指令格式</a></li><li><a href="#jjump%E6%8C%87%E4%BB%A4%E6%A0%BC%E5%BC%8F">J(jump)指令格式</a></li><li><a href="#%E4%BE%8B%E5%AD%90">例子</a></li></ul></li><li><a href="#x86-64%E6%93%8D%E4%BD%9C%E7%A0%81%E7%9A%84%E6%A0%BC%E5%BC%8F">x86-64操作码的格式</a><ul><li><a href="#%E5%89%8D%E7%BC%80">前缀</a></li><li><a href="#modrm-%E5%92%8C-sib-%E5%AD%97%E6%AE%B5">ModR/M 和 SIB 字段</a></li><li><a href="#rex-%E5%89%8D%E7%BC%80">REX 前缀</a></li><li><a href="#%E6%93%8D%E4%BD%9C%E7%A0%81">操作码</a></li></ul></li><li><a href="#%E9%99%84%E5%BD%95">附录</a></li></ul></li></ul><h1 id="第二十二讲-指令格式" tabindex="-1"><a class="header-anchor" href="#第二十二讲-指令格式" aria-hidden="true">#</a> 第二十二讲 指令格式</h1><h2 id="mips32指令格式" tabindex="-1"><a class="header-anchor" href="#mips32指令格式" aria-hidden="true">#</a> MIPS32指令格式</h2><p>我们先前研究指令流水线是提到过<strong>MIPS32</strong>。<strong>MIPS32</strong>使用固定长度的指令，即每个指令32位。<strong>MIPS32</strong>存在三种不同的指令格式，但这三种指令格式都使用高6位作为操作码。</p><h3 id="r-register-指令格式" tabindex="-1"><a class="header-anchor" href="#r-register-指令格式" aria-hidden="true">#</a> R(Register)指令格式</h3><p>R指令格式具有三个寄存器的字段（通常为两个源寄存器和一个目标寄存器），以及移位量（5 位）和函数（6 位）。R指令格式用于没有立即数的算术运算或者位运算。所有的R指令的Opcode都是全0。</p><table><thead><tr><th>Opcode = 000000</th><th>RS</th><th>RT</th><th>RD</th><th>Sh.Amount</th><th>Function</th></tr></thead><tbody><tr><td>6比特</td><td>5比特</td><td>5比特</td><td>5比特</td><td>5比特</td><td>6比特</td></tr></tbody></table><p><strong>函数字段</strong>指定了要应用于 RS、RT（源）和 RD（目标）的实际算术函数。例如，函数字段 32 (<code>100000b</code>) 是加法。左/右移位指令使用移位量字段来指定要移位的量。下表给出了更多的例子：</p><table><thead><tr><th>指令名</th><th>格式</th><th>op</th><th>rs</th><th>rt</th><th>rd</th><th>sh amt</th><th>func</th><th>example</th></tr></thead><tbody><tr><td>add</td><td>R</td><td>0</td><td>2</td><td>3</td><td>1</td><td>0</td><td>32</td><td>add $1, $2, $3</td></tr><tr><td>addu</td><td>R</td><td>0</td><td>2</td><td>3</td><td>1</td><td>0</td><td>33</td><td>addu $1, $2, $3</td></tr><tr><td>sub</td><td>R</td><td>0</td><td>2</td><td>3</td><td>1</td><td>0</td><td>34</td><td>sub $1, $2, $3</td></tr><tr><td>subu</td><td>R</td><td>0</td><td>2</td><td>3</td><td>1</td><td>0</td><td>35</td><td>subu $1, $2, $3</td></tr><tr><td>and</td><td>R</td><td>0</td><td>2</td><td>3</td><td>1</td><td>0</td><td>36</td><td>and $1, $2, $3</td></tr><tr><td>or</td><td>R</td><td>0</td><td>2</td><td>3</td><td>1</td><td>0</td><td>37</td><td>or $1, $2, $3</td></tr><tr><td>nor</td><td>R</td><td>0</td><td>2</td><td>3</td><td>1</td><td>0</td><td>39</td><td>nor $1, $2, $3</td></tr><tr><td>slt</td><td>R</td><td>0</td><td>2</td><td>3</td><td>1</td><td>0</td><td>42</td><td>slt $1, $2, $3</td></tr><tr><td>sltu</td><td>R</td><td>0</td><td>2</td><td>3</td><td>1</td><td>0</td><td>43</td><td>sltu $1, $2, $3</td></tr></tbody></table><h3 id="i-imediate-指令格式" tabindex="-1"><a class="header-anchor" href="#i-imediate-指令格式" aria-hidden="true">#</a> I(Imediate)指令格式</h3><p>I指令格式包含两个寄存器字段（通常是源寄存器和目标寄存器）和 16位立即数字段。 I格式用于带有立即数的算术运算，也用于使用基址+位移寻址方案的内存加载/存储指令（位移存储在立即数字段中，并且仅限于 16 位，有符号）</p><table><thead><tr><th>操作码</th><th>RS</th><th>RD</th><th>立即数</th></tr></thead><tbody><tr><td>6比特</td><td>5比特</td><td>5比特</td><td>16比特</td></tr></tbody></table>',12),c=t("p",null,[d("MIPS有32个寄存器("),t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("msup",null,[t("mn",null,"2"),t("mn",null,"5")])]),t("annotation",{encoding:"application/x-tex"},"{2}^{5}")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.8141em"}}),t("span",{class:"mord"},[t("span",{class:"mord"},[t("span",{class:"mord"},"2")]),t("span",{class:"msupsub"},[t("span",{class:"vlist-t"},[t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.8141em"}},[t("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[t("span",{class:"pstrut",style:{height:"2.7em"}}),t("span",{class:"sizing reset-size6 size3 mtight"},[t("span",{class:"mord mtight"},[t("span",{class:"mord mtight"},"5")])])])])])])])])])])]),d("),因此使用5个比特位就可以进行编码表示， 所以RS/RT各为5个比特。立即数字段使用任何16位立即值进行填充。")],-1),p=t("h3",{id:"j-jump-指令格式",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#j-jump-指令格式","aria-hidden":"true"},"#"),d(" J(jump)指令格式")],-1),m=t("p",null,"J指令格式用于跳转指令，跳转到绝对地址。其中目标地址为26位，由于MIPS的地址是32位对齐的，因此其地址的低2位固定为零。这样已经构成了28位地址。缺失剩下的4个位，由PC指针的高4位提供。",-1),u=t("p",{class:"katex-block"},[t("span",{class:"katex-display"},[t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[t("semantics",null,[t("mrow",null,[t("mtext",null,"实际的跳转地址"),t("mo",null,"="),t("mi",null,"P"),t("mi",null,"C"),t("mtext",null,"指针的高"),t("mn",null,"4"),t("mtext",null,"位"),t("mo",null,"+"),t("mn",null,"26"),t("mtext",null,"位伪地址"),t("mo",null,"+"),t("mn",null,"2"),t("mtext",null,"个"),t("mn",null,"0"),t("mtext",null,"位")]),t("annotation",{encoding:"application/x-tex"}," 实际的跳转地址 = PC指针的高4位 + 26位伪地址 + 2个0位 ")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.6833em"}}),t("span",{class:"mord cjk_fallback"},"实际的跳转地址"),t("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),t("span",{class:"mrel"},"="),t("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.7667em","vertical-align":"-0.0833em"}}),t("span",{class:"mord mathnormal",style:{"margin-right":"0.07153em"}},"PC"),t("span",{class:"mord cjk_fallback"},"指针的高"),t("span",{class:"mord"},"4"),t("span",{class:"mord cjk_fallback"},"位"),t("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),t("span",{class:"mbin"},"+"),t("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.7667em","vertical-align":"-0.0833em"}}),t("span",{class:"mord"},"26"),t("span",{class:"mord cjk_fallback"},"位伪地址"),t("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),t("span",{class:"mbin"},"+"),t("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.6833em"}}),t("span",{class:"mord"},"2"),t("span",{class:"mord cjk_fallback"},"个"),t("span",{class:"mord"},"0"),t("span",{class:"mord cjk_fallback"},"位")])])])])],-1),b=s(`<table><thead><tr><th>操作码</th><th>伪地址</th></tr></thead><tbody><tr><td>6比特</td><td>26比特</td></tr></tbody></table><p>J格式合法的操作码是<code>0x2</code>和<code>0x3</code>。</p><h3 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h3><p>这里我们看一下MIPS指令的一些示例并对其进行解码。</p><p><strong>例1</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>00000000001000100001100000100000 <span class="token operator">=</span> 0x00221820
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因为高6位是 0，这是一个算术运算，是R指令格式，所以我们将指令分解为:</p><table><thead><tr><th>000000</th><th>00001</th><th>00010</th><th>00011</th><th>00000</th><th>100000</th></tr></thead><tbody><tr><td>Opcode</td><td>Rs</td><td>Rt</td><td>Rd</td><td>sh.amt</td><td>Operation</td></tr></tbody></table><p>两个源寄存器是r1和r2；目标寄存器是r3 该操作是32，对应于add指令，因此解码为<code>add r3, r1, r2</code></p><p><strong>例2</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>00001000110110101100010000100110
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>操作码（高6位）为2，表示跳转指令，因此上述指令可以解码为：</p><table><thead><tr><th>000010</th><th>00110110101100010000100110</th></tr></thead><tbody><tr><td>操作码</td><td>地址</td></tr></tbody></table><p>这对应于地址为 <code>0xDAC426</code> 的跳转（该地址将使用指令指针的当前内容扩展为 32 位）。</p><p><strong>例3</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>001000 00001 00010 0000000000100101
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>操作码是8，它既不是R指令也不是J指令，所以它就是I格式：</p><table><thead><tr><th>001000</th><th>00001</th><th>00010</th><th>0000000000100101</th></tr></thead><tbody><tr><td>操作码</td><td>Rs</td><td>Rd</td><td>立即数</td></tr></tbody></table><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>addi r2, r1, 37
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="x86-64操作码的格式" tabindex="-1"><a class="header-anchor" href="#x86-64操作码的格式" aria-hidden="true">#</a> x86-64操作码的格式</h2>`,20),g={href:"https://www.intel.cn/content/www/cn/zh/content-details/782158/intel-64-and-ia-32-architectures-software-developer-s-manual-combined-volumes-1-2a-2b-2c-2d-3a-3b-3c-3d-and-4.html",target:"_blank",rel:"noopener noreferrer"},x=s(`<p>基本指令格式如下：</p><table><thead><tr><th>Field</th><th>Prefixes</th><th>Opcode</th><th>ModR/M</th><th>SIB</th><th>Displacement</th><th>Immediate</th></tr></thead><tbody><tr><td>size(bytes)</td><td>0-4</td><td>1,2,3</td><td>0,1</td><td>0,1</td><td>0,1,2,4,8</td><td>0,1,2,4,8</td></tr></tbody></table><p>X86-64指令最大长度限制为15个字节。</p><h3 id="前缀" tabindex="-1"><a class="header-anchor" href="#前缀" aria-hidden="true">#</a> 前缀</h3><p>x86-64指令最多可以有4组前缀。每组前缀都会调整操作码的解释。每组前缀的大小为1个字节。因此前缀字段的大小范围是0~4字节。</p><p>这四组前缀分别是：</p><ul><li><p>1.锁定和重复前缀</p><ul><li><p>锁定前缀(LOCK)可以使得指令可以以原子的方式运行，编码为F0H。</p></li><li><p>字符串操作指令前缀</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>F2h = REPNE, REPNZ
F3h = REP，REPE/REPZ
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>REP</code> 重复指令的次数由迭代计数 ECX 指定</p><p><code>REPE</code> 和 <code>REPNE</code> 前缀允许按照 ZF 标志值终止循环。</p></li></ul></li><li><p>段覆盖前缀，用于使用指定的段来替换默认的段</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2Eh = CS
36h = SS
3Eh = DS
26h = ES
64h = FS
65h = GS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>操作数覆盖，66h。更改指令默认模式所需的数据大小，例如16 位到 32 位，反之亦然。</p></li><li><p>地址覆盖，67h。更改指令期望的地址大小。 32 位地址可以切换为 16 位地址，反之亦然。</p></li></ul><h3 id="modr-m-和-sib-字段" tabindex="-1"><a class="header-anchor" href="#modr-m-和-sib-字段" aria-hidden="true">#</a> ModR/M 和 SIB 字段</h3><h3 id="rex-前缀" tabindex="-1"><a class="header-anchor" href="#rex-前缀" aria-hidden="true">#</a> REX 前缀</h3><p><strong>REX前缀</strong>不属于上述四个前缀组。对于使用扩展64位寄存器（<code>r8</code>-<code>r15</code> 或 <code>xmm</code> 寄存器）之一或使用64位大小的立即数或地址的任何指令，都需要REX前缀。如果<strong>REX前缀</strong>存在，则其位置位于操作码之前，在普通前缀的后面。</p><table><thead><tr><th>字段</th><th><code>0100</code></th><th>W</th><th>R</th><th>X</th><th>B</th></tr></thead><tbody><tr><td>比特</td><td>7-4</td><td>3</td><td>2</td><td>1</td><td>0</td></tr></tbody></table><ul><li>W（如果设置）表示 64 位操作数大小。</li><li>R 用作 ModR/M 字节的 Reg 字段中的额外位。由于Reg字段只有3位，因此通常只能访问前8个寄存器。需要一个额外的位来访问寄存器 r8-r15。</li><li>X 用作 SIB 字节索引字段中的额外位。由于 Index 字段命名了一个寄存器，因此它与上面的 R 字段具有相同的理由。</li><li>B用作SIB字节的Base字段中的额外比特，有时也用作ModR/M字节的R/M字段中的额外比特。这两个字段都命名一个寄存器，因此访问 r8-r15 时需要一个额外的位。</li></ul><h3 id="操作码" tabindex="-1"><a class="header-anchor" href="#操作码" aria-hidden="true">#</a> 操作码</h3><p>操作码本身可以在 1 到 3 个字节之间。</p><ul><li><p>一字节操作码的值 != 0x0f</p></li><li><p>如果第一个字节是 0x0f，则其后必须存在第二个操作码字节。</p></li><li><p>如果第一个字节是 0x66、0xF2 或 0xF3 的强制前缀，则其后必须存在第二个操作码字节。</p></li><li><p>如果第一个字节是转义字节或强制前缀，则对于三字节操作码，可以跟随两个操作码字节。操作码的第一个字节确定其后面是否有另一个操作码字节。</p></li></ul><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2><p>MIPS指令格式：</p>`,17),E={href:"http://www.cs.kzoo.edu/cs230/Resources/MIPS/MachineXL/InstructionFormats.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://en.wikibooks.org/wiki/MIPS_Assembly/Instruction_Formats#J_Format",target:"_blank",rel:"noopener noreferrer"},R={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-instruction-format.html",target:"_blank",rel:"noopener noreferrer"},v=t("p",null,"x86-64 指令格式",-1),_={href:"http://www.c-jump.com/CIS77/CPU/x86/",target:"_blank",rel:"noopener noreferrer"};function B(k,w){const e=i("ExternalLinkIcon");return r(),n("div",null,[o,c,p,m,u,b,t("p",null,[d("x86架构的指令格式在intel的手册中可以查到："),t("a",g,[d("intel手册"),a(e)])]),x,t("p",null,[t("a",E,[d("http://www.cs.kzoo.edu/cs230/Resources/MIPS/MachineXL/InstructionFormats.html"),a(e)]),t("a",f,[d("https://en.wikibooks.org/wiki/MIPS_Assembly/Instruction_Formats#J_Format"),a(e)])]),t("p",null,[t("a",R,[d("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-instruction-format.html"),a(e)])]),v,t("p",null,[t("a",_,[d("http://www.c-jump.com/CIS77/CPU/x86/"),a(e)])])])}const y=l(h,[["render",B],["__file","Lecture22-instrucion-format.html.vue"]]);export{y as default};
