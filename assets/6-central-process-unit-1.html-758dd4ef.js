import{_ as a,V as e,W as n,a0 as s}from"./framework-9a29aaa0.js";const t={},c=s(`<ul><li><a href="#%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E6%9C%AC%E6%9E%B6%E6%9E%84-%E4%B8%AD%E5%A4%AE%E5%A4%84%E7%90%86%E5%99%A8">计算机基本架构-中央处理器</a></li><li><a href="#1%E5%AE%9A%E7%82%B9%E5%8D%95%E5%85%83">1.定点单元</a></li></ul><h1 id="计算机基本架构-中央处理器" tabindex="-1"><a class="header-anchor" href="#计算机基本架构-中央处理器" aria-hidden="true">#</a> 计算机基本架构-中央处理器</h1><p>本章介绍一个基本的中央处理单元（CPU），其操作采用简化的精简指令集（RISC）。本章分为四个部分。</p><p>第一部分介绍了定点指令(fixed-point instruction)。该部分首先开发专用硬件（数据通路）来执行单个RISC指令，然后将多条指令组合成一个集合，并设计一个通用数据通路，以便执行使用该指令集的用户程序。在过程的每一步中，指令字段被划分成几个段，随着指令通过数据通路，必要的硬件被形成以执行指令并生成输出。在这一部分，描述了与定点相关的结构性、数据和程序控制冒险（hazard），并解释了如何防止每种类型的冒险的方法。</p><p>本章的第二部分专门讨论IEEE单精度和双精度浮点格式，并引出简化的浮点加法器和乘法器设计。然后，这些设计与定点硬件集成，以获得能够执行定点和浮点算术指令的RISC CPU。在同一部分中，还描述了与浮点相关的数据冒险。为了减少和消除这些冒险，提出了一种基于简化的<code>Tomasula</code>算法的新浮点架构。</p><p>在第三部分中，讨论了提高程序执行效率的各种技术。通过示例解释了静态和动态流水线、单发射与双发射和三发射流水线之间的权衡。编译器增强技术，如循环展开和动态分支预测方法，也被介绍以减少整体CPU执行时间。</p><p>本章的最后一部分解释了不同类型的缓存内存架构，包括直接映射、组相联和全相联缓存，它们的操作以及每种缓存结构之间的权衡。还讨论了直写和回写机制，并通过各种设计示例对它们进行比较。</p><h1 id="_1-定点单元" tabindex="-1"><a class="header-anchor" href="#_1-定点单元" aria-hidden="true">#</a> 1.定点单元</h1><p>指令集格式</p><p>在RISC CPU中，所有指令都包含一个操作码（OPC）字段，该字段指示处理器如何处理指令中的其余字段，以及何时激活CPU中的不同硬件组件以执行指令。OPC字段后面是一个或多个操作数字段。每个字段要么对应于寄存器文件（RF）中的一个寄存器地址，要么包含用于处理指令的立即数数据。</p><p>RISC CPU中有三种类型的指令：<strong>寄存器到寄存器类型</strong>、<strong>立即数类型</strong>和<strong>跳转类型</strong>。</p><p>寄存器到寄存器类型的指令包含一个操作码（OPC），后面是三个操作数：两个源寄存器地址和一个指向寄存器文件（RF）的目标寄存器地址，分别是RS1、RS2和RD。该指令的格式如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>OPC RS1, RS2, RD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种类型的指令从寄存器文件（RF）中获取第一个和第二个源寄存器的内容，分别是<code>Reg[RS1]</code>和<code>Reg[RS2]</code>，根据操作码（OPC）对它们进行处理，并将结果写入目标寄存器<code>Reg[RD]</code>中。该操作如下所述。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Reg<span class="token punctuation">[</span>RS1<span class="token punctuation">]</span> <span class="token punctuation">(</span>OPC<span class="token punctuation">)</span> Reg<span class="token punctuation">[</span>RS2<span class="token punctuation">]</span> <span class="token operator">!</span> Reg<span class="token punctuation">[</span>RD<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,15),o=[c];function p(i,r){return e(),n("div",null,o)}const l=a(t,[["render",p],["__file","6-central-process-unit-1.html.vue"]]);export{l as default};
