const n=JSON.parse('{"key":"v-05820642","path":"/posts/Linux/Linux-0.11-kernel-trap.html","title":"","lang":"zh-CN","frontmatter":{"description":"void trap_init(void) { \\tint i; \\tset_trap_gate(0,&amp;divide_error); \\tset_trap_gate(1,&amp;debug); \\tset_trap_gate(2,&amp;nmi); \\tset_system_gate(3,&amp;int3);\\t/* int3-5 can be called from all */ \\tset_system_gate(4,&amp;overflow); \\tset_system_gate(5,&amp;bounds); \\tset_trap_gate(6,&amp;invalid_op); \\tset_trap_gate(7,&amp;device_not_available); \\tset_trap_gate(8,&amp;double_fault); \\tset_trap_gate(9,&amp;coprocessor_segment_overrun); \\tset_trap_gate(10,&amp;invalid_TSS); \\tset_trap_gate(11,&amp;segment_not_present); \\tset_trap_gate(12,&amp;stack_segment); \\tset_trap_gate(13,&amp;general_protection); \\tset_trap_gate(14,&amp;page_fault); \\tset_trap_gate(15,&amp;reserved); \\tset_trap_gate(16,&amp;coprocessor_error); \\tfor (i=17;i&lt;48;i++) \\t\\tset_trap_gate(i,&amp;reserved); \\tset_trap_gate(45,&amp;irq13); \\toutb_p(inb_p(0x21)&amp;0xfb,0x21); \\toutb(inb_p(0xA1)&amp;0xdf,0xA1); \\tset_trap_gate(39,&amp;parallel_interrupt); }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/Linux-0.11-kernel-trap.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:description","content":"void trap_init(void) { \\tint i; \\tset_trap_gate(0,&amp;divide_error); \\tset_trap_gate(1,&amp;debug); \\tset_trap_gate(2,&amp;nmi); \\tset_system_gate(3,&amp;int3);\\t/* int3-5 can be called from all */ \\tset_system_gate(4,&amp;overflow); \\tset_system_gate(5,&amp;bounds); \\tset_trap_gate(6,&amp;invalid_op); \\tset_trap_gate(7,&amp;device_not_available); \\tset_trap_gate(8,&amp;double_fault); \\tset_trap_gate(9,&amp;coprocessor_segment_overrun); \\tset_trap_gate(10,&amp;invalid_TSS); \\tset_trap_gate(11,&amp;segment_not_present); \\tset_trap_gate(12,&amp;stack_segment); \\tset_trap_gate(13,&amp;general_protection); \\tset_trap_gate(14,&amp;page_fault); \\tset_trap_gate(15,&amp;reserved); \\tset_trap_gate(16,&amp;coprocessor_error); \\tfor (i=17;i&lt;48;i++) \\t\\tset_trap_gate(i,&amp;reserved); \\tset_trap_gate(45,&amp;irq13); \\toutb_p(inb_p(0x21)&amp;0xfb,0x21); \\toutb(inb_p(0xA1)&amp;0xdf,0xA1); \\tset_trap_gate(39,&amp;parallel_interrupt); }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-16T08:33:48.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-16T08:33:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-16T08:33:48.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1676536428000,"updatedTime":1676536428000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.29,"words":87},"filePathRelative":"posts/Linux/Linux-0.11-kernel-trap.md","localizedDate":"2023年2月16日","excerpt":"<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">void</span> <span class=\\"token function\\">trap_init</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n\\t<span class=\\"token keyword\\">int</span> i<span class=\\"token punctuation\\">;</span>\\n\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>divide_error<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>debug<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>nmi<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_system_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">3</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>int3<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\t<span class=\\"token comment\\">/* int3-5 can be called from all */</span>\\n\\t<span class=\\"token function\\">set_system_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">4</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>overflow<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_system_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">5</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>bounds<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">6</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>invalid_op<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">7</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>device_not_available<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">8</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>double_fault<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">9</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>coprocessor_segment_overrun<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">10</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>invalid_TSS<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">11</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>segment_not_present<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">12</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>stack_segment<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">13</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>general_protection<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">14</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>page_fault<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">15</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>reserved<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">16</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>coprocessor_error<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span>i<span class=\\"token operator\\">=</span><span class=\\"token number\\">17</span><span class=\\"token punctuation\\">;</span>i<span class=\\"token operator\\">&lt;</span><span class=\\"token number\\">48</span><span class=\\"token punctuation\\">;</span>i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span>\\n\\t\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>reserved<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">45</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>irq13<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">outb_p</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">inb_p</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0x21</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">&amp;</span><span class=\\"token number\\">0xfb</span><span class=\\"token punctuation\\">,</span><span class=\\"token number\\">0x21</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">outb</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">inb_p</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0xA1</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">&amp;</span><span class=\\"token number\\">0xdf</span><span class=\\"token punctuation\\">,</span><span class=\\"token number\\">0xA1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token function\\">set_trap_gate</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">39</span><span class=\\"token punctuation\\">,</span><span class=\\"token operator\\">&amp;</span>parallel_interrupt<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
