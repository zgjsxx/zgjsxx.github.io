const e=JSON.parse('{"key":"v-4acf5017","path":"/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture11-instruction-level-parallelism.html","title":"第十一讲：指令级并行, SIMD 和流水线","lang":"zh-CN","frontmatter":{"category":["汇编语言"],"description":"第十一讲：指令级并行, SIMD 和流水线 如果 xmm 寄存器是 128 位宽，但浮点值是 32 或 64 位宽，那么剩下的位是什么？答案是，更多的浮点值！每个 xmm 寄存器都可以被视为打包到单个寄存器中的 4 个单精度或 2 个双精度浮点值的数组。 所有上述操作仅对寄存器中的“低”值进行操作（以数组表示法，xmm[0]）.他们通常只是复制其余元素不变。 addps xmm0, xmm1 ; 等同于: ; xmm0[0] += xmm1[0] ; xmm0[1] += xmm1[1] ; xmm0[2] += xmm1[2] ; xmm0[3] += xmm1[3] ; 但是是同时运行的","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture11-instruction-level-parallelism.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"第十一讲：指令级并行, SIMD 和流水线"}],["meta",{"property":"og:description","content":"第十一讲：指令级并行, SIMD 和流水线 如果 xmm 寄存器是 128 位宽，但浮点值是 32 或 64 位宽，那么剩下的位是什么？答案是，更多的浮点值！每个 xmm 寄存器都可以被视为打包到单个寄存器中的 4 个单精度或 2 个双精度浮点值的数组。 所有上述操作仅对寄存器中的“低”值进行操作（以数组表示法，xmm[0]）.他们通常只是复制其余元素不变。 addps xmm0, xmm1 ; 等同于: ; xmm0[0] += xmm1[0] ; xmm0[1] += xmm1[1] ; xmm0[2] += xmm1[2] ; xmm0[3] += xmm1[3] ; 但是是同时运行的"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-12T06:07:22.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-12T06:07:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第十一讲：指令级并行, SIMD 和流水线\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-12T06:07:22.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"压缩算术运算","slug":"压缩算术运算","link":"#压缩算术运算","children":[{"level":3,"title":"移动打包数据","slug":"移动打包数据","link":"#移动打包数据","children":[]},{"level":3,"title":"在寄存器内移动","slug":"在寄存器内移动","link":"#在寄存器内移动","children":[]},{"level":3,"title":"压缩算术","slug":"压缩算术","link":"#压缩算术","children":[]},{"level":3,"title":"打包转换","slug":"打包转换","link":"#打包转换","children":[]},{"level":3,"title":"打包比较","slug":"打包比较","link":"#打包比较","children":[]},{"level":3,"title":"打包等价于浮点操作","slug":"打包等价于浮点操作","link":"#打包等价于浮点操作","children":[]}]}],"git":{"createdTime":1709197873000,"updatedTime":1710223642000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":7.06,"words":2119},"filePathRelative":"posts/Program_language/Assembly_language/fullerton_CSci241/Lecture11-instruction-level-parallelism.md","localizedDate":"2024年2月29日","excerpt":"<h1> 第十一讲：指令级并行, SIMD 和流水线</h1>\\n<p>如果 <code>xmm</code> 寄存器是 128 位宽，但浮点值是 32 或 64 位宽，那么剩下的位是什么？答案是，更多的浮点值！每个 <code>xmm</code> 寄存器都可以被视为打包到单个寄存器中的 4 个单精度或 2 个双精度浮点值的数组。 所有上述操作仅对寄存器中的“低”值进行操作（以数组表示法，<code>xmm[0]</code>）.他们通常只是复制其余元素不变。</p>\\n<div class=\\"language-x86asm line-numbers-mode\\" data-ext=\\"x86asm\\"><pre class=\\"language-x86asm\\"><code>addps xmm0, xmm1\\n; 等同于:\\n;   xmm0[0] += xmm1[0]\\n;   xmm0[1] += xmm1[1]\\n;   xmm0[2] += xmm1[2]\\n;   xmm0[3] += xmm1[3]\\n; 但是是同时运行的\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
