const e=JSON.parse('{"key":"v-6cf640e6","path":"/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture17-xx.html","title":"第十七讲：Z80汇编语言(任天堂游戏机和德州仪器计算器)","lang":"zh-CN","frontmatter":{"category":["汇编语言"],"description":"第十七讲：Z80汇编语言(任天堂游戏机和德州仪器计算器) 寄存器 Z80 有 8 个或 5 个通用寄存器，具体取决于您如何看待事物： 寄存器 A、F、B、C、D、E、H 和 L 可以单独用作 8 位寄存器 寄存器对BC、DE和HL可用作16位寄存器，其中B是 BC 的高字节，而 C 是低字节。 有点奇怪的是，A 寄存器可以与标志寄存器 F 组合起来作为 16 位寄存器 AF。 寄存器 IX 和 IY 是 16 位索引寄存器，与内存操作数一起使用。 HL 类似地用于内存操作数。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture17-xx.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"第十七讲：Z80汇编语言(任天堂游戏机和德州仪器计算器)"}],["meta",{"property":"og:description","content":"第十七讲：Z80汇编语言(任天堂游戏机和德州仪器计算器) 寄存器 Z80 有 8 个或 5 个通用寄存器，具体取决于您如何看待事物： 寄存器 A、F、B、C、D、E、H 和 L 可以单独用作 8 位寄存器 寄存器对BC、DE和HL可用作16位寄存器，其中B是 BC 的高字节，而 C 是低字节。 有点奇怪的是，A 寄存器可以与标志寄存器 F 组合起来作为 16 位寄存器 AF。 寄存器 IX 和 IY 是 16 位索引寄存器，与内存操作数一起使用。 HL 类似地用于内存操作数。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-29T09:02:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-29T09:02:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第十七讲：Z80汇编语言(任天堂游戏机和德州仪器计算器)\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-29T09:02:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"寄存器","slug":"寄存器","link":"#寄存器","children":[]},{"level":2,"title":"指令集","slug":"指令集","link":"#指令集","children":[]},{"level":2,"title":"条件跳转","slug":"条件跳转","link":"#条件跳转","children":[]},{"level":2,"title":"函数","slug":"函数","link":"#函数","children":[]},{"level":2,"title":"块传输","slug":"块传输","link":"#块传输","children":[]}],"git":{"createdTime":1709193295000,"updatedTime":1709197352000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":3.78,"words":1134},"filePathRelative":"posts/Program_language/Assembly_language/fullerton_CSci241/Lecture17-xx.md","localizedDate":"2024年2月29日","excerpt":"<h1> 第十七讲：Z80汇编语言(任天堂游戏机和德州仪器计算器)</h1>\\n<h2> 寄存器</h2>\\n<p>Z80 有 8 个或 5 个通用寄存器，具体取决于您如何看待事物：</p>\\n<ul>\\n<li>寄存器 <code>A</code>、<code>F</code>、<code>B</code>、<code>C</code>、<code>D</code>、<code>E</code>、<code>H</code> 和 <code>L</code> 可以单独用作 8 位寄存器</li>\\n<li>寄存器对<code>BC</code>、<code>DE</code>和<code>HL</code>可用作16位寄存器，其中<code>B</code>是 <code>BC</code> 的高字节，而 <code>C</code> 是低字节。</li>\\n<li>有点奇怪的是，<code>A</code> 寄存器可以与标志寄存器 <code>F</code> 组合起来作为 16 位寄存器 <code>AF</code>。</li>\\n<li>寄存器 <code>IX</code> 和 <code>IY</code> 是 16 位索引寄存器，与内存操作数一起使用。 <code>HL</code> 类似地用于内存操作数。</li>\\n</ul>","autoDesc":true}');export{e as data};
